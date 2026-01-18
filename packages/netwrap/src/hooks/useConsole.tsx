import utils from "../utils";

const useConsole = () => {
  return {
    log: utils.logger,
  };
};

export default useConsole;
