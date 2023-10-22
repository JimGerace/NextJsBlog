"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkToc from "remark-toc";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ArticleList } from "@/network/index";
import { useSearchParams } from "next/navigation";
import { formDate } from "@/utils/tools";
import Loading from "@/components/Loading";
import Empty from "@/components/Empty";
import MarkdownNav from "@/components/MarkdownNav";
import toast from "react-hot-toast";
import "./index.scss";

const ArticleDetail = () => {
  const searchParams = useSearchParams();
  const [showType, setShowType] = useState("");
  const [detail, setDetail] = useState({});
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    let reg = /Mobile|mobile/gi;
    if (reg.test(window.navigator.userAgent)) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
    getDetailInfo();
  }, []);

  // 获取文章详情内容
  const getDetailInfo = () => {
    ArticleList({ id: searchParams.get("id") }).then((res) => {
      if (res.code == 200) {
        const target = ["createAt", "updateAt"];
        for (let key in res.data) {
          if (target.includes(key)) {
            res.data[key] = formDate(res.data[key]);
          } else if (key === "sort") {
            res.data[key] = res.data[key].split(",");
          } else if (key === "content") {
            res.data[key] = "\n" + res.data[key];
          }
        }

        setDetail(res.data);
        setShowType("data");
      } else {
        setShowType("noData");
      }
    });
  };

  // 点击复制按钮
  const toCopyInfo = (val) => {
    const alink = document.createElement("input");
    document.body.appendChild(alink);
    alink.setAttribute("value", val);
    alink.select();
    document.execCommand("copy");
    document.body.removeChild(alink);
    toast.success("复制成功!");
  };

  return (
    <div className="w-full h-full pt-14 mb-4">
      <div className="max-w-screen-xl m-0-auto text-lg px-2 flex sm:px-0">
        <div className="w-full sm:w-3/4">
          <div className="w-full text-2xl py-4">{detail.name}</div>
          <div className="w-full flex items-center justify-between pb-4 border-2586a3 border-b-2">
            <div className="flex items-center">
              {detail.sort?.map((item, index) => {
                return (
                  <span
                    key={index}
                    className="text-white text-base px-2 rounded-sm bg-2586A3 mr-2"
                  >
                    {item}
                  </span>
                );
              })}
            </div>

            <div className="items-center hidden sm:flex">
              <span className="text-base mr-8">创建于{detail.createAt}</span>
              <span className="text-base">最近修改{detail.updateAt}</span>
            </div>
          </div>

          <ReactMarkdown
            className="mt-4 pb-2"
            remarkPlugins={[gfm, remarkMath, remarkToc]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            children={detail.content}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <div className="w-full bg-1f2937 px-4 py-2 mb-4 rounded-md mt-1">
                    <div className="w-full text-right text-base text-white">
                      <span
                        className="cursor-pointer"
                        onClick={() => toCopyInfo(children)}
                      >
                        复制代码
                      </span>
                    </div>
                    <SyntaxHighlighter
                      className="rounded-md"
                      children={String(children).replace(/\n$/, "")}
                      language={match[1]}
                      PreTag="div"
                      wrapLongLines={false}
                    />
                  </div>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          ></ReactMarkdown>
        </div>

        {showNav && (
          <div className="hidden fixed top-20 right-4 w-1/4 px-4 border-1 rounded-md shadow-lg text-base sm:block">
            <MarkdownNav content={detail.content} />
          </div>
        )}

        {showType === "noData" && <Empty />}

        {showType === "" && <Loading />}
      </div>
    </div>
  );
};

export default ArticleDetail;
