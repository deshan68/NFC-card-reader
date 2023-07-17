import Image from "next/image";
import React from "react";

const EditPin = ({ styleSheet }: any) => {
  return (
    <div
      className={`absolute h-6 w-6 bg-white ${styleSheet} rounded-full shadow-lg shadow-black/50 flex justify-center items-center`}
    >
      <Image src={"/pen.svg"} alt="pen" height={16} width={16} />
    </div>
  );
};

export default EditPin;
