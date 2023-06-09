# Generated by Django 4.2.1 on 2023-05-18 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_todo_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='MyInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('email_id', models.EmailField(max_length=50, unique=True)),
                ('student_id', models.CharField(max_length=32)),
                ('academic_status', models.CharField(max_length=32)),
                ('curriculum_year', models.CharField(max_length=32)),
                ('grade', models.CharField(max_length=32)),
                ('semester', models.CharField(max_length=32)),
                ('major', models.CharField(max_length=50)),
                ('isdouble', models.BooleanField(default=False)),
                ('minor', models.CharField(max_length=50)),
                ('attached', models.FileField(blank=True, upload_to='uploads/', verbose_name='attached')),
            ],
            options={
                'verbose_name': '나의정보',
                'verbose_name_plural': '나의정보',
            },
        ),
    ]
