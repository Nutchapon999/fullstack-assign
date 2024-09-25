import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="py-1 px-2 text-white">
        <p className="font-serif italic">a Board</p>
      </div>
    </Link>
  );
}