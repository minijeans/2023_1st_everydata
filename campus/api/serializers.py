from rest_framework import serializers
from .models import Todo
from .models import MyInfo
from .models import LectureInfo

class TodosimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id','title','complete','important' , 'createdAt', 'updatedAt',)

class MyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyInfo
        fields = '__all__'

class LectureInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LectureInfo
        fields = '__all__'
