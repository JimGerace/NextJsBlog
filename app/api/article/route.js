import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";
import { formDate } from "@/utils/tools";

async function getArticleMany(name, sort, page) {
  const result = await prisma.articleList.findMany({
    skip: (page - 1) * 5,
    take: 5,
    select: {
      id: true,
      name: true,
      sort: true,
      updateAt: true,
    },
    where: {
      name: {
        contains: name,
      },
      sort: {
        contains: sort,
      },
    },
    orderBy: {
      updateAt: "desc",
    },
  });
  return result;
}

async function getArticleUnique(id) {
  const result = await prisma.articleList.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      sort: true,
      createAt: true,
      content: true,
      updateAt: true,
    },
  });

  return result;
}

export async function GET(req) {
  let name = req.nextUrl.searchParams.get("name") || "";
  let page = Number(req.nextUrl.searchParams.get("page")) || 1;
  let id = req.nextUrl.searchParams.get("id") || "";
  let type = req.nextUrl.searchParams.get("type") || "";
  let sort = req.nextUrl.searchParams.get("sort") || "";

  switch (type) {
    case "many": {
      const result = await getArticleMany(name, sort, page);
      const totalResult = await prisma.articleList.findMany({
        where: {
          name: {
            contains: name,
          },
          sort: {
            contains: sort,
          },
        },
      });
      return NextResponse.json({
        code: 200,
        data: result,
        total: totalResult.length,
      });
    }
    case "Pigeonhole": {
      const yearlist = await prisma.articleList.groupBy({
        by: ["yearly"],
        orderBy: {
          yearly: "desc",
        },
      });

      const article = await prisma.articleList.findMany({
        select: {
          id: true,
          name: true,
          createAt: true,
          yearly: true,
        },
        orderBy: {
          createAt: "desc",
        },
      });

      yearlist.forEach((item) => {
        let list = [];
        for (let i in article) {
          article[i].createAt = formDate(article[i].createAt);
          if (item.yearly === article[i].yearly) {
            list.push(article[i]);
          }
        }
        item.list = list;
      });
      return NextResponse.json({
        code: 200,
        data: yearlist,
      });
    }
    default: {
      const result = await getArticleUnique(id);
      return NextResponse.json({
        code: 200,
        data: { ...result },
      });
    }
  }
}
