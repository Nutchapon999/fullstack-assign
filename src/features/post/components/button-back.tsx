import Link from "next/link";

import { ArrowLeft } from "lucide-react";

interface ButtonBackProps {
  href: string;
}

const ButtonBack = ({ href }: ButtonBackProps) => {
  return (
    <Link href={href}>
      <button className="size-11 bg-[#D8E9E4] flex justify-center items-center rounded-full">
        <ArrowLeft className="size-6" />
      </button>
    </Link> 
  );
}

export default ButtonBack;