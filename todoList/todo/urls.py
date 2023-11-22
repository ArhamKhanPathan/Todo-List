from django.urls import path
from todo import views

urlpatterns = [
    path('task/', views.ListTask.as_view()),
    path('task/<int:pk>/', views.TaskDetail.as_view())
]
