"use client";
import { useSession } from "next-auth/react";
import { type Session } from "next-auth";
import Image from "next/image";
import Logo from "@/../public/logo.svg";
type Props = {
  children: React.ReactNode;
};

const Navbar: React.FC<{ user: Session }> = ({ user }) => {
  return (
    <nav className="flex flex-row self-center w-96 md:w-[50rem] xl:w-[1400px] justify-between mt-7 px-[30px] py-[10px] bg-[#F0F0F0] rounded-full drop-shadow-lg">
      <Image src={Logo} alt="logo" width={139} />
      <p className="font-medium self-center">{user.user?.name}</p>
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
