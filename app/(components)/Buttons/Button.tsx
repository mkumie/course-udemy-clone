"use client";

import Image from "next/image";
import React, { MouseEventHandler } from "react";

interface ButtonProps {
  btnType?: "button" | "submit";
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
  outline?: boolean;
  small?: boolean;
}

const Button = ({
  title,
  containerStyles,
  handleClick,
  btnType,
  textStyles,
  rightIcon,
  outline,
  small,
}: ButtonProps) => {
  return (
    <button
      disabled={false}
      type={btnType || "button"}
      className={`custom-btn ${containerStyles} ${
        outline ? "bg-white" : "bg-purple-500 w-full"
      } ${outline ? "text-black" : "text-white"} ${small ? "py-1" : "py-3"} ${
        small ? "text-sm" : "text-lg"
      } ${small ? " border-[1px]" : "border-2"}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            src={rightIcon}
            alt="right icon"
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  );
};

export default Button;
