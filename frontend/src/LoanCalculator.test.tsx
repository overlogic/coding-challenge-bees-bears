import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { LoanCalculator } from "./LoanCalculator";

describe("LoanCalculator Component", () => {
  beforeAll(() => {
    // Mock the environment variable for fetch URL
    import.meta.env.VITE_LOAN_CALCULATOR_ENDPOINT = "http://localhost";
  });

  it("render the form", () => {
    render(<LoanCalculator />);
    expect(screen.getByLabelText(/loan amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/interest rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/term/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /calculate/i })).toBeInTheDocument();
  });

  it("validate negative inputs", async () => {
    render(<LoanCalculator />);

    fireEvent.input(screen.getByLabelText(/loan amount/i), { target: { value: "-100" } });
    fireEvent.input(screen.getByLabelText(/interest rate/i), { target: { value: "-5" } });
    fireEvent.input(screen.getByLabelText(/term/i), { target: { value: "-2" } });

    fireEvent.submit(screen.getByRole("button", { name: /calculate/i }));

    await waitFor(() => {
      const positiveNumberErrors = screen.getAllByText(/must be a positive number/i);
      expect(positiveNumberErrors.length).toBe(2);
      expect(screen.getByText(/must be a positive integer/i)).toBeInTheDocument();
    });
  });

  it("successful form submission", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ payment: 100 }),
      })
    ) as unknown as typeof fetch;

    render(<LoanCalculator />);

    fireEvent.input(screen.getByLabelText(/loan amount/i), { target: { value: "1000" } });
    fireEvent.input(screen.getByLabelText(/interest rate/i), { target: { value: "5" } });
    fireEvent.input(screen.getByLabelText(/term/i), { target: { value: "12" } });

    fireEvent.submit(screen.getByRole("button", { name: /calculate/i }));

    await waitFor(() => {
      expect(screen.getByText(/your monthly payment will be/i)).toBeInTheDocument();
      expect(screen.getByText(/100€/i)).toBeInTheDocument();
    });
  });

  it("handles server errors", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    ) as unknown as typeof fetch;

    render(<LoanCalculator />);

    fireEvent.input(screen.getByLabelText(/loan amount/i), { target: { value: "1000" } });
    fireEvent.input(screen.getByLabelText(/interest rate/i), { target: { value: "5" } });
    fireEvent.input(screen.getByLabelText(/term/i), { target: { value: "12" } });

    fireEvent.submit(screen.getByRole("button", { name: /calculate/i }));

    await waitFor(() => {
      expect(screen.getByText(/service is unavailable. try again later./i)).toBeInTheDocument();
    });
  });

  it("handles unexpected server response", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ amount: 100 }),
      })
    ) as unknown as typeof fetch;

    render(<LoanCalculator />);

    fireEvent.input(screen.getByLabelText(/loan amount/i), { target: { value: "1000" } });
    fireEvent.input(screen.getByLabelText(/interest rate/i), { target: { value: "5" } });
    fireEvent.input(screen.getByLabelText(/term/i), { target: { value: "12" } });

    fireEvent.submit(screen.getByRole("button", { name: /calculate/i }));

    await waitFor(() => {
      expect(screen.getByText(/unknown server response/i)).toBeInTheDocument();
    });
  });
});
