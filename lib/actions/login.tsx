"use server";

import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function loginPage(prevState: any, formdata: FormData) {
  const email = formdata.get("email");
  const password = formdata.get("password");

  const cookieStore = await cookies();

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { type: "error", message: error?.errors?.[0]?.msg ?? "Login failed" };
    }

    const setCookies = response.headers.getSetCookie?.() ?? [];
    if (!setCookies.length) {
      return { type: "error", message: "No Set-Cookie headers were found!" };
    }
    const parsed = setCookieParser.parse(setCookies, { map: true });

    const access = parsed["accessToken"];
    const refresh = parsed["refreshToken"];

    if (!access || !refresh) {
      return { type: "error", message: "accessToken / refreshToken not found in Set-Cookie!" };
    }

    const secure = process.env.NODE_ENV === "production";

    cookieStore.set("accessToken", access.value, {
      expires: access.expires,       
      maxAge: access.maxAge,         
      httpOnly: access.httpOnly ?? true,
      path: access.path ?? "/",
      domain: access.domain,
      sameSite: (access.sameSite ?? "lax") as "lax" | "strict" | "none",
      secure,
    });

    cookieStore.set("refreshToken", refresh.value, {
      expires: refresh.expires,
      maxAge: refresh.maxAge,
      httpOnly: refresh.httpOnly ?? true,
      path: refresh.path ?? "/",
      domain: refresh.domain,
      sameSite: (refresh.sameSite ?? "lax") as "lax" | "strict" | "none",
      secure,
    });

    return { type: "success", message: "Login successful!" };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return { type: "error", message: err?.message ?? "Something went wrong" };
  }
}