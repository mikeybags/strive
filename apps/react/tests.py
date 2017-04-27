from django.test import TestCase
from ..login.models import User
from .models import *
import datetime
# Create your tests here.

class TestTask(TestCase):
    def test_model(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        new_task = Task.objects.create_task(user.id,"task1", description="description of task", start_date="2017-05-30", end_date="2017-05-30", points=15, task_type="regular", public="true")
        task = Task.objects.get(id=1)
        self.assertEqual(task.name, "task1")

    def test_model_completed(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        new_user2 = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn2@email.com", username="CDUB2", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        new_task = Task.objects.create_task(user.id,"task1", "description of task", start_date="2017-05-30", end_date="2017-05-30", points=15, task_type="recurring",public="true")
        task = Task.objects.get(id=1)
        Wager.objects.create_wager(user2.id, task.id, 10, "2017-04-19 16:42:00.000000+00:00")
        Wager.objects.create_wager(user.id, task.id, 10, "2017-04-27 16:48:00.000000+00:00")
        Wager.objects.accepted(user_id=1, wager_id=1)
        Wager.objects.accepted(user_id=1, wager_id=2)
        complete_task = Task.objects.completed_task(user.id, task.id)
        updated_user = User.objects.get(id=1)
        completed_task = Task.objects.get(id=1)
        task2 = Task.objects.get(id=2)
        self.assertEqual(completed_task.completed, True)
        self.assertEqual(updated_user.open_balance, 115 )
        self.assertEqual(task2.name, "task1")
        self.assertEqual(task2.task_type, "recurring")

    def test_model_updatedtask(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        new_task = Task.objects.create_task(user.id,"task1", "description of task", start_date="2017-05-30", end_date="2017-05-30", points=15, task_type="medium", public="true")
        task = Task.objects.get(id=1)
        update_task = Task.objects.update_task(task.id, "updated_task", "description of task", "2017-06-30", "2017-06-30", points=15, task_type="medium", public="true")
        updated_task = Task.objects.get(id=1)
        self.assertEqual(updated_task.name, "updated_task")
        self.assertEqual(updated_task.start_date, datetime.date(2017, 6, 30))


class TestWager(TestCase):
    def test_model(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        new_user2 = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn26@email.com", username="CDUB2", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        new_task = Task.objects.create_task(user.id,"task1", "description of task", start_date="2017-05-30", end_date="2017-05-30", points=15, task_type="medium", public="true")
        task = Task.objects.get(name="task1")
        new_wager = Wager.objects.create_wager(user_id=user2.id, task_id=task.id, points=10, timecap= '2017-04-27 16:48:00.000')
        wager = Wager.objects.get(id=1)
        self.assertEqual(wager.points, 10)

    def test_model_validations(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        new_user2 = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn26@email.com", username="CDUB2", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        user.open_balance += 500
        user.save()
        user2 = User.objects.get(id=2)
        new_task = Task.objects.create_task(user.id,"task1", "description of task", start_date="2017-05-30", end_date="2017-05-30", points=15, task_type="medium", public="true")
        print new_task['task'].points
        task = Task.objects.get(name="task1")
        print task.id
        new_wager = Wager.objects.create_wager(user_id=user2.id, task_id=task.id, points=500, timecap= '2017-04-27 16:48:00.000')
        print new_wager['errors']
        self.assertEqual(new_wager['errors'][0], "You do not have enough points")

    def test_model_validations2(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        new_user2 = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn26@email.com", username="CDUB2", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        user2.open_balance += 500
        user2.save()
        new_task = Task.objects.create_task(user.id,"task1", "description of task", start_date="2017-05-30", end_date="2017-05-30", points=15, task_type="medium", public="true")
        print new_task['task'].points
        task = Task.objects.get(name="task1")
        print task.id
        new_wager = Wager.objects.create_wager(user_id=user2.id, task_id=task.id, points=500, timecap= '2017-04-27 16:48:00.000')
        print new_wager['errors']
        self.assertEqual(new_wager['errors'][0], "User does not have enough points")

class TestFriend(TestCase):
    def test_model(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        new_user2 = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn26@email.com", username="CDUB2", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        user1_friending_user2 = Friend.objects.create_friend(user.id, user2.id)
        friend = Friend.objects.get(id=1)
        self.assertEqual(friend.user.id, user.id)

    def test_model_accepted(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        new_user2 = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn26@email.com", username="CDUB2", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        Friend.objects.create_friend(user.id, user2.id)
        Friend.objects.accepted(user2.id, user.id)
        friend = Friend.objects.get(id=1)
        friend2 = Friend.objects.get(id=2)
        self.assertEqual(friend.accepted, True)
        self.assertEqual(friend2.accepted, True)


class TestGroup(TestCase):
    def test_model(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        new_task = Task.objects.create_task(user.id,"task1", "description of task", start_date="2017-05-30", end_date="2017-05-30", points=15, task_type="medium", public="true")
        task = Task.objects.get(id=1)
        new_group = Group.objects.create_group("First Group", 300, task.id, "2017-04-27 16:48:00.000")
        group = Group.objects.get(id=1)
        self.assertEqual(group.name, "First Group")

class TestGroupMemeber(TestCase):
    def test_model(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        new_user2 = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn26@email.com", username="CDUB2", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        new_task = Task.objects.create_task(user.id,"task1", "description of task", start_date="2017-05-30", end_date="2017-05-30", points=15, task_type="medium", public="true")
        task = Task.objects.get(id=1)
        new_group = Group.objects.create_group("First Group", 300, task.id, "2017-04-28 16:48:00.000")
        group = Group.objects.get(id=1)
        new_group_member = GroupMember.objects.create_member(group.id, user.id)
        group_member = GroupMember.objects.get(id=1)
        self.assertEqual(group_member.user.id, user.id)

    def test_model_accepted(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        new_user2 = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn26@email.com", username="CDUB2", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        user2 = User.objects.get(id=2)
        new_task = Task.objects.create_task(user.id,"task1", "description of task", start_date="2017-05-30", end_date="2017-05-30", points=15, task_type="regular", public="true")
        task = Task.objects.get(id=1)
        new_group = Group.objects.create_group("First Group", 300, task.id, "2017-04-28 16:48:00.000")
        group = Group.objects.get(id=1)
        new_group_member = GroupMember.objects.create_member(group.id, user.id)
        new_group_member = GroupMember.objects.create_member(group.id, user2.id)
        GroupMember.objects.accepted(group.id, user.id)
        group_member = GroupMember.objects.get(id=1)
        group_member2 = GroupMember.objects.get(id=2)
        self.assertEqual(group_member.accepted, True)
        self.assertEqual(group_member.completed, False)
        self.assertEqual(group_member2.accepted, False)
        self.assertEqual(group_member2.completed, None)
