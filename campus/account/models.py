from django.contrib.auth.models import BaseUserManager , AbstractBaseUser
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
# import hashlib


class MyUserManager(BaseUserManager):
    def create_user(self, email_id, password, **kwargs):
        # 유저를 생성하는 함수
        if not email_id:
            raise ValueError('email_id is required.')
        if not password:
            raise ValueError('password is required.')
        user = self.model(
            email_id=self.normalize_email(email_id),
            **kwargs,
        )
        user.set_password(password)
        user.save()
    
    def create_superuser(self, email_id, password, **kwargs):
        user = self.create_user(
            email_id,
            password=password,
            **kwargs,
        )

        user.is_admin = True
        user.is_active = True
        # # user.is_staff = True

        # user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    # idx = models.AutoField(primary_key=True) # user idx, PK
    email_id = models.EmailField(unique=True, max_length=50) # 로그인할 때 사용하는 이메일 id
    # password = models.BinaryField(blank=True, null=True) # 비밀번호(SHA256 등으로 해쉬하여 암호화)
    full_name = models.CharField(max_length=50, blank=True)
    student_id = models.CharField(max_length=32)
    login_fail_count = models.IntegerField(default=0) # 로그인 실패 횟수 카운팅
    # status = models.CharField(max_length=32, default='NORMAL') # 유저 상태 (NORMAL: 정상, LOCKED: 잠금)
    HOWTO_STATUS_CHOICES = [
        ('normal', '재학중'),
        ('absence', '휴학중'),
        ('exit', '졸업'),
    ]

    status = models.CharField(verbose_name='상태(status)', choices=HOWTO_STATUS_CHOICES, max_length=8, default='normal')
    last_password_changed = models.DateTimeField(auto_now_add=True) # 마지막 비밀번호 수정일시    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='등록시간')
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email_id" # authenticate 함수에서 username으로 활용할 컬럼 정의
    REQUIRED_FIELDS = []
    objects = MyUserManager() # MyUser.objects.* 를 부를 때의 그 objects로, 따로 정의할 예정
    
    # def set_password(self, password):
    #     self.password = hashlib.sha256(password).hexdigest()
    
    def __str__(self):
        return self.email_id

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
    
    @property
    def is_authenticated(self):
        # 이 함수는 기본 User model에서 사용하는 것으로, Anonymous가 아니면 로그인 된 것이므로 항상 True를 리턴
        return True
    
    @property
    def is_anonymous(self):
        # 위와 같은 이유로 False 리턴
        return False
    
    @property
    def is_password_change_needed(self):
        # 패스워드 변경일시를 초과하여 패스워드 재설정이 필요한지 확인
        
        now = timezone.now()
        if (now - self.last_password_changed).days > 180:
            # 180일 동안 비밀번호를 수정하지 않았으면 변경이 필요함
            True
        return False
        
        
# class MyUserAuth(object):
#     # 이 클래스를 정의하여 settings 에 auth backend로 등록하면 authenticate함수를 아래 처럼 커스터마이징 하여 사용할 수 있다.
#     def authenticate(self, **kwargs):
        
#         email_id = kwargs.get('email')
#         password = kwargs.get('password')
#         try:
#             user = get_user_model().objects.get(email_id=email_id)
        
#         except Exception as Err:
#             # 유저가 존재하지 않음
#             return None
#         if user.status == 'LOCKED':
#             # 유저 상태가 잠금인 경우
#             raise Exception('USER IS LOCKED')
            
#         if user.login_fail_count >= 5:
#             # 로그인 실패 횟수가 5회 이상이면 로그인 불가
#             raise Exception('PASSWORD FAILED BY 5 TIMES')
          
#         if str(user.password) == hashlib.sha256(password).hexdigest():
#             # 패스워드 일치 => 로그인 성공
#             user.login_fail_count = 0 # 패스워드 실패 횟수를 0으로 초기화
#             user.save(update_fields=['login_fail_count'])
#             return user
#         else:
#             # 패스워드 불일치 => 로그인 실패
#             user.login_fail_count += 1
#             user.save(update_fields=['login_fail_count'])
#             return None
