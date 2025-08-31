from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self,username,email,password=None,role='user'):
        if not email :
            raise ValueError("Users must have an email address")
        
        email=self.normalize_email(email)
        user = self.model(email=email,username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,username,email,password):
        user=self.create_user(
            username=username,
            email=email,
            password=password,
        )
        user.is_staff=True
        user.is_superuser=True
        user.save(using=self._db)
        return user
    
class User(AbstractBaseUser,PermissionsMixin):
    ROLE_CHOICES=(
        ("user",'User'),
        ('admin','Admin'),
    )
    username=models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    role=models.CharField(max_length=10,choices=ROLE_CHOICES,default='user')
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email