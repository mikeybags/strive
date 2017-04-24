from __future__ import unicode_literals
from ..login.models import User
from django.db import models
import datetime
from django.utils import timezone



class TaskManager(models.Manager):
    def create_task(self, user_id, name, description, start_date, end_date, points, task_type):
        user = User.objects.get(id=user_id)
        task = Task(user=user, name=name, description=description, start_date=start_date, end_date=end_date, points=points, task_type=task_type)
        task.save()
        return {'task': task}

    def completed_task(self, user_id, task_id):
        task = Task.objects.get(id=task_id)
        task.completed=True
        task.save()
        user = User.objects.get(id=user_id)
        user.open_balance += task.points
        user.save()
        wagers = Wager.objects.filter(task__id = task.id, accepted=True)
        if len(wagers) > 0:
            for wager in wagers:
                if timezone.now() > wager.timecap:
                    Wager.objects.win(wager.wagerer.id, user_id)
                else:
                    Wager.objects.lose(wager.wagerer.id, user_id)
        tomorrow = datetime.date.today() + datetime.timedelta(days=1)
        if task.task_type == "recurring":
            Task.objects.create_task(user.id, task.name, task.description, tomorrow, tomorrow, task.points, task.task_type)
        return {'task': task}

    def update_task(self, task_id, name, description, start_date, end_date, points, task_type):
        task = Task.objects.filter(id=task_id).update(name=name, description=description, start_date=start_date, end_date=end_date, points=points, task_type=task_type)
        return {'task': task}

    def public_task(self, task_id):
        task = Task.objects.filter(id=task_id).update(public=True)
        return {'task': task}



class WagerManager(models.Manager):
    def create_wager(self, user_id, task_id, points, timecap):
        user = User.objects.get(id=user_id)
        task = Task.objects.get(id=task_id)
        wager = Wager(wagerer=user, task=task, points=points, timecap=timecap)
        wager.save()
        user.open_balance -= wager.points
        user.wager_balance += wager.points
        return {'wager': wager}

    def accepted(self, user_id, wager_id):
        user = User.objects.get(id = user_id)
        wager = Wager.objects.get(id = wager_id)
        wager.accepted = True
        user.open_balance -= wager.points
        user.wager_balance += wager.points
        print user.open_balance
        wager.save()
        user.save()

    def denied(self, wager_id):
        wager = Wager.objects.get(id=wager_id)
        user = User.objects.get(id = wager.wagerer.id)
        user.open_balance += wager.points
        user.wager_balance -= wager.points
        user.save()

    def win(self, wager_id, user_id):
        wager = Wager.objects.get(id=wager_id)
        user = User.objects.get(id=user_id)
        wagerer_user = User.objects.get(id = wager.wagerer.id)
        wager.loser = wagerer_user
        wager.winner = user
        wager.save()
        user.open_balance += 2 * wager.points
        user.wager_balance -= wager.points
        wagerer_user.wager_balance -= wager.points
        user.save()

    def lose(self, wager_id, user_id):
        wager = Wager.objects.get(id=wager_id)
        user = User.objects.get(id=user_id)
        wagerer_user = User.objects.get(id = wager.wagerer.id)
        wager.loser = user
        wager.winner = wagerer_user
        wager.save()
        wagerer_user.open_balance += 2 * wager.points
        wagerer_user.wager_balance -= wager.points
        user.wager_balance -= wager.points
        user.save()

class FriendManager(models.Manager):
    def create_friend(self, user_id, friending_user_id):
        user = User.objects.get(id=user_id)
        friending_user = User.objects.get(id=friending_user_id)
        friend = Friend(user=user, friend=friending_user)
        friend.save()
        return {'friend': friend}

class GroupManager(models.Manager):
    def create_group(self, name, wager_points, task_id, end_date):
        task = Task.objects.get(id=task_id)
        group = Group(name=name, wager_points=wager_points, task=task, end_date=end_date)
        group.save()
        return {'group': group}


class GroupMemberManager(models.Manager):
    def create_member(self, group_id, user_id):
        user = User.objects.get(id=user_id)
        group = Group.objects.get(id=group_id)
        member = GroupMember(group=group, user=user)
        member.save()
        print 'hello'
        return {'member': member}

    def accepted(self, group_id, user_id):
        member = GroupMember.objects.get(group=group_id, user=user_id)
        member.accepted=True
        member.completed=False
        member.save()

class CommentManager(models.Manager):
    def create_comment(self, task_id, user_id, comment):
        user = User.objects.get(id=user_id)
        task = Task.objects.get(id=task_id)
        comment = Comment(user=user, task=task, comment=comment)
        comment.save()


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
    points = models.IntegerField()
    accepted = models.BooleanField(default=False)
    timecap = models.DateTimeField()
    task = models.ForeignKey(Task, related_name="task_wager")
    wagerer = models.ForeignKey(User, related_name="user_wagerer")
    winner = models.ForeignKey(User, related_name="user_winner", default=None, null=True, blank=True)
    loser = models.ForeignKey(User, related_name="user_loser", default=None, null=True, blank=True)
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
    wager_points = models.IntegerField()
    end_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = GroupManager()

class GroupMember(models.Model):
    group = models.ForeignKey(Group, related_name="group_members")
    user = models.ForeignKey(User, related_name="user_group")
    accepted = models.BooleanField(default=False)
    completed = models.NullBooleanField(default=None, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = GroupMemberManager()

class Comment(models.Model):
    task = models.ForeignKey(Task, related_name="task_comments")
    user = models.ForeignKey(User, related_name="user_comments")
    comment = models.TextField(max_length="1000")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CommentManager()


# Create your models here.
