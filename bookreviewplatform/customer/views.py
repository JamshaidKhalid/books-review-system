from rest_framework import generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Customer
from .serializers import CustomerSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class CustomerRegisterView(generics.CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    # permission_classes = [AllowAny]

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'])
    def follow(self, request):
        user_id = request.data.get('user_id')
        user_to_follow_id = request.data.get('user_to_follow_id')
        if not user_id or not user_to_follow_id:
            return Response({'error': 'Both user_id and user_to_follow_id are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = Customer.objects.get(id=user_id)
            user_to_follow = Customer.objects.get(id=user_to_follow_id)
            user.following.add(user_to_follow)
            return Response({'status': 'following'}, status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def unfollow(self, request):
        user_id = request.data.get('user_id')
        user_to_unfollow_id = request.data.get('user_to_unfollow_id')
        if not user_id or not user_to_unfollow_id:
            return Response({'error': 'Both user_id and user_to_unfollow_id are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = Customer.objects.get(id=user_id)
            user_to_unfollow = Customer.objects.get(id=user_to_unfollow_id)
            user.following.remove(user_to_unfollow)
            return Response({'status': 'unfollowed'}, status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def list_users(self, request):
        user_id = request.query_params.get('user_id')
        users = Customer.objects.exclude(id=user_id)
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def followers(self, request, pk=None):
        user = self.get_object()
        followers = user.followers.all()
        serializer = self.get_serializer(followers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def following(self, request, pk=None):
        user = self.get_object()
        following = user.following.all()
        serializer = self.get_serializer(following, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_queryset(self):
        return Customer.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
