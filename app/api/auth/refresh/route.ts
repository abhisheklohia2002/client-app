import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";
export async function POST() {
  const cookieStore = await cookies();

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/auth/auth/refreshToken`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookieStore.get("accessToken")?.value}`,
        Cookie: `refreshToken=${cookieStore.get("refreshToken")?.value}`,
      },
    },
  );
  if (!response.ok) {
    console.log("refresh failed");
    return Response.json({
      success: false,
    });
  }
  const setCookies = response.headers.getSetCookie?.() ?? [];
  if (!setCookies.length) {
    return { type: "error", message: "No Set-Cookie headers were found!" };
  }
  const parsed = setCookieParser.parse(setCookies, { map: true });

  const access = parsed["accessToken"];
  const refresh = parsed["refreshToken"];

  if (!access || !refresh) {
    return Response.json({
     message:"token is missing"
    });
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
  return Response.json({
    success:true
  })
}
