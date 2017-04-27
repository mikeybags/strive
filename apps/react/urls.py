from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^home$', views.home),
    url(r'^task$', views.task),
    url(r'^group$', views.group),
    url(r'^add_member$', views.add_member),
    url(r'^points$', views.points),
    url(r'^request_friend$', views.request_friend),
    url(r'^activity_feed$', views.activity_feed),
    url(r'^friend_search$', views.friend_search),
    url(r'^store/new$', views.create_store_item),
    url(r'^store$', views.store),
    url(r'^purchases$', views.purchases),
    url(r'^friends$', views.friends),
    url(r'^friends/tasks/(?P<id>\d+)$', views.friend_tasks),
    url(r'^add_friend$', views.add_friend),
    url(r'^activity_feed$', views.activity_feed),
    url(r'^wagers$', views.wagers)
]
