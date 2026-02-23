"use client";

import React, { useCallback, useEffect, useRef } from "react";
import * as jose from "jose";

type AccessTokenResponse = { token: string | null };

export default function RefreshToken({ children }: { children: React.ReactNode }) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRefreshRef = useRef<(() => Promise<void>) | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const getAccessToken = async (): Promise<AccessTokenResponse | undefined> => {
    const res = await fetch("/api/auth/accessToken", {
      method: "GET",
      cache: "no-store",
      credentials: "include",
    });
    if (!res.ok) return;
    return (await res.json()) as AccessTokenResponse;
  };

  const refreshAccessToken = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        cache: "no-store",
        credentials: "include",
      });

      if (!res.ok) {
        console.log("failed to refresh access token");
      }
    } catch {
      console.log("error in refresh token");
    }
  }, []);

  const startRefresh = useCallback(async () => {
    try {
      clearTimer();

      const data = await getAccessToken();
      const jwt = data?.token;
      if (!jwt) return;

      const payload = jose.decodeJwt(jwt); // sync
      const expSec = payload.exp;
      if (!expSec) return;

      const expMs = expSec * 1000;
      const now = Date.now();

      const refreshInMs = Math.max(expMs - now - 5000, 1000);

      console.log(`current Time ${new Date(now).toISOString()}`);
      console.log(`Token expiry Time ${new Date(expMs).toISOString()}`);
      console.log(`Scheduled refresh Time ${new Date(now + refreshInMs).toISOString()}`);

      timerRef.current = setTimeout(async () => {
        console.log("refresh token is refreshing....");
        await refreshAccessToken();

        await startRefreshRef.current?.();
      }, refreshInMs);
    } catch {

    }
  }, [refreshAccessToken]);


  useEffect(() => {
    startRefreshRef.current = startRefresh;
  }, [startRefresh]);

  useEffect(() => {
    startRefreshRef.current?.();
    return () => clearTimer();
  }, []);

  return <>{children}</>;
}