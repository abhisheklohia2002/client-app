"use client";
import React from "react";
import { Button } from "../ui/button";
import logout from "@/lib/actions/logout";
import { toast } from "sonner";

export default function Logout() {
  const handleLogout = async () => {
    const response = await logout();
    console.log(response,'logout')
    if(response){
        toast.success('logout successfully')
    }
  };
  return (
    <Button onClick={()=>handleLogout()} size={"sm"}>
      Logout
    </Button>
  );
}
