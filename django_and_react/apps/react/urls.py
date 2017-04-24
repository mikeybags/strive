from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^home$', views.home),
    url(r'^task$', views.task),
    url(r'^group$', views.group),
    url(r'^add_member$', views.add_member)

]
