import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import logo from "public/logo.svg";

const Login: React.FC = () => {
  return (
    <main className="grid bg-[#84C6EC] h-full w-full">
      <div className="place-self-center flex flex-col justify-center items-center translate-y-[-40px]">
        <Image src={logo} alt="logo" width={280} />
        <div className="w-[490px] h-[327px] bg-[#EFEFEF] rounded-[40px] mt-[25px] drop-shadow-2xl flex flex-col">
          <p className="font-bold text-[24px] mt-[50px] ml-[45px]">Login</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default Login;
