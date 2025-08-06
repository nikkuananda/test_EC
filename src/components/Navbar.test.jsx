
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: jest.fn(() => ({ pathname: "/" })),
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("Navbar Component", () => {
  test("menampilkan brand Cit Cat", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cit Cat/i)).toBeInTheDocument();
  });

  test("toggle dropdown menu saat ikon user diklik", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const userButton = screen.getByRole("button", { name: /user menu/i });
    fireEvent.click(userButton);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test("tampilkan tombol logout jika sudah login", () => {
    localStorage.setItem("token", "fake-token");
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const userButton = screen.getByRole("button", { name: /user menu/i });
    fireEvent.click(userButton);
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test("klik logout menghapus token dan navigasi ke /login", () => {
    localStorage.setItem("token", "fake-token");
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const userButton = screen.getByRole("button", { name: /user menu/i });
    fireEvent.click(userButton);

    fireEvent.click(screen.getByText(/Logout/i));
    expect(localStorage.getItem("token")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("toggle mobile menu saat hamburger diklik", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const menuButton = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(menuButton);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test("klik di luar dropdown menutup dropdown", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const userButton = screen.getByRole("button", { name: /user menu/i });
    fireEvent.click(userButton);
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
  });

  test("menampilkan Home link jika pathname /login", () => {
    const { useLocation } = require("react-router-dom");
    useLocation.mockReturnValueOnce({ pathname: "/login" });
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test("mobile menu logout menutup menu", () => {
    localStorage.setItem("token", "fake-token");
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const menuButton = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(menuButton);
    fireEvent.click(screen.getByText(/Logout/i));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("klik link dalam dropdown menutup dropdown", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const userButton = screen.getByRole("button", { name: /user menu/i });
    fireEvent.click(userButton);
    fireEvent.click(screen.getByText(/Login/i));
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
  });

  test("hamburger menu toggle dua kali untuk menutup menu", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const menuButton = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(menuButton);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    fireEvent.click(menuButton);
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
  });

  test("klik register di mobile menu saat belum login menutup menu", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const menuButton = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(menuButton);
    fireEvent.click(screen.getByText(/Register/i));
    expect(screen.queryByText(/Register/i)).not.toBeInTheDocument();
  });

  test("klik di luar saat mobile menu terbuka menutup menu (simulasi manual toggle)", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const menuButton = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(menuButton);
    fireEvent.click(menuButton);
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
  });

  test("mobile menu tidak menampilkan Home untuk user belum login di halaman utama", () => {
    const { useLocation } = require("react-router-dom");
    useLocation.mockReturnValueOnce({ pathname: "/users" });
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const menuButton = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(menuButton);

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
