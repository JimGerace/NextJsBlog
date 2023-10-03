"use client";
import "./index.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

const Pagination = (props) => {
  const pageSize = 10;
  const maxPageCount = 5;
  const { total, page, changeCurrentPage } = props;
  const [lastPage, setLastPage] = useState(0);
  const [list, setList] = useState([]);
  const [nextIcon, setNextIcon] = useState("/images/icon_next_default.png");
  const [preIcon, setPreIcon] = useState("/images/icon_pre_default.png");

  useEffect(() => {
    initList(
      Math.ceil(total / pageSize) > maxPageCount
        ? maxPageCount
        : Math.ceil(total / pageSize)
    );
    setLastPage(Math.ceil(total / pageSize));
  }, [props]);

  // 初始化数组
  const initList = (target) => {
    let pageList = [];
    for (let i = 0; i < target; i++) {
      pageList.push(i + 1);
    }
    setList(pageList);
  };

  return (
    <div className="w-full py-10 flex items-center justify-center">
      <button
        disabled={page == 1}
        onMouseEnter={() => setPreIcon("/images/icon_pre_active.png")}
        onMouseOut={() => setPreIcon("/images/icon_pre_default.png")}
        onClick={() => changeCurrentPage(page - 1)}
      >
        <Image src={preIcon} width={15} height={15} alt="" />
      </button>
      {list.map((item, index) => {
        return (
          <div
            onClick={() => changeCurrentPage(item)}
            className={
              (page == item ? "text-primary " : "") +
              "w-6 h-6 mx-2 leading-6 text-lg text-center rounded-50% cursor-pointer hover:text-primary"
            }
            key={index}
          >
            {item}
          </div>
        );
      })}
      {lastPage > maxPageCount && (
        <>
          <div className="w-6 h-6 mx-2 text-lg leading-6 text-center rounded-50%">
            ...
          </div>
          <div
            onClick={() => changeCurrentPage(lastPage)}
            className="w-6 h-6 mx-2 text-lg leading-6 text-center rounded-50% cursor-pointer text-primary"
          >
            {lastPage}
          </div>
        </>
      )}
      <button
        disabled={page >= lastPage}
        onMouseEnter={() =>
          page < lastPage && setNextIcon("/images/icon_next_active.png")
        }
        onMouseOut={() => setNextIcon("/images/icon_next_default.png")}
        onClick={() => changeCurrentPage(page + 1)}
      >
        <Image src={nextIcon} width={15} height={15} alt="" />
      </button>
    </div>
  );
};

export default Pagination;
