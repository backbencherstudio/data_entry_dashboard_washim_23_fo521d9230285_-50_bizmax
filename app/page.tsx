import { redirect } from "next/navigation";

export default function Home() {
redirect('/dashboard')
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2B2926]"></div>
    </div>
  );
}
