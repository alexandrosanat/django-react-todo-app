from rest_framework.routers import DefaultRouter

from .views import TodoView

router = DefaultRouter()

router.register(r"users", TodoView, basename="todo")

urlpatterns = router.urls
