import { handleSubmit } from "../src/client/js/formHandler";
jest.mock("../src/client/js/formHandler");

describe("handle submit", () => {
  test("Testing the handleSubmit() function", () => {
    expect(handleSubmit).toBeDefined();
  });
});
