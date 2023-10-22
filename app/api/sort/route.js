import prisma from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  const sortlist = await prisma.ArticleSort.findMany({
    select: {
      name: true,
    },
  });

  const map = {};
  for (let i in sortlist) {
    map[sortlist[i].name] = 0;
  }

  const articlelist = await prisma.articleList.groupBy({
    by: ["sort"],
    _count: {
      sort: true,
    },
  });

  for (let i in articlelist) {
    if (articlelist[i].sort.includes(",")) {
      let list = articlelist[i].sort.split(",");
      for (let j in list) {
        map[list[j]] =
          map[list[j]] !== 0
            ? map[list[j]] + articlelist[i]._count.sort
            : articlelist[i]._count.sort;
      }
    } else {
      map[articlelist[i].sort] += articlelist[i]._count.sort;
    }
  }

  return NextResponse.json({
    code: 200,
    data: map,
  });
}
