"use server";
import { cookies } from "next/headers";

const logout = async () => {
  const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
      cookie: `refreshToken=${(await cookies()).get("refreshToken")?.value}`,
    },
  });
  if (!response.ok) {
    console.log("logout failed");
    return false;
  }

  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
  return true;
};

export default logout;
