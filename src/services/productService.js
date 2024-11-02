import * as httpRequest from "../util/httpRequest";

export const getProductList = async (currentPage, pageSize, searchValue) => {
  
  try {
    const response = await httpRequest.get(
      "flower/list-flowers",
      {
        params: {
          pageIndex: currentPage,
          pageSize: pageSize,
          sortBy: "FlowerName",
          sortDesc: true,
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



