import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MeetOthers from "./MeetOthers";

describe("MeetOthers Component", () => {
  it("renders the Meet Others component correctly", () => {
    render(<MeetOthers />);
    expect(screen.getByText("Meet Others")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Meet other UCSD students who are also looking to hit the gym and stay active!"
      )
    ).toBeInTheDocument();
  });

  it("renders the PeopleGrid with user cards", () => {
    render(<MeetOthers />);
    expect(screen.getByText("Leslie")).toBeInTheDocument();
    expect(screen.getByText("Reagan")).toBeInTheDocument();
    expect(screen.getByText("Hadley")).toBeInTheDocument();
    expect(screen.getByText("Jessica")).toBeInTheDocument();
    expect(screen.getByText("Sarah")).toBeInTheDocument();
  });

  it("navigates to the ProfileView when a user card is clicked", () => {
    render(<MeetOthers />);
    fireEvent.click(screen.getByText("Leslie"));
    expect(screen.getByText("Leslie")).toBeInTheDocument(); // Ensure ProfileView shows user details
    expect(screen.getByText("Back")).toBeInTheDocument(); // Ensure the back button is displayed
  });

  it("navigates back to the PeopleGrid when the back button is clicked", () => {
    render(<MeetOthers />);
    fireEvent.click(screen.getByText("Leslie"));
    fireEvent.click(screen.getByText("Back"));
    expect(screen.getByText("Meet Others")).toBeInTheDocument(); // Ensure it navigates back to the main screen
  });
});
