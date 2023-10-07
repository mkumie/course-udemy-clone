"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../(components)/Inputs/Input";
import Button from "../(components)/Buttons/Button";
import Link from "next/link";
import { signIn } from "next-auth/react";

interface InitialStateProps {
  email: string;
  password: string;
}

const initialState: InitialStateProps = {
  email: "",
  password: "",
};

const Login = () => {
  const [state, setState] = useState(initialState);

  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    signIn("credentials", {
      ...state,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.refresh();
      }
      if (callback?.error) {
        throw new Error(" Wrong Credentials ");
      }
    });

    router.push("/");
  };

  return (
    <form onSubmit={onSubmit} className="text-center">
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        {/* <Input
          placeholder="Name"
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={state.name}
        /> */}
        <Input
          placeholder="Email"
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          value={state.email}
        />
        <Input
          placeholder="Password"
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={state.password}
        />
        {/* <button type="submit">Submit</button> */}
        <Button
          title="Submit"
          btnType="submit"
          containerStyles="border-[1px]"
        />
      </div>
      <div>
        <div>
          Haven't got an account?{" "}
          <Link href="/register">
            <Button
              title="Sign Up"
              textStyles="text-blue-400 font-bold hover:bg-gray-200"
            />
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
