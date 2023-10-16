"use client";
import { signOut, useSession } from "next-auth/react";
import { type Session } from "next-auth";
import { FaArrowDown, FaArrowUp, FaDoorOpen } from "react-icons/fa6";
import Image from "next/image";
import Logo from "@/../public/logo.svg";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useState } from "react";
type Props = {
  children: React.ReactNode;
};

const Navbar: React.FC<{ user: Session }> = ({ user }) => {
  const [open, openState] = useState(false);
  return (
    <nav className="flex flex-row self-center w-96 md:w-[48rem] xl:w-[75rem] justify-between mt-7 px-[30px] py-[10px] bg-[#F0F0F0] rounded-full drop-shadow-lg">
      <Image src={Logo} alt="logo" width={139} />
      <Popover
        trigger="hover"
        placement="bottom-end"
        onOpen={() => openState(true)}
        openDelay={200}
        closeDelay={200}
        onClose={() => openState(false)}
      >
        <PopoverTrigger>
          <button className="font-medium self-center inline-flex">
            {open ? (
              <FaArrowUp className="self-center" />
            ) : (
              <FaArrowDown className="self-center" />
            )}
            <p>{user.user?.name}</p>
          </button>
        </PopoverTrigger>
        <PopoverContent width="6rem" height="2rem" marginTop="0.5rem">
          <button className="font-medium align-middle justify-center h-full w-full inline-flex hover:bg-blue-300 duration-300">
            <FaDoorOpen className="self-center mr-[0.5rem]" />
            <p className="self-center text-[12px]" onClick={() => signOut()}>
              Logout
            </p>
          </button>
        </PopoverContent>
      </Popover>
    </nav>
  );
};

const ProjectLayout: React.FC<Props> = ({ children }) => {
  const { data: user, status } = useSession();
  if (status === "unauthenticated") window.location.href = "/auth/login";
  if (!user) return;
  return (
    <main className="flex flex-col w-full h-full bg-gradient-to-t from-[#60B9FF] to-[60%] to-[#DDF0FF]">
      <Navbar user={user} />
      {children}
    </main>
  );
};

export default ProjectLayout;
