const isReactAvailable = (): boolean => {
  try {
    require.resolve("react");
    return true;
  } catch (e) {
    return false;
  }
};

export default isReactAvailable;
