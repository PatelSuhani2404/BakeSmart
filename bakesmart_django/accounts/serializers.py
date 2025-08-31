from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User=get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta :
        model=User
        fields=['id','username','email','password','role']
        extra_kwargs = {'password':{'write_only':True}}

    def create(self,validated_data):
        role = validated_data.get('role','user')
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            role=role
        )
        if role == 'admin':
            user.is_staff = True
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer) :
    @classmethod
    def get_token(cls,user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['role'] = user.role
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({
            'id' : self.user.id,
            'username' : self.user.username,
            'email' : self.user.email,
            'role' : self.user.role
        })
        return data