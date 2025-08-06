import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import axios from "axios";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("axios");

jest.mock("../components/HomeCard", () => ({ user, info, onDetail }) => (
  <div data-testid="home-card" onClick={onDetail}>
    {user.first_name} {user.last_name} - {info.role}
  </div>
));

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("redirect ke login jika token tidak ada", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("menampilkan loading saat fetch data", async () => {
    localStorage.setItem("token", "fake-token");
    axios.get.mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  test("menampilkan daftar user dari API", async () => {
    localStorage.setItem("token", "fake-token");
    axios.get.mockResolvedValueOnce({
      data: {
        data: [
          { id: 1, first_name: "John", last_name: "Doe" },
          { id: 2, first_name: "Jane", last_name: "Smith" },
        ],
        total_pages: 2,
      },
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("home-card")).toHaveLength(2);
    });
  });

  test("menampilkan error jika fetch gagal", async () => {
    localStorage.setItem("token", "fake-token");
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/gagal mengambil data pengguna/i)
      ).toBeInTheDocument();
    });
  });

  test("filter user dengan search bar", async () => {
    localStorage.setItem("token", "fake-token");
    axios.get.mockResolvedValueOnce({
      data: {
        data: [
          { id: 1, first_name: "John", last_name: "Doe" },
          { id: 2, first_name: "Jane", last_name: "Smith" },
        ],
        total_pages: 1,
      },
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("home-card")).toHaveLength(2);
    });

    fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
      target: { value: "jane" },
    });

    expect(screen.getAllByTestId("home-card")).toHaveLength(1);
  });

  test("menampilkan pesan No employees found jika hasil search kosong", async () => {
    localStorage.setItem("token", "fake-token");
    axios.get.mockResolvedValueOnce({
      data: {
        data: [{ id: 1, first_name: "John", last_name: "Doe" }],
        total_pages: 1,
      },
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("home-card")).toHaveLength(1);
    });

    fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
      target: { value: "zzz" },
    });

    expect(screen.getByText(/no employees found/i)).toBeInTheDocument();
  });

  test("klik user card memanggil navigate ke detail", async () => {
    localStorage.setItem("token", "fake-token");
    axios.get.mockResolvedValueOnce({
      data: {
        data: [{ id: 1, first_name: "John", last_name: "Doe" }],
        total_pages: 1,
      },
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("home-card"));
    });

    expect(mockNavigate).toHaveBeenCalledWith("/users/1");
  });

  test("navigasi pagination prev/next", async () => {
    localStorage.setItem("token", "fake-token");
    axios.get
      .mockResolvedValueOnce({
        data: {
          data: [{ id: 1, first_name: "John", last_name: "Doe" }],
          total_pages: 2,
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: [{ id: 2, first_name: "Jane", last_name: "Smith" }],
          total_pages: 2,
        },
      });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("home-card")).toHaveTextContent("John Doe");
    });

    fireEvent.click(screen.getByText("2"));

    await waitFor(() => {
      expect(screen.getByTestId("home-card")).toHaveTextContent("Jane Smith");
    });
  });
});
