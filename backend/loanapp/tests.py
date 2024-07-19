from django.test import TestCase
from ninja.testing import TestAsyncClient

from loanapp.models import Customer, LoanOffer
from loanapp.api import router

from loanapp.utils import loan_calculator
from decimal import Decimal


class SharedTestMixin:

    async def create_customer(self, first_name, last_name, email):
        return await Customer.objects.acreate(first_name=first_name, last_name=last_name, email=email)

    async def create_loan_offer(self, customer, amount, interest_rate, term):
        return await LoanOffer.objects.acreate(customer=customer, amount=amount, interest_rate=interest_rate, term=term)


class TestCustomer(TestCase, SharedTestMixin):

    def setUp(self):
        self.client = TestAsyncClient(router)

    async def test_create_customer(self):
        data = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com"
        }
        response = await self.client.post("/customers", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('id', response.json())

    async def test_get_customer(self):
        customer = await self.create_customer("Jane", "Doe", "jane.doe@example.com")
        response = await self.client.get(f"/customers/{customer.id}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            "id": customer.id,
            "first_name": customer.first_name,
            "last_name": customer.last_name,
            "email": customer.email
        })

    async def test_create_duplicate_customer(self):
        data = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com"
        }
        response = await self.client.post("/customers", json=data)
        assert response.status_code == 200
        self.assertEqual(response.status_code, 200)

        response = await self.client.post("/customers", json=data)
        self.assertEqual(response.status_code, 422)


class TestLoanOffer(TestCase, SharedTestMixin):

    def setUp(self):
        self.client = TestAsyncClient(router)

    async def test_create_loan_offer(self):
        customer = await self.create_customer("Alice", "Smith", "alice.smith@example.com")
        data = {
            "customer_id": customer.id,
            "loan_amount": 10000.00,
            "interest_rate": 5.5,
            "loan_term": 36
        }
        response = await self.client.post("/loanoffers", json=data)
        assert response.status_code == 200
        self.assertEqual(response.status_code, 200)
        self.assertIn('id', response.json())

    async def test_create_loan_offer_customer_not_exist(self):
        data = {
            "customer_id": 999,
            "loan_amount": 10000.00,
            "interest_rate": 5.5,
            "loan_term": 36
        }
        response = await self.client.post("/loanoffers", json=data)
        self.assertEqual(response.status_code, 422)

