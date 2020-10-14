from django.urls import path
from api_v1.views import AddView, SubstractView, MultiplyView, DivideView

app_name = 'api_v1'

urlpatterns = [
    path('add/', AddView.as_view(), name='add'),
    path('substract/', SubstractView.as_view(), name='substract'),
    path('multiply/', MultiplyView.as_view(), name='multiply'),
    path('divide/', DivideView.as_view(), name='divide'),
]
