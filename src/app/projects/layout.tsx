"use client";
import { useSession } from "next-auth/react";
type Props = {
  children: React.ReactNode;
};

const ProjectLayout: React.FC<Props> = ({ children }) => {
  const { status } = useSession();
  if (status == "unauthenticated") window.location.href = "/auth/login";
  return <main className="flex flex-col w-full h-full">{children}</main>;
};

export default ProjectLayout;
