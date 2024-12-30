import NavBar from "@/components/NavBar";
import Menu from "@/components/Menu";
import Link from "next/link";
import Image from "next/image";
import { url } from "inspector";

export default function DashboardLayout(
    { children,}: Readonly<{ children: React.ReactNode;}>
) {
  return (
    <div className="h-screen flex">
      {/* left */}
      <div className="w-[14%] md:w[8%] lg:w-[14%] xl:w-[14%] p-4">
        <Link 
          href="/" 
          className="flex items-center justify-center mx-auto">
          <Image
            src="/finefis-logo.png"
            alt="Next.js logo"
            width={100}
            height={100}
            className="w-[60px] h-auto sm:w-[60px] md:w-[80px] lg:w-[100px] xl:w-[100px]"
            priority
          />
        </Link>
        <Menu/>
      </div>
      {/* rigth */}
      <div className="w-[86%] md:w[92%] lg:w-[86%] xl:w-[86%] bg-[#9fc3f2A] overflow-scroll">
        <NavBar/>
        {children}
      </div>
    </div>
  )
}