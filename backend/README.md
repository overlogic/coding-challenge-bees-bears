# Backend Overview

This application implements a simple API for managing customers and loan offers. It also implements a basic loan calculator to compute monthly payments based on the loan amount, interest rate, and term.

## Technologies Used

This application leverages Django Ninja to create a robust and efficient API. 
Django Ninja is a framework that offers a high-performance alternative to Django Rest Framework (DRF), using type hints and Pydantic for data validation, resulting in cleaner code and improved performance.

## Endpoints

### Create a new customer
- **Endpoint**: `POST /customers`
- **Description**: Creates a new customer.
- **Request Body**: 
```json
{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com"
}
```
- **Response**:
```json
{
    "id": 1,
}
```

### Retrieve details of a customer
- **Endpoint**: `GET /customers/{id}`
- **Description**: Retrieves details of a customer by their ID.
- **Response**:
```json
{
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com"
}
```


### Create a loan offer for a customer
- **Endpoint**: `POST /loanoffers`
- **Description**: Creates a loan offer for a customer.
- **Request Body**:
```json
{
    "customer_id": 1,
    "loan_amount": 10000,
    "interest_rate": 5.5,
    "loan_term": 36
}
```
- **Response**:
```json
{
    "id": 1,
}
```



### Calculate monthly loan payments
- **Endpoint**: `POST /calculateloan`
- **Description**: Computes monthly payments based on the loan amount, interest rate, and term using the standard loan amortization formula.
- **Request Body**:
```json
{
    "loan_amount": 10000,
    "interest_rate": 5.5,
    "loan_term": 36
}
```
- **Response**:
```json
{
    "payment": 300.55
}
```


## Prerequisites

- Python 3.7+
- Django 3.1+

## Installation

**Clone the repository:**

   ```sh
   git clone https://github.com/overlogic/coding-challenge-bees-bears
   cd coding-challenge-bees-bears/backend
   ```

**Create and activate a virtual environment:**

   ```sh
   python3 -m venv env
   source env/bin/activate
   ```

**Install the dependencies:**

   ```sh
   pip install -r requirements.txt
   ```

**Apply database migrations:**

   ```sh
   python manage.py migrate
   ```

**Run the development server:**

   ```sh
   python manage.py runserver
   ```

   The application should now be accessible at `http://127.0.0.1:8000/`.

## Running Tests

To ensure that everything is working correctly, you can run the included tests:

**Run the tests using Django's test framework:**

   ```sh
   python manage.py test
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for more details.
