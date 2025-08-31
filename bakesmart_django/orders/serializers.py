from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta :
        model=OrderItem
        fields=("id","product_id","name","price","quantity")

class OrderSerializer(serializers.ModelSerializer) :
    items=OrderItemSerializer(many=True)
    class Meta :
        model=Order
        fields=['id','user','items','total_price','created_at','name','address','phone','items']
        read_only_fields = ['id','user','created_at']

    def create(self,validated_data):
        items_data = validated_data.pop("items",[])
        order = Order.objects.create(**validated_data)
        OrderItem.objects.bulk_create([OrderItem(order=order,**item) for item in items_data])
        return order