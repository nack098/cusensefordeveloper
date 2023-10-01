import Image from "next/image";
import logo from "public/logo.png";

const Login: React.FC = () => {
  return (
    <main className="grid bg-[#182c37] h-full w-full">
      <div className="place-self-center flex flex-col justify-center items-center">
        <Image src={logo} alt="logo.png" height={97} width={97} />
        <div className="w-[490px] h-[327px] bg-[#EFEFEF] rounded-[40px] mt-3">
          <p className="font-semibold text-[24px]">Login</p>
        </div>
      </div>
    </main>
  );
};

export default Login;
