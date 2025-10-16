from rest_framework import serializers
from .models import NewsArticle


class NewsArticleSerializers(serializers.ModelSerializer):
    class Meta:
        model = NewsArticle
        fields = ['id', 'title', 'content', 'created_at']
