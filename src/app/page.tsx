import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  if (session) {
    redirect("/projects", RedirectType.replace);
  } else {
    redirect("/auth/login", RedirectType.replace);
  }
}
