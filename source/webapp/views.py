from django.shortcuts import render

# Create your views here.
from django.views.generic import ListView
from django.views.generic.base import View


class Index(View):
    def get(self, request):
        return render(request, 'index.html')
