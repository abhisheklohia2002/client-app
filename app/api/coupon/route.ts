import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = await cookies();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ORDER_BACKEND_URL}/coupon/verify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieStore.get("accessToken")?.value}`,
        Cookie: `refreshToken=${cookieStore.get("refreshToken")?.value}`,
      },
      body: JSON.stringify(body),
    }
  );
  if(!response.ok){
    return Response.json({msg:"Invalid Coupon",status:response.status})
  }
  const data = await response.json();

  return Response.json(data, { status: response.status });
}