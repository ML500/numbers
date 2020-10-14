import json

from django.http import JsonResponse
from django.views import View


class AddView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        a = data["A"]
        b = data["B"]
        print(data)
        try:
            return JsonResponse({
                'answer': a + b
            })
        except TypeError:
            response = JsonResponse({'error': 'Incorrect data'})
            response.status_code = 400
            return response


class SubstractView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        a = data["A"]
        b = data["B"]
        try:
            return JsonResponse({
                'answer': a - b
            })
        except TypeError:
            response = JsonResponse({'error': 'Incorrect data'})
            response.status_code = 400
            return response


class MultiplyView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        a = data["A"]
        b = data["B"]
        try:
            return JsonResponse({
                'answer': a * b
            })
        except TypeError:
            response = JsonResponse({'error': 'Incorrect data'})
            response.status_code = 400
            return response


class DivideView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        a = data["A"]
        b = data["B"]
        if b == 0:
            response = JsonResponse({'error': 'Division by zero!'})
            response.status_code = 400
            return response
        try:
            return JsonResponse({
                'answer': a / b
            })
        except TypeError:
            response = JsonResponse({'error': 'Incorrect data'})
            response.status_code = 400
            return response
