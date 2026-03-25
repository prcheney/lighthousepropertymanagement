"use client";

import { useEffect, useRef, useState, useCallback } from "react";

declare global {
  interface Window {
    google: any;
    __googleMapsLoaded?: boolean;
    __googleMapsLoading?: Promise<void>;
  }
}

function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject();
  if (window.__googleMapsLoaded) return Promise.resolve();
  if (window.__googleMapsLoading) return window.__googleMapsLoading;

  window.__googleMapsLoading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`;
    script.async = true;
    script.onload = () => {
      window.__googleMapsLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error("Google Maps failed to load"));
    document.head.appendChild(script);
  });

  return window.__googleMapsLoading;
}

export interface AddressComponents {
  streetNumber: string;
  route: string;
  city: string;
  state: string;
  zip: string;
}

interface Suggestion {
  text: string;
  placePrediction: any;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string, components?: AddressComponents) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Property Address",
  className = "",
  required = false,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [ready, setReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const tokenRef = useRef<any>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGoogleMaps()
      .then(async () => {
        await window.google.maps.importLibrary("places");
        tokenRef.current = new window.google.maps.places.AutocompleteSessionToken();
        setReady(true);
      })
      .catch(() => {
        // Falls back to plain input — no autocomplete
      });
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const fetchSuggestions = useCallback(
    async (input: string) => {
      if (!ready || input.length < 3) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      try {
        const { AutocompleteSuggestion } = window.google.maps.places;
        const { suggestions: results } =
          await AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input,
            sessionToken: tokenRef.current,
            includedRegionCodes: ["us"],
            includedPrimaryTypes: ["street_address", "subpremise", "premise"],
          });

        const mapped = results.map((s: any) => ({
          text: s.placePrediction.text.toString(),
          placePrediction: s.placePrediction,
        }));

        setSuggestions(mapped);
        setActiveIndex(-1);
        setShowDropdown(mapped.length > 0);
      } catch {
        setSuggestions([]);
        setShowDropdown(false);
      }
    },
    [ready]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 250);
  };

  const handleSelect = async (suggestion: Suggestion) => {
    try {
      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({ fields: ["formattedAddress", "addressComponents"] });
      const addr = (place.formattedAddress ?? suggestion.text).replace(/, USA$/, "");

      let components: AddressComponents | undefined;
      if (place.addressComponents) {
        const get = (type: string): string => {
          const c = place.addressComponents.find((ac: any) =>
            ac.types.includes(type)
          );
          return c?.shortText ?? c?.longText ?? "";
        };
        components = {
          streetNumber: get("street_number"),
          route: get("route"),
          city: get("locality") || get("sublocality"),
          state: get("administrative_area_level_1"),
          zip: get("postal_code"),
        };
      }

      onChange(addr, components);
    } catch {
      onChange(suggestion.text);
    }

    setSuggestions([]);
    setShowDropdown(false);
    // Reset session token for next search
    tokenRef.current = new window.google.maps.places.AutocompleteSessionToken();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
        required={required}
        autoComplete="off"
        className={className}
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-lg border border-navy/15 bg-white shadow-lg">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className={`cursor-pointer px-4 py-3 text-sm text-navy ${
                i === activeIndex ? "bg-navy/5" : "hover:bg-navy/5"
              }`}
              onMouseDown={() => handleSelect(s)}
              onMouseEnter={() => setActiveIndex(i)}
            >
              {s.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
