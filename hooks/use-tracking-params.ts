"use client";

import { useEffect, useState } from "react";

interface TrackingParams {
  gclid?: string;
  fbclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const PARAM_KEYS: (keyof TrackingParams)[] = [
  "gclid", "fbclid",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
];

export function useTrackingParams(): TrackingParams {
  const [params, setParams] = useState<TrackingParams>({});

  useEffect(() => {
    const url = new URL(window.location.href);
    const tracked: TrackingParams = {};
    for (const key of PARAM_KEYS) {
      const val = url.searchParams.get(key);
      if (val) tracked[key] = val;
    }
    if (Object.keys(tracked).length > 0) setParams(tracked);
  }, []);

  return params;
}
