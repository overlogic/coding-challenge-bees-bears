from decimal import Decimal, ROUND_HALF_UP


def loan_calculator(amount, interest_rate, term_months):
    """
    Calculate the monthly payment for a loan based on the amount, annual interest rate, and term in months.

    :param amount: The amount of the loan
    :param interest_rate: The annual interest rate as a percentage (e.g., 5 for 5%)
    :param term_months: The term of the loan in months
    :return: The monthly payment amount
    """
    amount = Decimal(amount)
    interest_rate = Decimal(interest_rate)
    term_months = Decimal(term_months)

    monthly_interest_rate = interest_rate / Decimal('100') / Decimal('12')

    # Calculate the monthly payment using the loan amortization formula
    monthly_payment = (amount * monthly_interest_rate * (1 + monthly_interest_rate) ** term_months) / \
                      ((1 + monthly_interest_rate) ** term_months - 1)

    # Round the result to 2 decimal places using ROUND_HALF_UP method
    monthly_payment = monthly_payment.quantize(
        Decimal('0.01'), rounding=ROUND_HALF_UP)

    return monthly_payment
