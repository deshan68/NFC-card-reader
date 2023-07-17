"use client";
import EditPin from "@/components/EditPin";
import { socialMediaIconDetails } from "@/constant";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const EditProfile = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const route = useRouter();

  return (
    <section className="flex h-screen w-full justify-center items-center flex-col py-3">
      <div className="flex justify-center h-56 items-center flex-col w-full">
        <div className="w-[120px] h-[120px] rounded-full flex mb-4 relative">
          <Image
            src={session?.user?.image!}
            alt="profile"
            height={120}
            width={120}
            className="object-cover rounded-full"
          />
          <EditPin styleSheet={"bottom-2 right-2"} />
        </div>

        <div className="relative h-fit w-full flex justify-center items-center bg-[#ECECEC] py-2">
          <p className="font-extrabold text-[36px] leading-none">
            {session?.user?.name}
          </p>
          <EditPin styleSheet={"-top-2 -right-2"} />
        </div>

        <div className="relative h-fit w-full flex justify-center items-center bg-[#ECECEC] py-2 mt-4">
          <p className="font-thin text-[20px] leading-none">Add Address</p>
        </div>
      </div>

      <div className="max-h-[400px] h-[400px] w-full overflow-auto my-6 pt-4 bg-[#ECECEC]">
        <div className="flex flex-wrap justify-center items-start w-full gap-x-8 gap-y-4 ">
          {socialMediaIconDetails.map((item) => (
            <div
              key={item.name}
              className="flex h-[130px] justify-center items-center flex-col gap-y-2 relative"
            >
              <Image
                src={item.imgUrl}
                alt="social media"
                height={100}
                width={100}
                className="object-contain"
              />
              <p className="font-light text-[16px]">{item.name}</p>
              <EditPin styleSheet={"-top-3 -right-3"} />
            </div>
          ))}
          <button
            onClick={() => route.push(`/edit/${session?.user?.id}/choose`)}
            className="flex h-[130px] justify-center items-center flex-col gap-y-2 "
          >
            <div className=" bg-white h-[100px] w-[100px] flex justify-center items-center shadow-lg">
              <Image
                src={"/plus.svg"}
                alt="plus"
                height={50}
                width={50}
                className="object-contain"
              />
            </div>
            <p className="font-light text-[16px]">Add</p>
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center w-full mt-2">
        <button
          onClick={() => route.push("/")}
          className="h-[55px] w-full border-[0.5px] bg-[#212A3E] text-[16px] font-bold text-white"
        >
          Save
        </button>
      </div>
    </section>
  );
};

export default EditProfile;
