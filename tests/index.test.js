import Home from "../pages/index";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.setTimeout(10000);

describe("Home", () => {
  beforeEach(function () {
    render(<Home />);
  });

  it("renders search bar", () => {
    const searchInput = screen.getByPlaceholderText("Enter search keywords");
    const icon = screen.getByAltText("youtube icon");
    expect(searchInput).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it("renders 'no videos' message before searching", () => {
    const message = screen.getByTestId("no-videos");
    expect(message).toHaveTextContent("No videos to display yet");
  });
});
