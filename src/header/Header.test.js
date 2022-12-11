import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

describe("Header component", () => {
  test("renders logo", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText("Bicycle")).toBeInTheDocument();
  });
  test("renders nav bar", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
  describe("test nav bar links", () => {
    test("renders 3 links", () => {
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
      const links = screen.getAllByRole("link");
      expect(links.length).toBe(3);
    });
    test("renders clicked home button", () => {
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
      const homeButton = screen.getByText("Home");
      expect(homeButton.classList).toContain("clicked");
    });
    test("shop button is clicked after user clicks shop button", () => {
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
      const shopButton = screen.getByText("Shop");
      userEvent.click(shopButton);
      expect(shopButton.classList).toContain("clicked");
    });
    test("home button unclicked after user clicks shop button", () => {
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
      const shopButton = screen.getByText("Shop");
      userEvent.click(shopButton);
      const homeButton = screen.getByText("Home");
      expect(homeButton.classList).not.toContain("clicked");
    });
  });
});
