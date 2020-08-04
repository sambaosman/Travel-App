import { handleSubmit } from "../src/client/js/handleSubmit";
jest.mock("../src/client/js/handleSubmit");

describe("handle submit", () => {
  test("Testing the handleSubmit() function", () => {
    expect(handleSubmit).toBeDefined();
  });
});
