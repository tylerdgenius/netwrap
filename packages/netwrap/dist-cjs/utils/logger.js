"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (data, options) => {
    let shouldLog = true;
    let isError = false;
    if (options && options.shouldLog) {
        shouldLog = options.shouldLog;
    }
    if (options && options.isError) {
        isError = options.isError;
    }
    const isBrowser = typeof window !== "undefined";
    const reset = "\x1b[0m";
    const red = "\x1b[31m";
    const green = "\x1b[32m";
    const bold = "\x1b[1m";
    const gray = "\x1b[90m";
    if (shouldLog) {
        if (isError) {
            if (isBrowser) {
                console.error("%cNetwrap Error:", "color: red; font-weight: bold;", data);
            }
            else {
                console.error(`${red}${bold}Netwrap Error:${reset}`, data);
            }
        }
        else {
            if (isBrowser) {
                console.log("%cNetwrap Log:", "color: green; font-weight: bold;", data);
            }
            else {
                console.log(`${green}${bold}Netwrap Log:${reset}`, data);
            }
        }
    }
    else {
        if (isBrowser) {
            console.log("%cNetwrap Log:", "color: gray; font-weight: bold;", "Logging is disabled");
        }
        else {
            console.log(`${gray}${bold}Netwrap Log:${reset}`, "Logging is disabled");
        }
    }
};
exports.default = logger;
