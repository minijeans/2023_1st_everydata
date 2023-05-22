from django.contrib import admin
from .models import Todo
from .models import MyInfo
from .models import LectureInfo


# Register your models here.

class TodoAdmin(admin.ModelAdmin):
    readonly_fields=('createdAt','updatedAt',)
    fieldsets = (
        ("할일정보", {
        'fields': ('title','description','complete','important','createdAt','updatedAt',)
        }),
    )
    search_fields = ("title",)
    list_display = ('id','title','description','complete', 'important','createdAt',)
    list_per_page = 100
    list_filter = ('createdAt', 'complete','important',)


admin.site.register(Todo, TodoAdmin)


class MyInfoAdmin(admin.ModelAdmin):
    readonly_fields=('createdAt','updatedAt',)
    fieldsets = (
        ("정보", {
        'fields': ('email_id','full_name','student_id','academic_status','curriculum_year',)
        }),
        ("정보", {
        'fields': ('grade','semester','major','isdouble','minor','attached','createdAt','updatedAt',)
        }),
    )
    search_fields = ('email_id','student_id',)
    list_display = ('email_id','student_id','academic_status','isdouble', 'grade','createdAt',)
    list_per_page = 100
    list_filter = ('createdAt', 'email_id','student_id',)

admin.site.register(MyInfo, MyInfoAdmin)

class LectureInfoAdmin(admin.ModelAdmin):
    readonly_fields=('createdAt','updatedAt',)
    fieldsets = (
        ("정보", {
        'fields': ('lecture_code','lecture_name','semester','grade','category','type','status','lecture_room','department',)
        }),
        ("정보", {
        'fields': ('campus','e_learning','credit','professor','week','lecture_time','desciption','createdAt','updatedAt',)
        }),
    )
    search_fields = ('lecture_code','lecture_name',)
    list_display = ('lecture_code','lecture_name','semester','professor','credit','category', 'status','lecture_room','week','lecture_time','createdAt',)
    list_per_page = 100
    list_filter = ('createdAt', 'lecture_code','lecture_name',)

admin.site.register(LectureInfo, LectureInfoAdmin)

