from rest_framework import serializers
from shop.models import Shop

class ShopSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    username = serializers.SerializerMethodField("get_username")
    class Meta:
        model = Shop
        fields = ['id', 'status', 'name', 'user','username', 'created_at']

    def get_username(self, obj):
        return obj.user.username

    def create(self, validated_data):
        """
        Create and return a new `Shop` instance, given the validated data.
        """
        meetings = Shop.objects.create(**validated_data)
        return meetings

    def update(self, instance, validated_data):
        """
        Update and return an existing `Shop` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance