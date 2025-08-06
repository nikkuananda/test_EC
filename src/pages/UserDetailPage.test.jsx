import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UserDetailPage from "./UserDetailPage";
import axios from "axios";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "2" }),
}));

jest.mock("axios");

jest.mock("../components/UserCard", () => ({ user }) => (
  <div data-testid="user-card">
    {user.first_name} {user.last_name}
  </div>
));

describe("UserDetailPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("menampilkan loading saat data dimuat", async () => {
    axios.get.mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={["/users/2"]}>
        <Routes>
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/memuat data pengguna/i)).toBeInTheDocument();
  });

  test("menampilkan data user jika fetch berhasil", async () => {
    axios.get.mockResolvedValueOnce({
      data: { data: { id: 2, first_name: "John", last_name: "Doe" } },
    });

    render(
      <MemoryRouter initialEntries={["/users/2"]}>
        <Routes>
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("user-card")).toHaveTextContent("John Doe");
    });
  });

  test("menampilkan error jika user tidak ditemukan", async () => {
    axios.get.mockResolvedValueOnce({
      data: { data: null },
    });

    render(
      <MemoryRouter initialEntries={["/users/99"]}>
        <Routes>
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        /user tidak ditemukan/i
      );
    });
  });

  test("menampilkan error jika fetch gagal", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter initialEntries={["/users/2"]}>
        <Routes>
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        /gagal memuat detail user/i
      );
    });
  });

  test("tombol back memanggil navigate(-1)", async () => {
    axios.get.mockResolvedValueOnce({
      data: { data: { id: 2, first_name: "John", last_name: "Doe" } },
    });

    render(
      <MemoryRouter initialEntries={["/users/2"]}>
        <Routes>
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("user-card")).toBeInTheDocument();
    });

    fireEvent.click(
      screen.getByRole("button", { name: /back to previous page/i })
    );
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
