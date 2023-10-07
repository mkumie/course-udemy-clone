"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../(components)/Buttons/Button";
import { Input } from "../(components)/Inputs/Input";
import axios from "axios";
import { error } from "console";

interface InitialStateProps {
  name: string;
  email: string;
  password: string;
}

const initialState: InitialStateProps = {
  name: "",
  email: "",
  password: "",
};

interface ProfileProps {
  userId?: string | null;
  name?: string | null;
  email?: string | null;
}

const ProfileComponent = ({ userId, name, email }: ProfileProps) => {
  const router = useRouter();
  const [state, setState] = useState(initialState);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    axios
      .put(`/api/user/${userId}`, {
        ...state,
        hashedPassword: state.password,
      })
      .catch((error: any) => {
        throw new Error(error);
      })
      .finally(() => {
        router.push("/");
      });

    router.refresh();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  return (
    <div>
      <h1>{name}</h1>
      <h3>{email}</h3>

      <div>
        <div>
          <form
            onSubmit={onSubmit}
            className="flex flex-col justify-center h-[450px] mx-auto gap-2"
          >
            <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
              <Input
                placeholder="Name"
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={state.name}
              />
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
