from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^home$', views.home),
    url(r'^task$', views.task),
    url(r'^group$', views.group),
    url(r'^add_member$', views.add_member),
    url(r'^points$', views.points),
    url(r'^store/new$', views.create_store_item),
    url(r'^store$', views.store),
    url(r'^purchases$', views.purchases),
    url(r'^friends$', views.friends),
    url(r'^friends/tasks/(?P<id>\d+)$', views.friend_tasks)
]
