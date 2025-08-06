import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomeCard from "./HomeCard";

const dummyUser = {
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
  avatar: "https://reqres.in/img/faces/1-image.jpg",
  phone: "081234567890",
};

const dummyInfo = {
  role: "Frontend Dev",
  type: "Remote",
  joinDate: "1 Jan 2023",
};

describe("HomeCard Component", () => {
  test("menampilkan data user dengan benar", () => {
    render(<HomeCard user={dummyUser} info={dummyInfo} onDetail={() => {}} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText(/Phone: 081234567890/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Frontend Dev - Remote - Joined 1 Jan 2023/i)
    ).toBeInTheDocument();
  });

  test("memanggil fungsi onDetail saat tombol diklik", () => {
    const mockDetail = jest.fn();
    render(
      <HomeCard user={dummyUser} info={dummyInfo} onDetail={mockDetail} />
    );

    fireEvent.click(screen.getByRole("button", { name: /detail/i }));
    expect(mockDetail).toHaveBeenCalledTimes(1);
  });

  test("menampilkan teks default jika info tidak lengkap", () => {
    render(
      <HomeCard
        user={dummyUser}
        info={{ role: "", type: "", joinDate: "" }}
        onDetail={() => {}}
      />
    );

    expect(screen.getByText(/No role/i)).toBeInTheDocument();
    expect(screen.getByText(/No type/i)).toBeInTheDocument();
    expect(screen.getByText(/No date/i)).toBeInTheDocument();
  });
});
