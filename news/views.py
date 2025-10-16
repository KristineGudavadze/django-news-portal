from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from .models import NewsArticle
from .serializers import NewsArticleSerializers
from django.views.decorators.csrf import csrf_exempt


def news_page(request):
    return render(request, 'news/news.html')


@api_view(['GET'])
def get_articles(request):
    articles = NewsArticle.objects.all().order_by('-created_at')
    serializer = NewsArticleSerializers(articles, many=True)
    return Response(serializer.data)


@csrf_exempt
@api_view(['POST'])
def generate_article(request):
    title = request.data.get("title", "Breaking News")
    content = request.data.get("content", "This is automatically generated.")
    article = NewsArticle.objects.create(title=title, content=content)
    serializer = NewsArticleSerializers(article)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
