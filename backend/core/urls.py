from django.urls import path
from loanapp.api import api


urlpatterns = [
    path('', api.urls),
]
