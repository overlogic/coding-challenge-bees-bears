# Frontend Overview

This is a React application bootstrapped with Vite and managed with pnpm. 

The application allows users to input loan details (amount, interest rate, term) and displays the calculated monthly payment.

It also includes a basic test suite using Vitest and React Testing Library.

## Technologies Used

This project utilizes the following libraries and frameworks:

- **React Hook Form**: For handling form and managing state.
- **Zod**: For input validation.
- **Tailwind CSS**: For styling.

## Installation

First, ensure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (version 20.x or higher)
- [pnpm](https://pnpm.io/)

Clone the repository and install dependencies:

```bash
git clone https://github.com/overlogic/coding-challenge-bees-bears
cd coding-challenge-bees-bears/frontend
pnpm install
```
## Configuring the calculateloan endpoint

By default, the endpoint is set to `http://localhost:8000/calculateloan`, which is the default port and endpoint for the backend application, so you don't need to change it unless you have a different backend running.

To configure an endpoint, you need to update the `VITE_LOAN_CALCULATOR_ENDPOINT` environment variable in the `.env` or add it to the `.env.local` file.

For example, if you want to use the `https://example.com/calculateloan` endpoint, you can set the environment variable as follows:

```bash
VITE_LOAN_CALCULATOR_ENDPOINT=https://example.com/calculateloan
```


## Running the Application

To start the development server, run:

```bash
pnpm dev
```

This will start the Vite development server and you can view the application at `http://localhost:5173`.

## Building the Application

To create a production build, run:

```bash
pnpm build
```

The output will be in the `dist` directory.

## Running Tests

This project uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for testing.

To run the tests, execute:

```bash
pnpm test
```

This will run all the tests and display the results in the terminal.

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
