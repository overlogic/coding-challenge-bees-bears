from decimal import InvalidOperation
from django.shortcuts import aget_object_or_404
from django.db import IntegrityError
from ninja import NinjaAPI, Schema, ModelSchema, Router

from loanapp.models import Customer, LoanOffer
from loanapp.utils import loan_calculator


api = NinjaAPI()
router = Router()


class CustomerSchema(ModelSchema):
    class Config:
        model = Customer
        model_fields = ['id', 'first_name', 'last_name', 'email']


class LoanOfferSchema(ModelSchema):
    class Config:
        model = LoanOffer
        model_fields = ['id', 'customer', 'amount', 'interest_rate', 'term']


class LoanOfferCreateSchema(Schema):
    customer_id: int
    loan_amount: float
    interest_rate: float
    loan_term: int


class LoanCalculateSchema(Schema):
    loan_amount: float
    interest_rate: float
    loan_term: int


@router.post("/customers")
async def create_customer(request, customer: CustomerSchema):
    try:
        customer = await Customer.objects.acreate(**customer.dict(exclude={"id"}))
    except IntegrityError:
        return api.create_response(
            request, {"detail": "User already exists"}, status=422)
    return {"id": customer.id}


@router.get("/customers/{id}", response=CustomerSchema)
async def get_customer(request, id: int):
    return await aget_object_or_404(Customer, pk=id)


@router.post("/loanoffers")
async def create_loan_offer(request, loan_offer: LoanOfferCreateSchema):
    for field in ['loan_amount', 'interest_rate', 'loan_term']:
        if loan_offer.dict()[field] < 0:
            return api.create_response(
                request, {"detail": f"{field} cannot be negative"}, status=422)
    cid = loan_offer.customer_id
    try:
        customer = await Customer.objects.aget(id=cid)
    except Customer.DoesNotExist:
        return api.create_response(
            request,
            {"detail": f"Customer with the id={cid} does not exist"},
            status=422
        )
    customer = await Customer.objects.aget(id=cid)
    loan_offer = await LoanOffer.objects.acreate(
        customer=customer,
        amount=loan_offer.loan_amount,
        interest_rate=loan_offer.interest_rate,
        term=loan_offer.loan_term,
    )
    return {"id": loan_offer.id}


@router.post("/calculateloan")
async def get_loan_estimate(request, loan_calc: LoanCalculateSchema):
    for field in ['loan_amount', 'interest_rate', 'loan_term']:
        if loan_calc.dict()[field] < 0:
            return api.create_response(
                request, {"detail": f"{field} cannot be negative"}, status=422)
    try:
        return {"payment": loan_calculator(loan_calc.loan_amount, loan_calc.interest_rate, loan_calc.loan_term)}
    except InvalidOperation:
        return api.create_response(
            request, {"detail": "Invalid input"}, status=422)

api.add_router("", router)
