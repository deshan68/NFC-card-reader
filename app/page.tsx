"use client";
import Image from "next/image";
import { socialMediaIconDetails } from "@/constant";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// const session = false;

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const setUpProvider = async () => {
      const response: any = await getProviders();

      setProvider(response);
    };

    setUpProvider();
  }, []);

  const handleEdit = () => {
    router.push(`/edit/${session?.user?.id}`);
  };

  return (
    <section className="flex h-screen w-full justify-center items-center flex-col py-3">
      {!session ? (
        <button
          onClick={() => signIn()}
          className="font-extrabold text-[36px] h-[55px] w-[300px] border-[1px] border-black flex justify-center gap-5 items-center"
        >
          <Image src={"/google.svg"} alt="google" height={40} width={40} />
          <p className="font-bold text-2xl">Sign In</p>
        </button>
      ) : (
        <>
          <div className="flex justify-center h-56 items-center flex-col">
            <div className="w-[120px] h-[120px] rounded-full flex mb-4 ">
              <Image
                src={session.user?.image!}
                alt="profile"
                height={120}
                width={120}
                className="object-cover rounded-full"
              />
            </div>

            <p className="font-extrabold text-[36px] leading-none">
              {session.user?.name}
            </p>

            <p className="font-thin text-[20px]">{session.user?.email}</p>
          </div>

          <div className="min-h-[0.5px] w-full bg-black" />

          <div className="max-h-[400px] h-[400px] overflow-auto my-2">
            <div className="flex flex-wrap justify-center items-start w-full gap-x-8 gap-y-4  ">
              {socialMediaIconDetails.map((item) => (
                <div
                  key={item.name}
                  className="flex h-[130px] justify-center items-center flex-col gap-y-2 "
                >
                  <Image
                    src={item.imgUrl}
                    alt="social media"
                    height={100}
                    width={100}
                    className="object-contain"
                  />
                  <p className="font-light text-[16px]">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-[0.5px] w-full bg-black" />

          <div className="flex justify-between items-center w-full mt-2">
            <button
              onClick={() => signOut()}
              className="h-[55px] w-[170px] border-[0.5px] border-[#212A3E] text-[16px] font-bold text-[#212A3E]"
            >
              Log Out
            </button>
            <Link
              href={`/edit/${session?.user?.id}`}
              onClick={handleEdit}
              className="flex justify-center items-center h-[55px] w-[170px] bg-[#212A3E] text-white text-[16px] font-bold"
            >
              <p>Edit Profile</p>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
