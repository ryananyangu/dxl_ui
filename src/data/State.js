import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class GlobalConfig {
  constructor() {
    makeAutoObservable(this);
  }

  ServiceCode = "";
  Static = {};
  Dynamic = {};
  ResponseBuildScript = `const main = (payload) => {

  //TODO: Do your transformation for response here
  return {
    transactionId: "",
    statusId: "",
    date: "",
    statusCode: 0,
    statusDescription: "",
    metadata: {},
  };
};`;
  RequestBuildScript = `const main = (payload, headers, constants, client) => {
  const {
    MSISDN,
    accountNumber,
    transactionId,
    amount,
    currentDate,
    narration,
    ISOCurrencyCode,
    customerName,
    paymentMode,
    callback,
    metadata,
  } = payload;
  // Check client config first before
  // TODO: //Put your transformation code here
  return {
    requeststring: "",
    headers: headers,
  };
};`;
  Headers = {};
  Endpoint = "";
  HTTPMethod = "";
}

export const GlobalContext = createContext(null);
