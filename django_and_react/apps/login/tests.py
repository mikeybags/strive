from django.test import TestCase
from .models import User

class TestUser(TestCase):
    def test_model(self):
        user = User.objects.add_user(first_name="Curtis", last_name="Wulfsohn", email="cwulfsohn@email.com", username="CDUB", tag_line="Look who's laughin now", password="password", confirm_password="password")
        print user['newuser'].first_name
        self.assertEqual(user['newuser'].open_balance, 100)




# Create your tests here.
