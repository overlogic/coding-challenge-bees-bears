import { LoanCalculator } from "./LoanCalculator";

function App() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl mt-10 bg-white shadow-md rounded-lg">
      <div className="p-6">
        <h2 className="text-lg font-semibold leading-7 text-gray-900">Welcome to the Loan Calculator</h2>
        <p className="pt-2 text-sm leading-6 text-gray-600">Enter your loan amount, interest rate, and term, and get an instant estimate of your monthly payments.</p>
        <LoanCalculator />
      </div>
    </div>
  );
}

export default App;
