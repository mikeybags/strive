from django.shortcuts import render, HttpResponse
from .models import *
from datetime import *
def index(request):
    return render(request, 'react/index.html')

def home(request):
    if request.method == 'GET':
        daily_tasks = Task.objects.filter(user__id = request.session['id'], start_date = datetime.date.today())
        upcoming_tasks = Task.objects.filter(user__id = request.session['id'], start_date = datetime.date.today())
        return JsonRespons({'daily_tasks': tasks, 'upcoming_tasks': upcoming_tasks})
    else:
        return JsonResponse({'errer': 'Wrong HTTP method'})

def Task(request):
    body = json.loads(request.body)
    if request.method == 'POST':
        name = body['name']
        description = body['description']
        start_date = body['start_date']
        end_date = body['end_date']
        points = body['points']
        task_type = body['task_type']
        task = Task.objects.create_task(request.session['id'], name, description, start_date, end_date, points, task_type)
        if 'errors' in  task:
            for error in task["errors"]:
                errors.append(error)
            return JsonResponse({'errors':errors})
        else:
            return JsonResponse({"task":task.task})
    elif request.method == 'GET':
        tasks = Task.objects.filter(user__id=request.session['id'])
        return JsonResponse({"tasks": tasks})
    return JsonResponse({'error':'Wrong HTTP method'})
