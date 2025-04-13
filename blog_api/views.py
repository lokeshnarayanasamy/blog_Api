from rest_framework.views import APIView
from rest_framework.response import Response
#from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from .models import *
from .serializers import *


class BlogPostView(APIView):


    def get(self,request):

        blog = Post_1.objects.all()

        blog_serializer = BlogPost_serializer(blog,many=True).data

        return Response(blog_serializer)
    

    def post(self,request):

        print(request.data['title'],request.data['content'])

        data_1 =Post_1.objects.create(title= request.data['title'],content=request.data['content'])
        data_1.save()
        return Response("Data Was saved successfuly")


class BlogPostViewById(APIView):


    def get(self,request,id):

        post = Post_1.objects.get(id=id)

        blog_serializer = BlogPost_serializer(post,many=False).data

        return Response(blog_serializer)

    def patch(self,request,id):

        post = Post_1.objects.filter(id=id)

        print(post)

        post.update(title=request.data['title'],content=request.data['content'])       

        
        print(request.data['title'])
        return Response("Data Was saved successfuly")

class BlogCommentViewById(APIView):

    def get(self,request,id):

        post_id = Post_1.objects.get(id=id)

        comment = Comment_1.objects.filter(post_id=post_id)

        comment_serializer =BlogComment_serializer(comment,many=True).data

        return Response(comment_serializer)
    
    
    def post(self,request,id):
        
        post_id =Post_1.objects.get(id=id)
        print(request.data['content'])
        print()
        data_1 =Comment_1.objects.create(post=post_id,content=request.data['content'])
        data_1.save()
        return Response(f"Your Comment Was Add Successfuly")

        


    

@api_view(["GET"])
def health(request):
    context={"status":"ok"}
    print(context)
    return Response(context)

@api_view(["GET"])
def readiness(request):
    context={"status":"ready"}
    print(context)
    return Response(context)