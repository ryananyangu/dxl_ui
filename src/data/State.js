import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class GlobalConfig {
  constructor() {
    makeAutoObservable(this);
  }

  ServiceCode = "";
  Static = {};
  Dynamic = {};
  ResponseBuildScript = "";
  RequestBuildScript = "";
  Headers = {};
  Endpoint = "";
  HTTPMethod = "";
}

export const GlobalContext = createContext(null);
