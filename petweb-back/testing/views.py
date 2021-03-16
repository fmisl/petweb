# from django.http import HttpResponse
from django.http import HttpResponse, JsonResponse


def index(request):
    # return HttpResponse("Hello, world. You're at the polls index.")
    return JsonResponse({'new_color':'white'})
