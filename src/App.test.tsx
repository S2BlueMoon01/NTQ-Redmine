import { describe, expect, test } from "vitest";
import { render, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "./App";

describe("App", () => {
  test("render", async () => {
    render(<App />);
    await waitFor(() => expect(document.querySelector("title")?.textContent).toBe("NTQ Redmine"));
  });
});
