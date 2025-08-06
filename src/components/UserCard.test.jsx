import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserCard from "./UserCard";

const dummyUser = {
  first_name: "Jane",
  last_name: "Doe",
  email: "jane@example.com",
  avatar: "https://reqres.in/img/faces/2-image.jpg",
};

const dummyProjects = [
  {
    title: "Test Project",
    year: "2025",
    description: "A sample project",
    techStack: "React",
    imageUrl: "https://via.placeholder.com/56",
    link: "https://example.com/project",
  },
];

describe("UserCard Component", () => {
  test("fallback saat user tidak ada", () => {
    render(<UserCard />);
    expect(screen.getByText(/tidak tersedia/i)).toBeInTheDocument();
  });

  test("tampilkan data user dengan benar", () => {
    render(<UserCard user={dummyUser} sideProjects={[]} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, el) =>
          content.includes("Hi") && el.tagName.toLowerCase() === "p"
      )
    ).toBeInTheDocument();
  });

  test("tampilkan work experience", () => {
    render(<UserCard user={dummyUser} sideProjects={[]} />);
    expect(screen.getByText(/Work Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
  });

  test("tampilkan side projects", () => {
    render(<UserCard user={dummyUser} sideProjects={dummyProjects} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /View Project/i })
    ).toBeInTheDocument();
  });

  test("tampilkan kontak", () => {
    render(<UserCard user={dummyUser} />);
    expect(screen.getByText("user@example.com")).toBeInTheDocument();
    expect(screen.getByText("#React")).toBeInTheDocument();
    expect(screen.getByText(/example\.com\/projects/)).toBeInTheDocument();
  });
});
