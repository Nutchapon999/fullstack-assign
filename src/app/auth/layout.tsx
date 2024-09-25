import { Logo } from "@/components/logo";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#243831]">
      <div className="flex flex-col justify-center items-center">
        { children }
      </div>
      <div className="hidden lg:flex flex-col justify-center items-center bg-[#2B5F44] rounded-l-[32px] space-y-6">
        <Image 
          src="/auth-hero.png"
          alt="Hero"
          width={480}
          height={100}
          priority
        />
        <Logo />
      </div>
    </div>
  );
}

export default AuthLayout;