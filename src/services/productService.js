import * as httpRequest from "../utils/httpRequest";

export const getProductList = async (
  currentPage,
  pageSize,
  searchValue,
  sort = false,
  sortBy = "FlowerName"
) => {
  try {
    const response = await httpRequest.get("flower/list-flowers", {
      params: {
        pageIndex: currentPage,
        pageSize,
        sortBy,
        sortDesc: sort,
        search: searchValue,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getProductListByEvent = async (
  currentPage,
  pageSize,
  searchValue,
  sort = false,
  sortBy = "FlowerName",
  event = "",
  filteredResult = []
) => {
  try {
    const response = await httpRequest.get("flower/list-flowers", {
      params: {
        pageIndex: currentPage,
        pageSize,
        sortBy,
        sortDesc: sort,
        search: searchValue,
      },
    });
    if (event !== "") {
      filteredResult = response.data.filter((item) => item.tagNames === event);
      return filteredResult;
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductDetail = async (flowerId) => {
  try {
    const response = await httpRequest.get("flower/flower-detail", {
      params: {
        flowerId,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
