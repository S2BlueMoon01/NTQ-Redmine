/**
 * This test file contains tests for the App component.
 */

import { beforeEach, describe, expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AppWrapper from "../components/AppWrapper";
import App from "../App";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test("should render and interact with the App component correctly", async () => {
    render(<App />, { wrapper: AppWrapper });

    // Check the elements on the main page
    await waitFor(() => {
      /**
       * Check that the title is "NTQ Redmine"
       * @type {HTMLElement}
       */
      expect(document.querySelector("title")?.textContent).toBe("NTQ Redmine");

      /**
       * Check that the "My page" text is present
       * @type {HTMLElement}
       */
      expect(screen.getByText("My page")).toBeInTheDocument();

      /**
       * Check that the "Projects" text is present
       * @type {HTMLElement}
       */
      expect(screen.getByText("Projects")).toBeInTheDocument();

      /**
       * Check that the "Help" text is present
       * @type {HTMLElement}
       */
      expect(screen.getByText("Help")).toBeInTheDocument();

      /**
       * Check that the "Latest projects" text is present
       * @type {HTMLElement}
       */
      expect(screen.getByText("Latest projects")).toBeInTheDocument();

      /**
       * Check that the "NTQ Redmine" text is present
       * @type {HTMLElement}
       */
      expect(screen.getByText("NTQ Redmine")).toBeInTheDocument();
    });

    // Click on the "Projects" link and check the page title
    userEvent.click(screen.getByRole("link", { name: "Projects" }));
    await waitFor(() => {
      /**
       * Check that the title is "Projects - NTQ Redmine"
       * @type {HTMLElement}
       */
      expect(document.querySelector("title")?.textContent).toBe("Projects - NTQ Redmine");
    });

    // Click on the "My page" link and check the page title
    userEvent.click(screen.getByRole("link", { name: "My page" }));
    await waitFor(() => {
      /**
       * Check that the title is "My page - NTQ Redmine"
       * @type {HTMLElement}
       */
      expect(document.querySelector("title")?.textContent).toBe("My page - NTQ Redmine");

      /**
       * Check that the "Personalize this page" text is present
       * @type {HTMLElement}
       */
    });

    // Check that the user clicks the "Personalize this page" and checks the elements in the page
    /**
     * Check that the remove calendar block
     * @type {HTMLElement}
     */
    await userEvent.click(screen.getByText("Personalize this page"));
    await userEvent.click(screen.getByTestId("btn-close-calendar"));

    await waitFor(() => {
      /**
       * Check that the "add" text is present
       * @type {HTMLElement}
       */
      expect(screen.getByText(/add/i)).toBeInTheDocument();

      /**
       * Check that the "back" text is present
       * @type {HTMLElement}
       */
      expect(screen.getByText(/back/i)).toBeInTheDocument();

      /**
       * Check that the "My page block:" text is present
       * @type {HTMLElement}
       */
      expect(screen.getByText("My page block:")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText("Back"));

    await waitFor(() => {
      /**
       * Check that the "calendar" text is not present on the page
       * @type {HTMLElement | null}
       */
      const headingElement = screen.queryByText(/calendar/i);
      expect(headingElement).toBeNull();
    });

    /**
     * Check that the user clicks the "Personalize this page" and add "Calendar" block
     */
    await userEvent.click(screen.getByText(/Personalize this page/i));
    // await userEvent.click(screen.getByTestId("blockSelect"));

    await userEvent.selectOptions(
      screen.getByTestId("blockSelect"), // Phần tử select
      screen.getByRole("option", { name: "Calendar" }), // Tùy chọn
    );
    await userEvent.click(screen.getByText(/Add/i));
    await userEvent.click(screen.getByText(/Back/i));
    await userEvent.click(screen.getByText(/Personalize this page/i));
    await waitFor(() => {
      /**
       * Check that the "calendar" text is present on the page
       * @type {HTMLElement}
       */
      expect(screen.getByText(/calendar/i)).toBeInTheDocument();
    });

    // screen.debug(document.body.parentElement as HTMLElement, 999999999);
  });

  // test page NotFound
  test("should render not found page", async () => {
    window.history.pushState({}, "Non-existent Route", "/non-existent-path");
    render(<App />, { wrapper: AppWrapper });

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(screen.getByText("404")).toBeInTheDocument();
  });
});
