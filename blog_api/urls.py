from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)

from .views import BlogPostView,health,readiness,BlogPostViewById,BlogCommentViewById

urlpatterns = [
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('posts/', BlogPostView.as_view(), name='blog_post'),
    path('posts/<int:id>/', BlogPostViewById.as_view(), name='blog_post_id'),
    path('posts/<int:id>/comments/', BlogCommentViewById.as_view(), name='blog_comment_id'),
    path('health/',health,name='health'),
    path('readiness/',readiness,name='readiness')
    
]


#python -m http.server 5500   // it's use for normal html runsever