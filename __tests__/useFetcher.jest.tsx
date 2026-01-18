// Import the necessary modules and types
import axios from "axios";
import { useFetcher } from "../src";

const mockedData = {
  data: "mocked data",
};

// Mock axios request implementation
jest.mock("axios", () => ({
  request: jest.fn(() => Promise.resolve(mockedData)),
}));

jest.mock("../src/utils/simulateDataCall", () => ({
  simulateDataCall: jest.fn(() => Promise.resolve(mockedData)),
}));

// Mock fetch request implementation
global.fetch = jest.fn(
  () =>
    Promise.resolve({
      json: () => Promise.resolve({ data: "mocked data" }),
    }) as Promise<Response>,
);

// Test the useFetcher utility
describe("useFetcher", () => {
  // Test case for "axios" dataCallerType
  // it('should handle "axios" dataCallerType', async () => {
  //   // Call the hook generator
  //   const { trigger } = useFetcher({
  //     queryFn: async () => {
  //       return await axios.get("https://jsonplaceholder.typicode.com/posts");
  //     },
  //   });

  //   // Call the main function
  //   const data = await trigger();

  //   // Assert that axios.request is called with the correct parameters
  //   expect(axios.request).toHaveBeenCalledWith({
  //     method: "get",
  //     url: "https://jsonplaceholder.typicode.com/posts",
  //   });

  //   expect(data).toStrictEqual({
  //     status: true,
  //     message: "Successfully gotten returned data",
  //     payload: mockedData,
  //   });
  // });
});
