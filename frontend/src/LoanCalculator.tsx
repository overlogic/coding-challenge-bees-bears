import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loanSchema = z.object({
  loan_amount: z.coerce.number().refine((num) => num > 0, { message: "Must be a positive number" }),
  interest: z.coerce.number().refine((num) => num > 0, { message: "Must be a positive number" }),
  loan_term: z.coerce
    .number()
    .refine((num) => num > 0, { message: "Must be a positive integer" })
    .refine((num) => Number.isInteger(num), { message: "Must be an integer" }),
});

type LoanSchemaType = z.infer<typeof loanSchema>;

type CalcResult = { success: true; result: number } | { success: false; error: string };

export const LoanCalculator: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoanSchemaType>({ resolver: zodResolver(loanSchema) });

  const [result, setResult] = React.useState<CalcResult | undefined>();

  const onReset = () => {
    setResult(undefined);
    reset();
  };

  const onSubmit: SubmitHandler<LoanSchemaType> = async (data) => {
    try {
      const response = await fetch(import.meta.env.VITE_LOAN_CALCULATOR_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        setResult({ success: false, error: response.statusText });
        return;
      }
      const result: { amount: number } = await response.json();
      setResult({ success: true, result: result.amount });
    } catch (err: any) {
      setResult({ success: false, error: err.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="border-b border-gray-900/10">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2 sm:col-start-1">
            <label htmlFor="loan_amount" className="block text-sm font-medium leading-6 text-gray-900">
              Loan amount
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">€</span>
              </div>
              <input
                className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="loan_amount"
                type="number"
                placeholder="0.00"
                {...register("loan_amount")}
              />
            </div>
            {errors.loan_amount && <p className="text-red-600 sm:text-sm mt-2">{errors.loan_amount.message}</p>}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="interest" className="block text-sm font-medium leading-6 text-gray-900">
              Interest rate
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
              <input
                className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="interest"
                type="number"
                placeholder="0.00"
                {...register("interest")}
              />
            </div>
            {errors.interest && <p className="text-red-600 sm:text-sm mt-2">{errors.interest.message}</p>}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="loan_term" className="block text-sm font-medium leading-6 text-gray-900">
              Term
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="loan_term"
                type="number"
                placeholder="Months"
                {...register("loan_term")}
              />
            </div>
            {errors.loan_term && <p className="text-red-600 sm:text-sm mt-2">{errors.loan_term.message}</p>}
          </div>
        </div>

        <div className="mt-8">
          {result && result.success ? (
            <div className="pb-2">
              Your monthly payment will be <span className="font-semibold">{result.result}€</span>
            </div>
          ) : (
            result && <div className="pb-2 text-red-600">Service is unavailable. Try again later.</div>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => onReset()}
          className={"text-sm font-semibold leading-6 text-gray-900" + (isSubmitting ? " opacity-50" : "")}
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={
            isSubmitting
              ? "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm opacity-50"
              : "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          }
        >
          Calculate
        </button>
      </div>
    </form>
  );
};
