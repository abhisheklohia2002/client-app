import { cookies } from "next/headers";

interface ISession {
  user: IUser;
}

const getSession = async (): Promise<ISession | null> => {
  return await getSelf();
};

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "customer" | "manager";
  tenant: number | null;
}
const getSelf = async () => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/auth/auth/self`,
    {
      headers: {
        Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  return {
    user: (await response.json()) as IUser,
  };
};
export default getSession;
