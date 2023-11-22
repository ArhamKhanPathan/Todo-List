# todo/views.py
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer

class ListTask(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
