# Generated by Django 4.2.1 on 2023-05-17 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email_id', models.EmailField(max_length=50, unique=True)),
                ('full_name', models.CharField(blank=True, max_length=50)),
                ('student_id', models.CharField(max_length=32)),
                ('login_fail_count', models.IntegerField(default=0)),
                ('status', models.CharField(default='NORMAL', max_length=32)),
                ('last_password_changed', models.DateTimeField(auto_now_add=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='등록시간')),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]