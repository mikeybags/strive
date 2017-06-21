from __future__ import unicode_literals
from ..login.models import User
from django.db import models
import datetime
from django.utils import timezone
import re

class TaskManager(models.Manager):
    def task_validator(self, name, start_date, end_date):
        errors = []
        if len(name) < 2:
            errors.append("Task name needs to be longer than 2 characters")
        if str(datetime.date.today()) > str(start_date):
            errors.append("Task start date cannot be early")
        if str(datetime.date.today()) > str(end_date):
            errors.append("Task end date cannot be early")
        if start_date > end_date:
            errors.append("Start date cannot be later than end date")
        return errors

    def create_task(self, user_id, name, description, start_date, end_date, points, task_type, public):
        errors = Task.objects.task_validator(name, start_date, end_date)
        if len(errors) > 0:
            return {'errors': errors}
        else:
            user = User.objects.get(id=user_id)
            if public == "true":
                public = True
            else:
                public = False
            task = Task(user=user, name=name, description=description, start_date=start_date, end_date=end_date, points=points, task_type=task_type, public=public)
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
                print timezone.now().date()
                print task.end_date
                if timezone.now().date() <= task.end_date:
                    Wager.objects.win(wager.id, user_id)
                else:
                    Wager.objects.lose(wager.id, user_id)
        tomorrow = datetime.date.today() + datetime.timedelta(days=1)
        if task.task_type == "recurring":
            Task.objects.create_task(user.id, task.name, task.description, tomorrow, tomorrow, task.points, task.task_type, task.public)
        return {'task':task}

    def update_task(self, task_id, name, description, start_date, end_date, points, task_type, public):
        errors = Task.objects.task_validator(name, start_date, end_date)
        if len(errors) > 0:
            return {'errors': errors}
        else:
            public = public
            task = Task.objects.filter(id=task_id).update(name=name, description=description, start_date=start_date, end_date=end_date, points=points, task_type=task_type, public=public)
            return {'task':task}

    def public_task(self, task_id):
        task = Task.objects.filter(id=task_id).update(public=True)
        return {'task': task}



class WagerManager(models.Manager):
    def wager_validations(self, user_points, task_user_points, wager_points):
        errors = []
        if user_points < wager_points:
            errors.append("You do not have enough points")
        if task_user_points < wager_points:
            errors.append("User does not have enough points")
        return errors

    def create_wager(self, user_id, task_id, points):
        user = User.objects.get(id=user_id)
        task = Task.objects.get(id=task_id)
        task_user = User.objects.get(id=task.user.id)
        errors = Wager.objects.wager_validations(user.open_balance, task_user.open_balance, points)
        if len(errors) > 0:
            return {"errors": errors}
        else:
            wager = Wager(wagerer=user, task=task, points=points)
            wager.save()
            user.open_balance -= wager.points
            user.wager_balance += wager.points
            user.save()
            return {'wager': wager}

    def accepted(self, user_id, wager_id):
        user = User.objects.get(id = user_id)
        wager = Wager.objects.get(id = wager_id)
        wager.accepted = True
        user.open_balance -= wager.points
        user.wager_balance += wager.points
        wager.save()
        user.save()
        return True

    def denied(self, wager_id):
        wager = Wager.objects.get(id=wager_id)
        wager.delete()
        user = User.objects.get(id = wager.wagerer.id)
        user.open_balance += wager.points
        user.wager_balance -= wager.points
        user.save()
        wagerer_user.save()
        return True

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
        wagerer_user.save()
        return True

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
        return True

class FriendManager(models.Manager):
    def create_friend(self, user_id, friending_user_id, accepted=False):
        user = User.objects.get(id=user_id)
        friending_user = User.objects.get(id=friending_user_id)
        friend = Friend(user=user, friend=friending_user)
        friend.save()
        return {'friend': friend}

    def accepted(self, user_id, friend_id):
        Friend.objects.filter(user=friend_id, friend=user_id).update(accepted=True)
        return True

    def denied(self, friendship_id):
        friend = Friend.objects.get(id=friendship_id)
        friend.delete()
        return True

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
        return {'member': member}

    def accepted(self, group_id, user_id):
        group = Group.objects.get(id=group_id)
        if timezone.now() < group.end_date:
            member = GroupMember.objects.get(group=group_id, user=user_id)
            member.accepted=True
            member.completed=False
            member.save()
            return True
        else:
            errors = ["Past end date, cannot sign up"]
            return ({"errors": errors})

    def denied(self, groupMember_id):
        groupMember = GroupMember.objects.get(id=groupMember_id)
        groupMember.delete()
        return True


class CommentManager(models.Manager):
    def create_comment(self, task_id, user_id, comment):
        user = User.objects.get(id=user_id)
        task = Task.objects.get(id=task_id)
        comment = Comment(user=user, task=task, comment=comment)
        comment.save()
        return True

class StoreImageManager(models.Manager):
    def store_validator(self, category, name, price, picture):
        errors = []
        if len(category) < 2:
            errors.append("category must be longer than 2 characters")
        if len(name) < 2:
            errors.append("name must be longer than 2 characters")
        if price < 100:
            errors.append("price must be larger than 100 points")
        if len(picture) < 2:
            errors.append("picture must be larger than 2 characters")
        return errors

    def create_item(self, category, name, price, picture):
        errors = StoreImage.objects.store_validator(category, name, price, picture)
        if len(errors) > 0:
            return ({"errors": errors})
        else:
            picture = StoreImage(category=category, name=name, price=price, picture=picture)
            picture.save()
            return {'picture':True}

class UserImageManager(models.Manager):
    def create_user_purchase(self, user_id, image_id):
        user = User.objects.get(id=user_id)
        image = StoreImage.objects.get(id=image_id)
        errors = []
        if user.open_balance < image.price:
            errors.append("Do not have enough points")
        if len(errors) > 0:
                return ({'errors':errors})
        else:
            user_purchase = UserImage(user=user, image=image)
            user_purchase.save()
            user.open_balance -= image.price
            user.spent += image.price
            user.profile_picture = image.picture
            user.save()
            return {'image':image.picture}

class ActivityManager(models.Manager):
    def create_activity(self, user_id, verb, type):
        pass

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
    accepted = models.BooleanField(default=False)
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

class StoreImage(models.Model):
    category = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    picture = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = StoreImageManager()

class UserImage(models.Model):
    user = models.ForeignKey(User, related_name="user_images")
    image = models.ForeignKey(StoreImage, related_name="images_purchased")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserImageManager()
