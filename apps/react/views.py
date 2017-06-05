from django.shortcuts import render, HttpResponse
from .models import *
from datetime import *
import datetime
import json
from django.http import JsonResponse
from django.core import serializers
import datetime
from django.db.models import Q

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
        tasks = Task.objects.filter(user__id=request.session['id']).values('id', 'name', 'description', 'end_date', 'points', 'start_date', 'task_type', 'created_at', 'public', 'completed', 'updated_at')
        return JsonResponse({"tasks": list(tasks)})
    elif request.method == "PATCH":
        body = json.loads(request.body)
        task_id = body['id']
        name = body['name']
        description = body['description']
        start_date = body['start_date']
        end_date = body['end_date']
        points = body['points']
        task_type = body['task_type']
        public = body['public']
        updated_task = Task.objects.update_task(task_id, name, description, start_date, end_date, points, task_type, public)
        if body['completed'] == True:
            updated_task = Task.objects.completed_task(request.session['id'], task_id)
        if 'errors' in updated_task:
            errors = []
            for error in updated_task["errors"]:
                errors.append(error)
            return JsonResponse({'errors':errors})
        else:
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
    if request.method == 'PUT':
        if body['status'] == 'accept':
            group_id = body['group_id']
            group = GroupMember.objects.accepted(group_id, request.session['id'])
        else:
            group_member_id = body['group_member']
            group = GroupMember.objects.denied(group_member_id)
        return JsonResponse({'Success': 'Group member changed'})
    else:
        return JsonResponse({'error':'Wrong HTTP method'})

def activity_feed(request):
    if request.method == 'GET':
        pass
    else:
        return JsonResponse({'error': 'Wrong HTTP method'})

def points(request):
    if request.method == 'GET':
        user = User.objects.get(id=request.session['id'])
        return JsonResponse({'open_balance':user.open_balance, 'wager_balance':user.wager_balance, 'spent':user.spent})
    else:
        return JsonResponse({'error':'Wrong HTTP method'})

def user_search(request):
    if request.method == 'GET':
        term = request.GET['props']
        friends = Friend.objects.filter(user=request.session['id']).values_list('friend', flat=True)
        users = User.objects.filter(username__contains=term).exclude(id__in=friends).exclude(id=request.session['id']).values('first_name', 'last_name', 'tag_line', 'username', 'profile_picture', 'id')
        if 'errors' in users:
            errors = []
            for error in task["errors"]:
                errors.append(error)
            return JsonResponse({'errors':errors})
        else:
            return JsonResponse({"users": list(users), "term": term})
    else:
        return JsonResponse({'error': 'Wrong HTTP method'})

def request_friend(request):
    if request.method == 'GET':
        id = request.GET['props']
        friend = Friend.objects.create_friend(request.session['id'],id)
        if 'errors' in friend:
            errors = []
            for error in friend["errors"]:
                errors.append(error)
            return JsonResponse({'errors':errors})
        else:
            return JsonResponse({'Success':True})
    elif request.method == 'PUT':
        body = json.loads(request.body)
        if body['status'] == 'accept':
            friend = Friend.objects.accepted(request.session['id'], body['friend'])
        else:
            friend = Friend.objects.denied(body['friendship_id'])
        return JsonResponse({'Success':'Friend changed'})

    else:
        return JsonResponse({'error': 'Wrong HTTP method'})

def create_store_item(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        print body
        name = body['name']
        price = body['price']
        picture = body['picture']
        category = body['category']
        item = StoreImage.objects.create_item(category, name, price, picture)
        if 'errors' in item:
            errors = []
            for error in item["errors"]:
                errors.append(error)
            return JsonResponse({'errors':errors})
        else:
            return JsonResponse({'Success':True})
    else:
        return JsonResponse({'error':'Wrong HTTP method'})

def store(request):
    if request.method == 'GET':
        items = StoreImage.objects.all().exclude(images_purchased__user__id=request.session['id']).values('id', 'name', 'picture', 'price', 'category')
        return JsonResponse({"items": list(items)})
    if request.method == 'POST':
        body = json.loads(request.body)
        print body
        item_id = body['item_id']
        purchase = UserImage.objects.create_user_purchase(request.session['id'], item_id)
        if 'errors' in purchase:
            errors = []
            for error in purchase["errors"]:
                errors.append(error)
            return JsonResponse({'errors':errors})
        else:
            return JsonResponse({'Success':purchase['image']})
    else:
        return JsonResponse({'error':'Wrong HTTP method'})

def purchases(request):
        if request.method == 'GET':
            purchases = StoreImage.objects.filter(images_purchased__user__id=request.session['id']).values("id","name", "picture", "category")
            return JsonResponse({"purchases": list(purchases)})
        else:
            return JsonResponse({'error':'Wrong HTTP method'})

def friends(request):
        if request.method == 'GET':
            friends = User.objects.filter(friended_users__user=request.session['id'], friended_users__accepted=True).values("id","first_name", "last_name", "username", "profile_picture", "tag_line", "open_balance", "wager_balance", "updated_at")
            print friends
            return JsonResponse({"friends": list(friends)})
        else:
            return JsonResponse({'error':'Wrong HTTP method'})

def friend_tasks(request, id):
        if request.method == 'GET':
            trailing_points = [0,0,0,0,0]
            rolling_day = datetime.date.today() - datetime.timedelta(days=5)
            friend_tasks = Task.objects.filter(user__id=id, public=True, completed=False).values('id', 'name', 'description', 'end_date', 'points', 'start_date', 'task_type', 'public')
            friends_5day_points = Task.objects.filter(user__id=id, end_date__lte = datetime.date.today(), end_date__gte = rolling_day, completed=True)
            for i in friends_5day_points:
                if i.end_date == (datetime.date.today() - datetime.timedelta(days=5)):
                    trailing_points[0] += i.points
                elif i.end_date == (datetime.date.today() - datetime.timedelta(days=4)):
                    trailing_points[1] += i.points
                elif i.end_date == (datetime.date.today() - datetime.timedelta(days=3)):
                    trailing_points[2] += i.points
                elif i.end_date == (datetime.date.today() - datetime.timedelta(days=2)):
                    trailing_points[3] += i.points
                else:
                    trailing_points[4] += i.points
            return JsonResponse({"friend_tasks": list(friend_tasks), "recent_points": list(trailing_points)})
        else:
            return JsonResponse({'error':'Wrong HTTP method'})

def wager_graph(request, id):
    if request.method == 'GET':
        wagers = []
        prev_20 = datetime.date.today() - datetime.timedelta(days=20)
        for i in range(0,19):
            wagers.append(0)
        user = User.objects.get(id=id)
        print user
        wagers_won = Wager.objects.filter(winner=user.id, task__end_date__lt = datetime.date.today(), task__end_date__gte = prev_20, accepted=True)
        wagers_loss = Wager.objects.filter(loser=user.id, task__end_date__lt = datetime.date.today(), task__end_date__gte = prev_20, accepted=True)
        today_day = datetime.date.today()
        for wager in wagers_won:
            wager_day = wager.task.end_date
            delta_day = today_day - wager_day
            wagers[delta_day.days] += wager.points
        for wager in wagers_loss:
            wager_day = wager.task.end_date
            delta_day = today_day - wager_day
            wagers[delta_day.days] -= wager.points
        return JsonResponse({'data': wagers})

def task_graph(request, id):
    if request.method =='GET':
        completion_percentage = []
        all_tasks_by_day = []
        completed_tasks_by_day = []
        prev_10 = datetime.date.today() - datetime.timedelta(days=10)
        user = User.objects.get(id=id)
        for i in range(0,9):
            all_tasks_by_day.append(0)
            completed_tasks_by_day.append(0)
        all_tasks = Task.objects.filter(user__id=id, end_date__lt = datetime.date.today(), end_date__gte = prev_10)
        completed_tasks = Task.objects.filter(user__id=id, completed=True, end_date__lt = datetime.date.today(), end_date__gte=prev_10)
        today_day = datetime.date.today()
        for task in all_tasks:
            task_day = task.end_date
            delta_day = today_day - task_day
            all_tasks_by_day[delta_day.days] += 1
        for completed_task in completed_tasks:
            task_day = completed_task.end_date
            delta_day = today_day - task_day
            completed_tasks_by_day[delta_day.days] += 1
        for i in range(0,9):
            if all_tasks_by_day[i] == 0:
                completion_percentage.append(0)
            else:
                completion_percentage.append(completed_tasks_by_day[i] / all_tasks_by_day[i])
        completion_percentage = list(reversed(completion_percentage))
        return JsonResponse({'completion_percentage': list(completion_percentage), 'user':user.username})

def user_competition_graph(request, id):
    user = User.objects.get(id=id)
    friends = Friend.objects.filter(user=user.id)
    friends_list = []
    friends_list_ratio = []
    for friend in friends:
        winner_count = 0
        wins = Wager.objects.filter(loser = friend.friend.id, winner=user.id)
        losses = Wager.objects.filter(winner = friend.friend.id, loser=user.id)
        for win in wins:
            winner_count += 1
        total_count = winner_count
        for loss in losses:
            total_count += 1
        friends_list.append(friend.friend.username)
        friends_list_ratio.append(float(winner_count) / float(total_count))
    return JsonResponse({'friends': list(friends_list), 'ratio': list(friends_list_ratio)})

def get_requests(request):
    if request.method == 'GET':
        group_requests = GroupMember.objects.filter(user__id = request.session['id'], accepted = False).values('group__task__user__username', 'group__name', 'user_id', 'id', 'group_id' )
        # wager_requests = Wager.objects.filter(task__user__id = request.session['id'], accepted = False, task__end_date__gte=datetime.date.today()).values('points', 'wagerer', 'task__name', 'id')
        friend_requests = Friend.objects.filter(friend__id = request.session['id'], accepted = False).values('user__username', 'user__first_name', 'user__last_name', 'user_id', 'id')
        return JsonResponse ({
            'friend_requests': list(friend_requests),
            'group_requests': list(group_requests),
            })
    else:
        return JsonResponse({ 'error': 'Wrong HTTP method'})


def wagers(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        task_id = body['task']
        wager_amount = int(body['wager'])
        wager = Wager.objects.create_wager(request.session['id'], task_id, wager_amount)
        if 'errors' in wager:
            errors = []
            for error in wager["errors"]:
                errors.append(error)
            return JsonResponse({'errors':errors})
        else:
            return JsonResponse({'Success':'true'})
    elif request.method == 'GET':
        wagers = Wager.objects.filter(Q(wagerer=request.session['id']) | Q(task__user=request.session['id']), task__end_date__gte=datetime.date.today(),).values("id", "points", "accepted", "wagerer", "wagerer__username", "loser", "task", "task__name", "task__end_date", "task__user", "task__user__username")
        wagers = list(wagers)
        for wager in wagers:
            wager['current_user'] = request.session['id']
        return JsonResponse({"wagers": wagers})
    elif request.method == 'PUT':
        body = json.loads(request.body)
        if body['status'] == 'accept':
            wager = Wager.objects.accepted(request.session['id'], body['wager'])
        else:
            wager = Wager.objects.denied(body['wager'])
        return JsonResponse({'Success':'Wager changed'})
    else:
        return JsonResponse({'error': 'Wrong HTTP method'})
