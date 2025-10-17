import os
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
import news.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'news_portal.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            news.routing.websocket_urlpatterns
        )
    ),
})
