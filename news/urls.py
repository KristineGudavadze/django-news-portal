from django.urls import path
from .views import news_page, GetArticlesView, GenerateArticleView

urlpatterns = [
    path('', news_page, name='news_page'),
    path('api/articles/', GetArticlesView.as_view(), name='get_articles'),
    path('api/generate-news/', GenerateArticleView.as_view(), name='generate_article'),
]
