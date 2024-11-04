import * as httpRequest from "../utils/httpRequest";

export const getProductList = async (currentPage, pageSize, searchValue, sort = false) => {
  
  try {
    const response = await httpRequest.get(
      "flower/list-flowers",
      {
        params: {
          pageIndex: currentPage,
          pageSize: pageSize,
          sortBy: "FlowerName",
          sortDesc: sort,
          search: searchValue,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    
  }
};

export const getProductDetail = async (flowerId) => {
  try {
    const response = await httpRequest.get(
      "flower/flower-detail",
      {
        params: {
          flowerId,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}



