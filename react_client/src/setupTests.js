// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import {validateName, validatePassword} from "./helpers/validate";

describe("validateName", () => {
  it("returns true if the string is longer than 3", () => {
    expect(validateName("abba")).toEqual(true);
  });
  it("returns false if the string is shorter than 3", () => {
    expect(validateName("ab")).toEqual(false);
  });
});

describe("validatePassword", () => {
  it("returns true if passwords are equal and longer than 3", () => {
    expect(validatePassword("abba", "abba")).toEqual(true);
  });
  it("returns false if passwords are different", () => {
    expect(validatePassword("ab", "abb")).toEqual(false);
  });
  it("returns false if passwords are too short", () => {
    expect(validatePassword("abb", "abb")).toEqual(false);
  });
});