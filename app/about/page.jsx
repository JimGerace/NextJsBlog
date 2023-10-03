"use client";
import Image from "next/image";

const About = () => {
  return (
    <div className="w-full h-full pt-14">
      <div className="max-w-screen-lg m-0-auto py-2 px-2 sm:px-0">
        <div className="text-xl">About</div>
        <div className="relative w-full h-96 mt-4">
          <Image
            className="object-cover"
            src="https://gitee.com/jimgerace/pic-go/raw/master/pictures/202309301438331.jpg"
            layout="fill"
            alt=""
          />
        </div>

        <div className="text-xl pt-4 pb-2">Me</div>
        <div className="text-base text-404040">
          我是JimGerace，从事Web前端工程师
        </div>
        <div className="text-xl py-4">关于Blog</div>
        <div className="text-base text-justify text-404040">
          本博客一开始是采用vue2来进行编写前端页面，而后端则是用koa2框架，并部署到腾讯云上。
          但是考虑到服务器和域名续费也是一笔不少的开销，目前则是使用Nextjs框架进行开发，并且部署到Netify上进行托管。
          而数据库则是使用planetscale提供的mysql数据库，能免费白嫖5G存储空间，感觉放在博客上仅记录一些技术文章与生活日常的碎事应该是足够了。
        </div>
      </div>
    </div>
  );
};

export default About;
