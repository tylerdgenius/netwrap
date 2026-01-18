import { ResponseHandler } from "../types";

const responseHandler: ResponseHandler = ({
  status = true,
  message,
  payload,
}) => ({
  message,
  payload,
  status,
});

export default responseHandler;
