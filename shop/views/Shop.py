from shop.ShopSerializers import ShopSerializer
from shop.models import Shop
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

class ShopList(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    """
    List all shop, or create a new shop.
    """
    def get(self, request):
        shop_return = {'success': False, 'result': []}
        user = request.user.id
        shop = Shop.objects.filter(user_id=user).order_by('-id')
        serializer = ShopSerializer(shop, many=True)
        shop_return['success'] = True
        shop_return['result'] = serializer.data
        #return Response(shop_return['result'],)
        return Response(shop_return, content_type='application/json')

    def post(self, request):
        api_response = {'success': False, 'msg': '', 'status':status.HTTP_400_BAD_REQUEST}
        shop = {'user': request.user.id}
        for key, v in request.data.items():
            shop.update({key: v})
        serializer = ShopSerializer(data=shop )
        if serializer.is_valid():
            serializer.save()
            api_response['status'] = status.HTTP_201_CREATED
            api_response['success'] = True
        return Response(api_response, content_type='application/json')



class ShopDetail(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    """
    Retrieve, update or delete a Shop instance.
    """

    def get_object(self, pk):
        try:
            return Shop.objects.get(pk=pk)
        except Shop.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        meeting_return = {'success': False, 'result': {}}
        shop = self.get_object(pk)
        serializer = ShopSerializer(shop)
        meeting_return['result'] = serializer.data
        meeting_return['success'] = True
        return Response(meeting_return, content_type='application/json')

    def put(self, request, pk, format=None):
        api_response = {'success': False, 'msg': '', 'status':None}
        shop = {'user_id': request.user.id}
        for key, v in request.data.items():
            shop.update({key: v})
        snippet = self.get_object(pk)
        serializer = ShopSerializer(snippet, data=shop)
        if serializer.is_valid():
            serializer.save()
            api_response['status'] = status.HTTP_202_ACCEPTED
            api_response['success'] = True
        else:
            api_response['status'] = status.HTTP_400_BAD_REQUEST
        return Response(api_response, content_type='application/json')

    def delete(self, request, pk, format=None):
        shop_return = {'success': False, 'msg': '', 'status':''}
        shop = self.get_object(pk)
        shop.delete()
        shop_return['success'] = True
        shop_return['status'] = status.HTTP_204_NO_CONTENT
        return Response(shop_return, content_type='application/json')
