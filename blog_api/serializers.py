from rest_framework import serializers

from .models import *


class BlogPost_serializer(serializers.ModelSerializer):

    class Meta:
        model = Post_1
        fields = '__all__'

class BlogComment_serializer(serializers.ModelSerializer):

    class Meta:
        model = Comment_1
        fields = '__all__'

