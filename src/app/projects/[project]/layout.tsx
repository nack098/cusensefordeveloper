import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="mt-[25px] xl:my-[45px] mx-[90px] xl:mx-[270px]">
      <Link href="/projects" className="font-bold text-[32px]">
        <FaAngleLeft className="inline-block" />
        <p className="inline-block text-center align-middle">Devices</p>
      </Link>
      <hr className="border-black" />
      {children}
    </div>
  );
};

export default Layout;
