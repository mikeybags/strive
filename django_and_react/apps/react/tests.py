from django.test import TestCase
from ..login.models import User
from .models import *
# Create your tests here.

class TestTask(TestCase):
    def test_model(self):
        new_user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        user = User.objects.get(id=1)
        print user
        task = Task.objects.create_task(user.id,"task1", "description of task", start_date="5/30/2017", end_date="5/30/2017", points=15, task_type="medium")
        self.assertEqual(task['task'].name, "task1")
