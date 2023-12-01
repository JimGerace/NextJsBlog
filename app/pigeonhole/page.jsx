"use client";
import { useEffect, useState } from "react";
import { ArticleList } from "@/network/index";
import Loading from "@/components/Loading";
import Empty from "@/components/Empty";
import Link from "next/link";

const Pigeonhole = () => {
  const [showType, setShowType] = useState("");
  const [archiveList, setArchiveList] = useState([]);

  useEffect(() => {
    getArticleList();
  }, []);

  // 获取文章列表
  const getArticleList = () => {
    ArticleList({ type: "Pigeonhole" }).then((res) => {
      if (res.code == 200) {
        if (res.data.length) {
          let result = res.data;
          for (let i in result) {
            if (result[i].list.length) {
              for (let j in result[i].list) {
                result[i].list[j].format = handleFormatTime(
                  result[i].list[j].createAt
                );
              }
            }
          }

          setArchiveList(result);
          setShowType("data");
        } else {
          setShowType("noData");
        }
      } else {
        setShowType("noData");
      }
    });
  };

  // 处理时间格式
  const handleFormatTime = (time) => {
    const target = time.match(/-(\d+)-(\d+)/);
    const month = target[1];
    const day = target[2];
    const mapping = {
      "01": "Jan.",
      "02": "Feb.",
      "03": "Mar.",
      "04": "Apr.",
      "05": "May",
      "06": "Jun.",
      "07": "Jul.",
      "08": "Aug.",
      "09": "Sep.",
      10: "Oct.",
      11: "Nov.",
      12: "Dec.",
    };
    return `${mapping[month]} ${day}`;
  };

  return (
    <div className="w-full h-full py-14 px-4 sm:px-0">
      <div className="max-w-screen-lg h-full m-0-auto">
        {showType === "data" &&
          archiveList.map((item, index) => {
            return (
              <div key={index} className="w-full">
                <div className="text-3xl text-404040 font-sans py-4 tracking-widest">
                  {item.yearly}
                </div>

                {item.list.map((opt, optIndex) => {
                  return (
                    <Link
                      prefetch={false}
                      shallow={true}
                      href={"/articleDetail?id=" + opt.id}
                      className="w-full flex items-center py-2 cursor-pointer transition-all duration-500 hover:text-primary hover:translate-x-4"
                      key={optIndex}
                    >
                      <span className="w-20 text-base text-999">
                        {opt.format}
                      </span>
                      <span className="text-base flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                        {opt.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            );
          })}

        {showType === "" && <Loading />}

        {showType === "noData" && <Empty />}
      </div>
    </div>
  );
};

export default Pigeonhole;
