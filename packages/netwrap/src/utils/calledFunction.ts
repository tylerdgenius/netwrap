const calledFunction = () => {
  const error = new Error();
  const stackTraceLines = error.stack?.split("\n");

  // The first line of the stack trace (index 0) will be the error message,
  // so we need to find the second line (index 1) which represents the caller.
  if (stackTraceLines && stackTraceLines.length > 1) {
    return stackTraceLines[1].trim();
  } else {
    return "";
  }
};

export default calledFunction;
