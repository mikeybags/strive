from django.test import TestCase
from ..login.models import User
from .models import *
# Create your tests here.

class TestTask(TestCase):
    def test_model(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        new_task = Task.objects.create_task(user.id,"task1", "description of task", start_date="2017-05-30", end_date="2017-05-30", points=15, task_type="medium")
        task = Task.objects.get(id=1)
        self.assertEqual(task.name, "task1")


class TestWager(TestCase):
    def test_model(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        new_user2 = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn26@email.com", username="CDUB2", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        new_task = Task.objects.create_task(user.id,"task1", "description of task", start_date="2017-05-30", end_date="2017-05-30", points=15, task_type="medium")
        print new_task['task'].points
        task = Task.objects.get(name="task1")
        print task.id
        new_wager = Wager.objects.create_wager(user_id=user2.id, task_id=task.id, amount=500, timecap= '03:45')
        wager = Wager.objects.get(id=1)
        self.assertEqual(wager.amount, 500)

class TestFriend(TestCase):
    def test_model(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        new_user2 = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn26@email.com", username="CDUB2", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        user1_friending_user2 = Friend.objects.create_friend(user.id, user2.id)
        friend = Friend.objects.get(id=1)
        self.assertEqual(friend.user.id, user.id)

class TestGroup(TestCase):
    def test_model(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        new_task = Task.objects.create_task(user.id,"task1", "description of task", start_date="2017-05-30", end_date="2017-05-30", points=15, task_type="medium")
        task = Task.objects.get(id=1)
        new_group = Group.objects.create_group("First Group", 300, task.id)
        group = Group.objects.get(id=1)
        self.assertEqual(group.name, "First Group")

class TestGroupMemeber(TestCase):
    def test_model(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        new_user2 = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn26@email.com", username="CDUB2", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        new_task = Task.objects.create_task(user.id,"task1", "description of task", start_date="2017-05-30", end_date="2017-05-30", points=15, task_type="medium")
        task = Task.objects.get(id=1)
        new_group = Group.objects.create_group("First Group", 300, task.id)
        group = Group.objects.get(id=1)
        new_group_member = GroupMember.objects.create_member(group.id, user.id)
        group_member = GroupMember.objects.get(id=1)
        self.assertEqual(group_member.user.id, user.id)
