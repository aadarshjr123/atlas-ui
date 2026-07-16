import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

const localStorageMock: Pick<Storage, "getItem" | "setItem" | "removeItem" | "clear"> = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  configurable: true
});
