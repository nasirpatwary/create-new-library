import Image from "next/image";
import businessTeam from "@/assets/businessTam.jpg";
import { TeamTrusted } from "./TeamTrusted";
export default function RealTimeWork() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center container mx-auto px-4 lg:px-0 gap-12 mt-12 justify-center">
        <Image
          width={800}
          height={600}
          className="lg:h-96 md:w-6/12 lg:w-1/2 object-cover rounded-2xl"
          src={businessTeam}
          alt=""
        />
          <TeamTrusted />
      </div>
    </>
  );
}
