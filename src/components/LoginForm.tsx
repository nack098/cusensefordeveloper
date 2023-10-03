"use client";

import { useToast } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const toast = useToast();

  const login = async (formData: FormData) => {
    try {
      const username = formData.get("username");
      const password = formData.get("password");
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (!res) return;
      if (!res.error) {
        toast({
          title: "Success!",
          description: "Your login success",
          duration: 2000,
          status: "success",
        });
        window.location.href = "/projects";
      } else {
        toast({
          title: "Error!",
          description: "Please check your username or password.",
          duration: 2000,
          status: "error",
        });
      }
    } catch {
      toast({
        title: "Error!",
        description: "There is an error. Please try again",
        duration: 2000,
        status: "error",
      });
    }
  };

  return (
    <form action={login}>
      <div className="ml-[45px] mt-[5px] flex flex-col">
        <p className="ml-[10px] text-[12px]">Username</p>
        <input
          type="text"
          name="username"
          className="pl-[10px] bg-[#D9D9D9] rounded-[10px] h-[37px] w-[393px] drop-shadow-sm"
        />
      </div>
      <div className="ml-[45px] mt-[20px] flex flex-col">
        <p className="ml-[10px] text-[12px]">Password</p>
        <input
          type="password"
          name="password"
          className="pl-[10px] bg-[#D9D9D9] rounded-[10px] h-[37px] w-[393px] drop-shadow-sm"
        />
      </div>
      <div className="flex justify-between mt-[35px] mx-[55px]">
        <Link
          href="/auth/register"
          className="justify-self-center self-center text-[14px] text-sky-800 hover:text-red-900 duration-200 underline"
        >
          Register
        </Link>
        <input
          type="submit"
          value="Login"
          className="text-[12px] justify-self-end font-medium rounded-[20px] w-[101px] h-[35px] bg-[#ff6666] hover:bg-sky-500 duration-200 cursor-pointer drop-shadow-sm"
        />
      </div>
    </form>
  );
};

export default LoginForm;
