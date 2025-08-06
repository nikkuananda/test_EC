import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import Api from "../services/Api";

jest.mock("../services/Api");

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("RegisterPage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();

    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();

    console.error.mockRestore();
  });

  test("menampilkan error jika email atau password kosong", async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /register/i });
    fireEvent.click(button);

    expect(await screen.findByTestId("error-message")).toHaveTextContent(
      /email dan password tidak boleh kosong/i
    );
  });

  test("berhasil register dan redirect ke /login", async () => {
    Api.post.mockResolvedValueOnce({
      data: { token: "fake_token" },
    });

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { name: "email", value: "eve.holt@reqres.in" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { name: "password", value: "pistol" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(Api.post).toHaveBeenCalledWith("/register", {
        email: "eve.holt@reqres.in",
        password: "pistol",
      });
    });

    expect(await screen.findByTestId("success-message")).toHaveTextContent(
      /registrasi berhasil/i
    );

    jest.runAllTimers();

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/login");
    });
  });

  test("gagal register dan tampilkan pesan error", async () => {
    Api.post.mockRejectedValueOnce({
      response: { data: { error: "User already exists" } },
    });

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { name: "email", value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { name: "password", value: "test123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(await screen.findByTestId("error-message")).toHaveTextContent(
      /registrasi gagal/i
    );
  });
});
