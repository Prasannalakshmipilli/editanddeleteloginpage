from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
def empform(request):
    return render(request, "emp.html")  # must match folder structure
@api_view(["post"])
def create_emp(requst):
    emps=requst.data
    print(emps)
    return Response({"msg":"emp create successfully","data":emps})