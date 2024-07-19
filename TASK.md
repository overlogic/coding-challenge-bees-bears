# Take Home Task: Founding Software Engineer

Objective: To evaluate the candidate's technical skills, problem-solving abilities, coding practices, and understanding of modern development tools in the context of a digital lending platform for green technologies.

Task: Design and implement a basic loan calculator for a digital lending product. This micro-version of Bees and Bears' digital platform will maintain a list of customers and their respective loan offers. The system should allow the creation of loan offers based on user input.

## Requirements:

1. **Create a simple backend application using Django.**
   - Use Django's ORM to define data models for a Customer and LoanOffer.
   - Use SQLite as the data store to maintain the list of customers and loan offers.

2. **Implement the following API endpoints:**
   - `POST /customers`: Create a new customer.
   - `GET /customers/{id}`: Retrieve details of a customer.
   - `POST /loanoffers`: Create a loan offer for a customer. The body of the request should include the customer ID, loan amount, interest rate, and loan term.

3. **Loan Calculator Logic:**
   - Implement a basic loan calculator in the backend that computes monthly payments based on the loan amount, interest rate, and term using the standard loan amortization formula.

4. **Frontend using React:**
   - Create a single-page application that allows users to input loan details (amount, interest rate, term) and display the calculated monthly payment.

5. **Validation:**
   - Each API request should perform necessary validation. For example, ensure the loan term and interest rate are positive values.

6. **Testing:**
   - Write unit tests to verify the correctness of your backend application.
   - Ensure frontend components are tested using a framework such as Jest.

7. **Documentation:**
   - Document your design choices, how to run your application, and how to run the tests.

## Evaluation Criteria:

1. **Code Quality:** Proper usage of language constructs, modularization, and organization.
2. **Testing:** How well the code is covered by tests.
3. **Documentation:** Clarity of design choices and instructions for running the code and tests.
4. **Robustness:** Proper handling and validation of inputs, error situations.

## Deliverables:

- The source code of the backend and frontend applications.
- The source code of the tests.
- A README file with documentation.

Please push your solution to a public Git repository and send us the link to the repository or alternatively use git bundle to bundle up your submission, place the resulting file on a file sharing service, and share the link to the file.

This task is designed to be completed in approximately two to three hours. If you find yourself spending significantly more time, try to simplify your approach and document any assumptions or shortcuts you have taken in the README file.

### Getting Started

#### Backend (Django)
1. Set up a new Django project and configure SQLite.
2. Define models for `Customer` and `LoanOffer`.
3. Implement the API endpoints.
4. Add business logic for loan calculation.

#### Frontend (React)
1. Set up a new React project.
2. Create components for inputting loan details and displaying calculated results.

#### Testing
1. Write tests for the backend using Django's testing framework.
2. Write tests for the frontend components using Jest.

#### Documentation
1. Document the architecture, setup instructions, and any assumptions made.

Good luck!
