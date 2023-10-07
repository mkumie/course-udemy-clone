"use client";

import { UUser } from "@/app/constants";
import { SafeUser } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "../Buttons/Button";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser: SafeUser | null;
  closeUserMenu: () => void;
}

const UserMenu = ({ currentUser, closeUserMenu }: UserMenuProps) => {
  const router = useRouter();
  return (
    // <div className="flex flex-col h-[50vh] bg-white shadow-lg right-0 rounded-lg px-4 py-2 gap-6">
    <div className="flex flex-col bg-white shadow-lg right-0 rounded-lg px-4 py-2 gap-6 md:mt-4">
      <div className="flex items-center gap-4">
        <div
          className="w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center text-white cursor-pointer"
          onClick={() => closeUserMenu()}
          onMouseUp={() => router.push("/user")}
        >
          <span>{currentUser?.name?.at(0)?.toUpperCase()}</span>
          <span>{currentUser?.name?.at(1)?.toUpperCase()}</span>
        </div>

        <div className="flex flex-col">
          <span>{currentUser?.name}</span>
          <span className="text-gray-400">{currentUser?.email}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 font-light">
        {UUser.map((item) => (
          <div key={item.name} onClick={closeUserMenu}>
            <Link href={item.link}>{item.name}</Link>
          </div>
        ))}
      </div>

      <div className="border-black border-[1px] mt-auto">
        <Button
          handleClick={() => signOut()}
          title="Sign Out"
          containerStyles="w-full h-full py-2 px-2"
        />
      </div>
    </div>
  );
};

export default UserMenu;
