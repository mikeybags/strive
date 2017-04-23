from __future__ import unicode_literals
from ..login.models import User
from django.db import models


class TaskManager(models.Manager):
    def create_task(self, user_id, name, description, start_date, end_date, points, task_type, public):
        user = User.objects.get(id=user_id)
        if public == "true":
            public = True
        else:
            public = False
        task = Task(user=user, name=name, description=description, start_date=start_date, end_date=end_date, points=points, task_type=task_type, public=public)
        task.save()
        return {'task': task}


class WagerManager(models.Manager):
    def create_wager(self, user_id, task_id, amount, timecap):
        user = User.objects.get(id=user_id)
        task = Task.objects.get(id=task_id)
        wager = Wager(wagerer=user, task=task, amount=amount, timecap=timecap)
        wager.save()
        return {'wager': wager}

class FriendManager(models.Manager):
    def create_friend(self, user_id, friending_user_id):
        user = User.objects.get(id=user_id)
        friending_user = User.objects.get(id=friending_user_id)
        friend = Friend(user=user, friend=friending_user)
        friend.save()
        return {'friend': friend}

class GroupManager(models.Manager):
    def create_group(self, name, wager_amount, task_id):
        task = Task.objects.get(id=task_id)
        group = Group(name=name, wager_amount=wager_amount, task=task)
        group.save()
        return {'group': group}


class GroupMemberManager(models.Manager):
    def create_member(self, group_id, user_id):
        user = User.objects.get(id=user_id)
        group = Group.objects.get(id=group_id)
        member = GroupMember(group=group, user=user)
        member.save()
        return {'member': member}

class Task(models.Model):
    user = models.ForeignKey(User, related_name="user_task")
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=1000)
    start_date = models.DateField()
    end_date = models.DateField()
    points = models.IntegerField()
    completed = models.BooleanField(default=False)
    public = models.BooleanField(default=False)
    task_type = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = TaskManager()

class Wager(models.Model):
    amount = models.IntegerField()
    accepted = models.BooleanField(default=False)
    timecap = models.TimeField()
    task = models.ForeignKey(Task, related_name="task_wager")
    wagerer = models.ForeignKey(User, related_name="user_wagerer")
    winner = models.ForeignKey(User, related_name="user_winner", default=None, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = WagerManager()

class Friend(models.Model):
    user = models.ForeignKey(User, related_name="user_friend")
    friend = models.ForeignKey(User, related_name="friended_users")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = FriendManager()

class Group(models.Model):
    name = models.CharField(max_length=255)
    task = models.ForeignKey(Task, related_name="group_task")
    wager_amount = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = GroupManager()

class GroupMember(models.Model):
    group = models.ForeignKey(Group, related_name="group_members")
    user = models.ForeignKey(User, related_name="user_group")
    accepted = models.BooleanField(default=False)
    win = models.NullBooleanField(default=None, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = GroupMemberManager()

# Create your models here.
