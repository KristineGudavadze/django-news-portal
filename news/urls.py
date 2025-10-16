from django.urls import path
from .views import news_page, get_articles, generate_article

urlpatterns = [
    path('', news_page, name='news_page'),
    path('articles/', get_articles, name='get_articles'),
    path('generate-news/', generate_article, name='generate_article'),
]
