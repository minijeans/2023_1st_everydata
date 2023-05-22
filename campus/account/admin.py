from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# from .forms import UserChangeForm, UserCreationForm
from .models import User

class UserAdmin(BaseUserAdmin):
    # form = UserChangeForm
    # add_form = UserCreationForm
    readonly_fields = ('last_password_changed','created_at','updated_at','is_staff')

    list_display = ('email_id', 'full_name', 'student_id','login_fail_count','status','last_password_changed',)
    list_filter = ('email_id','full_name','student_id',)
    fieldsets = (
        (None, {'fields': ('email_id', 'full_name','student_id',)}),
        ('Personal info', {'fields': ('login_fail_count','status','last_password_changed','created_at','updated_at',)}),
        ('Permissions', {'fields': ('is_admin','is_active','is_staff',)}),
    )

    # add_fieldsets = (
    #     (None, {
    #         'classes': ('wide',),
    #         'fields': ('email', 'date_of_birth', 'password1', 'password2')}
    #      ),
    # )
    search_fields = ('email_id',)
    ordering = ('email_id',)
    filter_horizontal = ()


admin.site.register(User, UserAdmin)
admin.site.unregister(Group)