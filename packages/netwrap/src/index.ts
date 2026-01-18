import hooks from "./hooks";
import lib from "./lib";
import utils from "./utils";

export const { useConsole, useFetcher } = hooks;
export const { fetcher } = lib;
export const {
  calledFunction,
  isReactAvailable,
  logger,
  responseHandler,
  simulateDataCall,
} = utils;

export * from "./types";
