from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^create$', views.create),
    url(r'^login$', views.login),
    url(r'^logout$', views.logout),
    url(r'^session$', views.session),

]
