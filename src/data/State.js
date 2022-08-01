import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class GlobalConfig {
  constructor() {
    makeAutoObservable(this);
  }

  Name = "";
  Description = "";
  Code = "";
  Status = 1;
  Country = 2;
  Environment = "PRODUCTION";
  Statics = {};
  PostScript = `const main = (payload) => {

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
  PreScript = `const main = (payload, headers, constants, client) => {
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
