from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from .models import NewsArticle
from .serializers import NewsArticleSerializers
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


def news_page(request):
    return render(request, 'news/news.html')


class GetArticlesView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        articles = NewsArticle.objects.all().order_by('-created_at')
        serializer = NewsArticleSerializers(articles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GenerateArticleView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        title = request.data.get('title')
        content = request.data.get('content')

        if not title or not content:
            return Response({'error': 'Title and content required'}, status=status.HTTP_400_BAD_REQUEST)

        article = NewsArticle.objects.create(title=title, content=content)
        serializer = NewsArticleSerializers(article)

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "news_group",
            {"type": "send_news", "data": serializer.data}
        )

        return Response(serializer.data, status=status.HTTP_201_CREATED)
