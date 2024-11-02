import * as httpRequest from "../util/httpRequest";

export const checkoutOrder = async (token, checkout) => {
  try {
    const response = await httpRequest.post(
      "account/checkout-order",
      checkout,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const paymentPayOS = async (token, orderId) => {
  try {
    const response = await httpRequest.get(
      `Payment/create-payment-link?orderId=${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const paymentSuccess = async (token, transactionId) => {
  try {
    const response = await httpRequest.get(
      `Payment/success-payment?transactionId=${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const paymentFail = async (token, transactionId) => {
  try {
    const response = await httpRequest.get(
      `Payment/failed-payment?transactionId=${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
