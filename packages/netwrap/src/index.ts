import lib from "./lib";
import utils from "./utils";

export const { fetcher } = lib;
export const {
  calledFunction,
  isReactAvailable,
  logger,
  responseHandler,
  simulateDataCall,
} = utils;

export * from "./types";
