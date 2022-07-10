import mongoosePaginate from "mongoose-paginate-v2";

export const paginationLabels = {
  totalDocs: "totalItems",
  docs: "items",
  limit: "perPage",
  page: "currentPage",
  //   nextPage: "next",
  //   prevPage: "prev",
  //   totalPages: "pageCount",
  //   pagingCounter: "slNo",
  //   meta: "paginator",
};

export const paginationOptions = {
  page: 1,
  lean: true,
  limit: 10,
  customLabels: paginationLabels,
};

mongoosePaginate.paginate.options = paginationOptions;

export default mongoosePaginate;
