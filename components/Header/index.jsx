"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import "./index.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const menu = [
  {
    label: "首页",
    value: "/Home",
    icon: "/images/icon_home_default.png",
    homeIcon: "/images/icon_home_f.png",
  },
  {
    label: "文章",
    value: "/Article",
    icon: "/images/icon_article_default.png",
    homeIcon: "/images/icon_article_f.png",
  },
  {
    label: "归档",
    value: "/Pigeonhole",
    icon: "/images/icon_file_default.png",
    homeIcon: "/images/icon_file_f.png",
  },
  {
    label: "关于",
    value: "/About",
    icon: "/images/icon_about_default.png",
    homeIcon: "/images/icon_about_f.png",
  },
];

export default function Header(prop) {
  const { changeBackTop } = prop;
  const router = useRouter();
  const searchParams = useSearchParams();
  const tagetTop = 120;
  const pathName = usePathname();
  const pageRef = useRef(null);
  const navRef = useRef(null);
  const [showHomeIcon, setShowHomeIcon] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    pageRef.value = document.querySelector("body");
    navRef.value = document.querySelector(".nav_bar");
    window.addEventListener("scroll", toModifyMenuClassName);
    setActiveMenu(pathName);

    if (showMenu) {
      setShowMenu(false);
      toShowMenuDialog();
    }

    console.log("header");

    return () => {
      pageRef.value = null;
      navRef.value = null;
      window.removeEventListener("scroll", toModifyMenuClassName);
    };
  }, [pathName, searchParams]);

  // 处理Menu的className
  const handleMenuClassName = (target) => {
    if (target === activeMenu) {
      if (activeMenu === "/Home") {
        return "bg-menu-mask ";
      } else {
        return "bg-f2f2f2 ";
      }
    } else {
      return "";
    }
  };

  // 展示菜单对话框
  const toShowMenuDialog = () => {
    if (!showMenu) {
      pageRef.value.classList.add("overflow-hidden");
      setShowMenu(true);
    } else {
      pageRef.value.classList.remove("overflow-hidden");
      setShowMenu(false);
    }
  };

  // 动态修改Menu的className
  const toModifyMenuClassName = (e) => {
    let containerHeight = navRef.value.clientHeight;
    let scrollTop = e.target.scrollingElement.scrollTop;

    changeBackTop(scrollTop >= tagetTop ? true : false);

    if (scrollTop >= containerHeight) {
      navRef.value.classList.add("nav_active");
      setShowHomeIcon(false);
    } else {
      navRef.value.classList.remove("nav_active");
      setShowHomeIcon(true);
    }
  };

  // 搜索
  const toSearch = (e) => {
    if (e.keyCode !== 13) return;

    let value = e.target.value;
    if (!value) {
      toast.error("请输入文章名称");
      return;
    }
    window.sessionStorage.setItem("searchKey", value);
    router.push(`/Article?n=${new Date().getTime()}`);
    setTimeout(() => {
      e.target.value = "";
    }, 500);
  };

  return (
    <div className="fixed inset-0 h-14 z-30 nav_bar">
      <div
        className={
          (activeMenu !== "/Home" ? "border-b-1 " : "") +
          (showHomeIcon ? "" : "back_filter") +
          " w-full flex items-center justify-between h-14 px-2 bg-transparent sm:px-12 "
        }
      >
        <span
          className={
            (activeMenu === "/Home" && showHomeIcon ? "text-white" : "") +
            " text-xl font-bold cursor-pointer"
          }
        >
          JimGerace's Blog
        </span>

        <div className="flex items-center font-base">
          <div className="hidden items-center sm:flex">
            {menu.map((item, index) => {
              return (
                <Link
                  href={item.value}
                  key={index}
                  className={
                    handleMenuClassName(item.value) +
                    (activeMenu === "/Home"
                      ? "hover:bg-menu-mask"
                      : "hover:bg-f2f2f2") +
                    " cursor-pointer flex items-center py-1 px-3.5 mx-1 rounded-sm"
                  }
                >
                  <Image
                    src={
                      activeMenu === "/Home" && showHomeIcon
                        ? item.homeIcon
                        : item.icon
                    }
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span
                    className={
                      (activeMenu === "/Home" && showHomeIcon
                        ? "text-white"
                        : "") + " pl-1"
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}

            <span
              className={
                (activeMenu === "/Home" && showHomeIcon ? "text-white" : "") +
                " mr-6 ml-2"
              }
            >
              |
            </span>

            <div
              className="relative cursor-pointer w-5 h-5 mr-4"
              onClick={toShowMenuDialog}
            >
              <Image
                className="icon_search"
                src={
                  activeMenu === "/Home" && showHomeIcon
                    ? "/images/icon_search_f.png"
                    : "/images/icon_search_default.png"
                }
                layout="fill"
                alt=""
              />
            </div>

            {/* <div className="relative cursor-pointer w-5 h-5">
              <Image
                className="icon_back"
                src={
                  activeMenu === "/Home" && showHomeIcon
                    ? "/images/icon_back_f.png"
                    : "/images/icon_back_default.png"
                }
                layout="fill"
                alt=""
              />
            </div> */}
          </div>

          <div className="relative w-7 h-7 sm:hidden">
            <Image
              src={
                activeMenu === "/Home" && showHomeIcon
                  ? "/images/icon_menu_f.png"
                  : "/images/icon_menu.png"
              }
              alt=""
              layout="fill"
              onClick={toShowMenuDialog}
            />
          </div>
        </div>
      </div>

      <div
        className={
          (showMenu ? "top-0" : "-top-full") +
          " hidden fixed w-full h-screen bg-mask z-50 sm:block translation-all duration-300"
        }
      >
        <div
          className="absolute cursor-pointer top-4 right-14 w-6 h-6"
          onClick={toShowMenuDialog}
        >
          <Image src="/images/icon_del.png" alt="" layout="fill" />
        </div>

        <div className="w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <input
            className="w-full text-center text-lg outline-none select-none pc-input bg-transparent"
            type="text"
            placeholder="请输入"
            onKeyDown={toSearch}
          />
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-2/4 text-lg text-999">
          All things have the possibility of it
        </div>
      </div>

      <div
        className={
          (showMenu ? "right-0" : "-right-full") +
          " z-50 fixed top-0 w-full h-screen bg-mobile-mask transition-all duration-300 back_filter sm:hidden"
        }
      >
        <div className="relative flex flex-col float-right w-4/6 h-screen bg-white py-1 px-2 box-border">
          <div className="w-full h-12 flex items-center justify-end">
            <div className="relative w-7 h-7">
              <Image
                onClick={toShowMenuDialog}
                src="/images/icon_del.png"
                layout="fill"
                alt=""
              />
            </div>
          </div>

          <div className="w-full h-12 flex items-center justify-center">
            <input
              type="text"
              className="block w-full outline-none text-base py-2 px-2 border-solid border rounded-sm border-gray-200 bg-eee"
              placeholder="请输入"
              onKeyDown={toSearch}
            />
          </div>

          {menu.map((item, index) => {
            return (
              <Link
                href={item.value}
                className={
                  (item.value === activeMenu ? "bg-f2f2f2" : "") +
                  " w-auto h-10 flex items-center box-border pl-4 mt-1 rounded-sm"
                }
                key={index}
              >
                <div className="relative w-5 h-5">
                  <Image src={item.icon} alt="" layout="fill" />
                </div>
                <span className="ml-1 text-base">{item.label}</span>
              </Link>
            );
          })}

          <div className="absolute bottom-2 left-0 w-full text-base font-bold text-999 text-justify box-border px-2">
            All things have the possibility of it
          </div>
        </div>
      </div>
    </div>
  );
}
