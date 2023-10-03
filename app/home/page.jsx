"use client";
import "./index.scss";
import Image from "next/image";

function Home() {
  const record = [
    {
      date: "2023-09-17",
      des: "Blog第一版本发布",
    },
  ];

  return (
    <div className="w-full h-full py-2 sm:max-w-full sm:m-0-auto">
      <div className="z-0 fixed top-0 left-0 w-full h-screen backImg">
        <Image
          className="object-cover"
          src="https://gitee.com/jimgerace/pic-go/raw/master/pictures/202309171242072.jpg"
          alt=""
          layout="fill"
        />
      </div>

      <div className="z-10 absolute top-0 left-0 w-full h-full">
        <div className="relative home_des w-full h-screen">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white whitespace-nowrap sm:text-5xl">
            多好玩的东西，早晚会放低
          </span>
        </div>

        <div className="w-full flex flex-col items-center h-80 py-5 px-10  bg-f5 sm:py-10 sm:px-40">
          <span className="text-3xl font-bold text-black text-center tracking-wide whitespace-nowrap">
            GROWTH RECORD
          </span>
          <span className="w-20 h-1 mt-4 bg-727cf5"></span>
          <span className="text-xs text-999 py-4">「 左右滑动查看 」</span>

          <div className="relative w-full pb-10 flex overflow-y-hidden items-start">
            {record.map((item, index) => {
              return (
                <div
                  className="flex flex-col justify-start flex-shrink-0 w-60 mr-40"
                  key={index}
                >
                  <div className="text-2xl font-bold slashed-zero font-mono mb-2">
                    {item.date}
                  </div>
                  <div className="text-sm">{item.des}</div>
                </div>
              );
            })}
            <div className="flex flex-col justify-start flex-shrink-0 w-60">
              <div className="text-2xl font-bold slashed-zero font-mono text-999">
                GROWING...
              </div>
              <div className="text-2xl font-bold slashed-zero font-mono text-999">
                To be continued
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
