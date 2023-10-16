"use client";
import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="mt-[25px] xl:my-[45px] mx-[90px] xl:mx-[375px]">
      <button onClick={router.back} className="font-bold text-[32px]">
        <FaAngleLeft className="inline-block" />
        <p className="inline-block text-center align-middle">Devices</p>
      </button>
      <hr className="border-black" />
      {children}
    </div>
  );
};

export default Layout;
