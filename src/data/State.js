import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class GlobalConfig {
  constructor() {
    makeAutoObservable(this);
  }

  // NOTE: Payload vars
  Success = {
    Code: "",
    Type: "",
    Path: "",
  };

  ServiceCode = "";
  Static = {};
  Dynamic = {};
  ResponseTemplate = "";
  RequestTemplate = "";
  ResponseDynamic = {};
  Headers = {};
  Endpoint = "";
  HTTPMethod = "";
  InRequestType = "";
  OutRequestType = "";

  // None Payload trackers
  RequestKeys = [];
  OutRequestValues = [];
  StaticKeys = [];
  DynamicKeys = [];
  OutResponseKeys = [];
  InResponseValues = [];
  ActiveMenu = "first";
}

export const GlobalContext = createContext(null);
