import { Logo } from "@/components/logo";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#243831]">
      <div className="flex flex-col justify-center items-center md:flex-col bg-[#2B5F44] 
        rounded-b-[32px] md:rounded-l-[32px] space-y-6 order-1 md:order-2"
      >
        <div className="flex justify-center relative h-[131px] w-[171px] md:h-[230px] md:w-[300px]">
          <Image 
            src="/auth-hero.png"
            alt="Hero Image for Authentication"
            fill
            priority
          />
        </div>
        <Logo />
      </div>
      <div className="flex flex-col justify-center items-center order-2 md:order-1">
        {children} 
      </div>
    </div>
  );
}

export default AuthLayout;