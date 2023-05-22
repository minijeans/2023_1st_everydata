from django.db import models
from api.models import MyInfo
from rest_framework import serializers
import os

class TimeStampModel(models.Model):
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

# Create your models here.
class Todo(TimeStampModel):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    complete = models.BooleanField(default=False)
    important = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "할일등록"  #내부 리스트에서
        verbose_name_plural = "할일등록" #메뉴에서 이름

class MyInfo(TimeStampModel):
    email_id = models.EmailField( 
        max_length=50
    ) 
    full_name = models.CharField(max_length=50, blank=True)
    student_id = models.CharField(max_length=32)
    academic_status = models.CharField(max_length=32)
    curriculum_year = models.CharField(max_length=32)
    grade = models.CharField(max_length=32)
    semester = models.CharField(max_length=32)    
    major = models.CharField(max_length=50)
    isdouble = models.BooleanField(default=False)
    double_major = models.CharField(max_length=50,default='')
    minor = models.CharField(max_length=50)
    attached = models.FileField('attached', upload_to='uploads/%Y/%m/%d' , blank=True )
    total_get_credit = models.CharField(max_length=32)
    subjects_completed = models.CharField(max_length=100)

    def get_filename(self):
        return os.path.basename(self.attached.name)

    def __str__(self):
        return self.email_id

    class Meta:
        verbose_name = "나의정보"  #내부 리스트에서
        verbose_name_plural = "나의정보" #메뉴에서 이름

class LectureInfo(TimeStampModel):
    lecture_code = models.CharField(verbose_name='강의코드',max_length=30) 
    lecture_name = models.CharField(verbose_name='강의명',max_length=50) 
    semester = models.CharField(verbose_name='학기',max_length=32, blank=True)
    category = models.CharField(verbose_name='강의구분',max_length=50)
    type = models.CharField(verbose_name='상세구분',max_length=50, default='')
    
    HOWTO_STATUS_CHOICES = [
        ('normal', '강의개설중'),
        ('over', '강의만석'),
        ('exit', '강의폐강'),
    ]

    status = models.CharField(verbose_name='상태(status)', choices=HOWTO_STATUS_CHOICES, max_length=15, default='normal')
    
    CAMPUS_CHOICES = [
        ('gajwa', '가좌캠퍼스'),
        ('tongyeong', '통영캠퍼스'),
    ]

    campus = models.CharField(verbose_name='캠퍼스', choices=CAMPUS_CHOICES, max_length=20, default='gajwa')
    e_learning = models.CharField(verbose_name='원격수업',max_length=32, blank=True)    
    credit = models.CharField(verbose_name='강의학점',max_length=32)    
    professor = models.CharField(verbose_name='교수명',max_length=32)
    week = models.CharField(verbose_name='요일',max_length=32)    
    grade = models.CharField(verbose_name='학년',max_length=32, default='')    
    lecture_time = models.CharField(verbose_name='강의시간',max_length=50)
    lecture_room = models.CharField(verbose_name='강의실',max_length=50,default='')
    department = models.CharField(verbose_name='건물명',max_length=50,default='')
    desciption = models.CharField(verbose_name='설명',max_length=50,blank=True, default='')
    
    def __str__(self):
        return self.lecture_code
    
    class Meta:
        verbose_name = "강의실정보"  #내부 리스트에서
        verbose_name_plural = "강의실정보" #메뉴에서 이름
