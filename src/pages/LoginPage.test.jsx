import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Api from "../services/Api";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../services/Api", () => ({
  post: jest.fn(),
}));

jest.mock("../components/EmailInfoModal", () => ({ isOpen, onClose }) => {
  return isOpen ? (
    <div data-testid="email-modal">
      Email Info Modal
      <button onClick={onClose}>Close</button>
    </div>
  ) : null;
});

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("render form login", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("input form bisa diisi", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "123456" },
    });

    expect(screen.getByPlaceholderText(/email address/i).value).toBe(
      "test@example.com"
    );
    expect(screen.getByPlaceholderText(/password/i).value).toBe("123456");
  });

  test("login sukses navigasi ke home", async () => {
    Api.post.mockResolvedValueOnce({
      data: { token: "fake-token" },
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(Api.post).toHaveBeenCalledWith("/login", {
        email: "test@example.com",
        password: "123456",
        remember: false,
      });
      expect(localStorage.getItem("token")).toBe("fake-token");
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("login gagal menampilkan error", async () => {
    Api.post.mockRejectedValueOnce(new Error("Invalid credentials"));

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/login gagal\. periksa email dan password\./i)
      ).toBeInTheDocument();
    });
  });

  test("buka modal info email", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /info/i }));

    expect(screen.getByTestId("email-modal")).toBeInTheDocument();
  });
});
