from django.shortcuts import render, HttpResponse
from .models import *
from datetime import *
import json
from django.http import JsonResponse
from django.core import serializers

def index(request):
    return render(request, 'react/index.html')

def home(request):
    if request.method == 'GET':
        daily_tasks = Task.objects.filter(user__id = request.session['id'], start_date = datetime.date.today())
        upcoming_tasks = Task.objects.filter(user__id = request.session['id'], start_date = datetime.date.today())
        return JsonResponse({'daily_tasks': tasks, 'upcoming_tasks': upcoming_tasks})
    else:
        return JsonResponse({'error': 'Wrong HTTP method'})

def task(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        name = body['name']
        if 'description' in body:
            description = body['description']
        else:
            description = ""
        start_date = body['start_date']
        end_date = body['end_date']
        points = body['points']
        task_type = body['task_type']
        public = body['public']
        task = Task.objects.create_task(request.session['id'], name, description, start_date, end_date, points, task_type, public)
        print task
        if 'errors' in task:
            errors = []
            for error in task["errors"]:
                errors.append(error)
            return JsonResponse({'errors':errors})
        else:
            return JsonResponse({"name":task['task'].name})
    elif request.method == 'GET':
        tasks = Task.objects.filter(user__id=request.session['id']).values('id', 'name', 'description', 'end_date', 'points', 'start_date', 'task_type', 'created_at', 'public')
        return JsonResponse({"tasks": list(tasks)})
    elif request.method == "PATCH":
        if body['completed'] == True:
            task_id = body['task_id']
            updated_task  = Task.objects.completed_task(request.session['id'], task_id)
        else:
            task_id = body['task_id']
            name = body['name']
            description = body['description']
            start_date = body['start_date']
            end_date = body['end_date']
            points = body['points']
            task_type = body['task_type']
            updated_task = Task.objects.update_task(task_id, name, description, start_date, end_date, points, task_type)
            return JsonResponse({'Success':True})
    return JsonResponse({'error':'Wrong HTTP method'})

def group(request):
    body = json.loads(request.body)
    if request.method == 'POST':
        name = body['name']
        wager_amount = body['wager_amount']
        task_id = body['task_id']
        new_group = Group.objects.create_group(name, wager_amount, task_id)
        if new_group:
            new_member = GroupMember.objects.create_member(new_group.group.id, request.session['id'])
    elif request.method == 'GET':
        groups = Group.objects.filter(task__user__id = request.session['id'])
        return JsonResponse({'group':groups})

def add_member(request):
    body = json.loads(request.body)
    if request.method == 'POST':
        group_id = body['group_id']
        new_member = GroupMember.objects.create_member(group_id, request.session['id'])
    else:
        return JsonResponse({'error':'Wrong HTTP method'})


def user_list(request):
    users = User.objects.filter(id=1).values('id','first_name')
    print users
    return JsonResponse({'users': list(users)})
