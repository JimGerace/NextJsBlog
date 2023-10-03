import api from "@/network/config";

export const SortList = (params) => {
  return api({
    url: "/api/sort",
    method: "GET",
    params,
  });
};

export const ArticleList = (params) => {
  return api({
    url: "/api/article",
    method: "GET",
    params,
  });
};
