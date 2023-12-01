"use client";
import Pagination from "@/components/Pagination/index";
import Empty from "@/components/Empty";
import Loading from "@/components/Loading";
import { useEffect, useRef, useState } from "react";
import { SortList, ArticleList } from "@/network";
import { formDate } from "@/utils/tools";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Article() {
  const searchParams = useSearchParams();
  const requestRef = useRef(true);
  const currentPage = useRef(1);
  const [showType, setShowType] = useState("");
  const [article, setArticle] = useState([]);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("全部");
  const [sortList, setSortList] = useState({});

  useEffect(() => {
    init();
  }, [searchParams]);

  useEffect(() => {
    if (!requestRef.current) {
      currentPage.current = 1;
      getArticleList();
    }
  }, [sort]);

  // 初始化数据
  const init = () => {
    Promise.all([getSortList(), articleInterFace()])
      .then((res) => {
        if (res.length) {
          const [resSort, resArticle] = res;
          setSortList(resSort.data);

          let list = resArticle.data.map((item) => {
            return {
              ...item,
              updateAt: formDate(item.updateAt),
              sort: item.sort.split(","),
            };
          });
          setArticle(list);
          setTotal(resArticle.total);

          setShowType("data");
        } else {
          setShowType("noData");
        }

        requestRef.current = false;
      })
      .finally(() => {
        window.sessionStorage.getItem("searchKey") &&
          window.sessionStorage.removeItem("searchKey");
      });
  };

  // 文章列表接口
  const articleInterFace = () => {
    const data = {
      name: window.sessionStorage.getItem("searchKey") || null,
      page: currentPage.current,
      sort: sort === "全部" ? null : sort,
      type: "many",
    };

    return new Promise((resolve, reject) => {
      ArticleList(data).then((res) => {
        resolve(res);
      });
    });
  };

  // 获取文章信息
  const getArticleList = () => {
    setShowType("");
    articleInterFace().then((res) => {
      if (res.code == 200) {
        if (res.data.length) {
          let list = res.data.map((item) => {
            return {
              ...item,
              updateAt: formDate(item.updateAt),
              sort: item.sort.split(","),
            };
          });
          setArticle(list);
          setTotal(res.total);
          setShowType("data");
        } else {
          setShowType("noData");
        }
      } else {
        setShowType("noData");
      }
    });
  };

  // 获取分类列表
  const getSortList = () => {
    return new Promise((resolve, reject) => {
      SortList().then((res) => {
        resolve(res);
      });
    });
  };

  // 切换当前页码
  const changeCurrentPage = (val) => {
    currentPage.current = val;
    getArticleList();
  };

  return (
    <div className="w-full h-full py-14">
      <div className="relative max-w-screen-xl h-full m-0-auto">
        <div className="w-full h-full flex flex-col px-4 sm:w-3/5 sm:px-0">
          {showType === "data" && (
            <>
              {article.map((item, index) => {
                return (
                  <div className="w-full pt-12 pb-4 border-b-1" key={index}>
                    <Link
                      prefetch={false}
                      className="max-w-full inline-block overflow-hidden text-ellipsis whitespace-nowrap text-xl text-404040 cursor-pointer hover:text-primary"
                      href={"/articleDetail?id=" + item.id}
                    >
                      {item.name}
                    </Link>
                    <div className="w-full flex items-center pt-8 justify-between">
                      <div className="w-3/4 flex items-center">
                        {item.sort.map((opt, optIndex) => {
                          return (
                            <span
                              className="text-base mr-2 bg-2586A3 text-white px-2 rounded-sm"
                              key={optIndex}
                            >
                              {opt}
                            </span>
                          );
                        })}
                        <span className="w-1.5px h-4 mr-1 bg-a4a4a4"></span>
                        <span className="text-base text-999">
                          {item.updateAt}
                        </span>
                      </div>

                      <span className="flex-1 text-base text-right text-999">
                        JimGerace
                      </span>
                    </div>
                  </div>
                );
              })}

              <Pagination
                total={total}
                page={currentPage}
                changeCurrentPage={changeCurrentPage}
              />
            </>
          )}

          {showType === "noData" && <Empty />}
        </div>

        <div className="hidden w-1/4 h-12 fixed top-20 right-40 sm:block">
          <div className="w-full text-lg text-404040 border-b-1 pb-2 tracking-widest">
            文章分类
          </div>

          <div className="w-full flex items-center flex-wrap gap-x-4 pt-2">
            <div
              onClick={() => setSort("全部")}
              className={
                (sort === "全部" ? "text-primary " : "") +
                "flex text-404040 cursor-pointer hover:text-primary"
              }
            >
              <span className="text-base whitespace-nowrap">全部</span>
            </div>
            {Object.keys(sortList).map((key, index) => {
              return (
                <div
                  onClick={() => setSort(key)}
                  className={
                    (sort === key ? "text-primary " : "") +
                    "flex text-404040 cursor-pointer hover:text-primary"
                  }
                  key={index}
                >
                  <span className="text-base whitespace-nowrap">{key}</span>
                  {sortList[key] != 0 && (
                    <span className="text-xs">{sortList[key]}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showType === "" && <Loading />}
    </div>
  );
}
