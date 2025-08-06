import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EmailInfoModal from "./EmailInfoModal";

describe("EmailInfoModal", () => {
  test("tidak merender modal jika isOpen = false", () => {
    const { queryByRole } = render(
      <EmailInfoModal isOpen={false} onClose={jest.fn()} />
    );
    expect(queryByRole("dialog")).toBeNull();
  });

  test("merender modal jika isOpen = true", () => {
    render(<EmailInfoModal isOpen={true} onClose={jest.fn()} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByText(/Contoh Email dan Password untuk API/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/eve.holt@reqres.in/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /tutup/i })).toBeInTheDocument();
  });

  test("menutup modal saat backdrop di-klik", () => {
    const onClose = jest.fn();
    const { getByRole } = render(
      <EmailInfoModal isOpen={true} onClose={onClose} />
    );

    fireEvent.click(getByRole("dialog"));
    expect(onClose).toHaveBeenCalled();
  });

  test("tidak menutup modal saat isi modal di-klik", () => {
    const onClose = jest.fn();
    const { container } = render(
      <EmailInfoModal isOpen={true} onClose={onClose} />
    );

    const modalContent = container.querySelector(".bg-white");
    fireEvent.click(modalContent);
    expect(onClose).not.toHaveBeenCalled();
  });

  test("menutup modal saat tombol 'Tutup' diklik", () => {
    const onClose = jest.fn();
    render(<EmailInfoModal isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByRole("button", { name: /tutup/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
