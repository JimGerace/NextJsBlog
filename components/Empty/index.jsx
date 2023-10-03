"use client";
import Image from "next/image";

const Empty = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="relative w-80 h-40">
        <Image src="/images/icon_empty.png" layout="fill" alt="" />
      </div>
      <div className="text-999 text-center text-lg">暂无数据~</div>
    </div>
  );
};

export default Empty;
