import { toast } from "react-toastify";
import * as httpRequest from "../utils/httpRequest";
import { useState } from "react";

export const getListOrder = async (token) => {
  try {
    const response = await httpRequest.get("account/get-all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
