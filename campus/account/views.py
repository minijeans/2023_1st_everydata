# account.views
from django.contrib.auth import get_user_model, authenticate, login
from django.views.generic import View
from django.http import JsonResponse 
from django.shortcuts import render, redirect
from django.urls import reverse
from django.template.response import TemplateResponse
import traceback
from api.serializers import MyInfoSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from api.models import MyInfo
import json

@method_decorator(csrf_exempt,name='dispatch')
class UserSignupView(View):
    template_name = 'signup.html'
    
    def get(self, request):
        # GET 요청은 회원가입 페이지 로드
        return TemplateResponse(request, self.template_name, {})
    
    def post(self, request):
        # POST 요청은 회원가입 페이지 내의 API
        # data = json.loads(request.body)

        # print('data : ', data)

        

        # email_id = data['email']
        # password = data['password']
        # attached = data.FILES['attached']


        email_id = request.POST.get('email')
        password = request.POST.get('password')
        rePassword = request.POST.get('rePassword')
        yourname = request.POST.get('yourname')
        student_id = request.POST.get('studentId')
        academic_status = request.POST.get('academic_status')
        curriculum_year = request.POST.get('curriculum_year')
        grade = request.POST.get('grade')
        semester = request.POST.get('semester')
        major = request.POST.get('major')
        isdouble = request.POST.get('isdouble')
        double_major = request.POST.get('double_major')
        minor = request.POST.get('minor')        
        attached = request.FILES['docfile']

        if isdouble == 'on' :
            isdouble = True
        else :
            isdouble = False

        print('email_id : ', email_id)
        print('password : ', password)
        print('rePassword : ', rePassword)
        print('yourname : ', yourname)
        print('student_id : ', student_id)
        print('academic_status : ', academic_status)
        print('curriculum_year : ', curriculum_year)
        print('grade : ', grade)
        print('semester : ', semester)
        print('major : ', major)
        print('isdouble : ', isdouble)
        print('double_major : ', double_major)
        print('minor : ', minor)
        print('attached : ', attached)
        
        try:
            if password == rePassword:
                user = get_user_model().objects.create_user(
                    email_id=email_id, 
                    password=password,
                    full_name=yourname,
                    student_id=student_id,
                    ) # account.models.MyUserManager.create_user가 호출된다.
                
                myinfo = MyInfo(
                    email_id=email_id,
                    student_id=student_id,
                    full_name=yourname,
                    academic_status=academic_status,
                    curriculum_year=curriculum_year,
                    grade = grade,
                    semester = semester,
                    major = major ,
                    isdouble = isdouble,
                    double_major=double_major,
                    minor=minor,
                    attached=attached,
                )
                myinfo.save()
            
                auth_user = authenticate(request, username = email_id, password = password) # 가입한 유저로 auth 테스트를 해본다.
                login(request, auth_user) # 로그인 세션을 만들어 준다. (가입 후 자동 로그인 안할 거면 삭제)
                # return redirect(reverse('account:register') )

                request.session['user'] = email_id
                
                result = {
                    'result': 'success', 
                    'error_msg': '', 
                    'next_url': 'register'
                }
                print('result : ', result)
                return JsonResponse(result)
                # return render(request, "main.html", result )
        except:
            return JsonResponse({'result': 'error', 'error_msg': traceback.format_exc()})
    
@method_decorator(csrf_exempt,name='dispatch')
class UserRegisterView(View):
    template_name = 'register.html'
    
    def get(self, request):
        # GET 요청은 회원가입 페이지 로드
        return TemplateResponse(request, self.template_name, {})
    
    def post(self, request):
        # POST 요청은 회원가입 페이지 내의 API
        email_id = request.POST.get('email')
        student_id = request.POST.get('studentId')
        academic_status = request.POST.get('academic_status')
        curriculum_year = request.POST.get('curriculum_year')
        grade = request.POST.get('grade')
        semester = request.POST.get('semester')
        major = request.POST.get('major')
        isdouble = request.POST.get('isdouble')
        double_major = request.POST.get('double_major')
        minor = request.POST.get('minor')

        attached = request.FILES['docfile']

        if isdouble == 'on' :
            isdouble = True
        else :
            isdouble = False

        print('email_id : ', email_id)
        print('studentId : ', student_id)
        print('academic_status : ', academic_status)
        print('curriculum_year : ', curriculum_year)
        print('grade : ', grade)
        print('semester : ', semester)
        print('major : ', major)
        print('isdouble : ', isdouble)
        print('double_major : ', double_major)
        print('attached : ', attached)
        
        try:
            myinfo = MyInfo(
                email_id=email_id,
                student_id=student_id,
                academic_status=academic_status,
                curriculum_year=curriculum_year,
                grade = grade,
                semester = semester,
                major = major ,
                isdouble = isdouble,
                double_major=double_major,
                minor=minor,
                attached=attached,
            )
            myinfo.save()
            
            # return JsonResponse({'result': 'success', 'error_msg': '', 'next_url': 'register/'})
            return render(request, 'main.html' , { 'title_sub' : 'EVERYDATA'})
        except:
            return JsonResponse({'result': 'error', 'error_msg': traceback.format_exc()})
    	

@method_decorator(csrf_exempt,name='dispatch')
class UserLoginView(View):
    template_name = 'index.html'
    
    def get(self, request):
        # GET 요청은 로그인 페이지 로드
        return TemplateResponse(request, self.template_name, {})
 
    def post(self, request):
        # POST 요청은 로그인 페이지 내의 API
        # email_id = request.POST
        email_id = request.POST.get('email')
        password = request.POST.get('password')

        print('email_id : ', email_id)
        print('password : ', password)
        try:
            auth_user = authenticate(request, username = email_id, password = password) # 가입한 유저로 auth 테스트를 해본다.
            login(request, auth_user) # 로그인 세션을 만들어 준다. (가입 후 자동 로그인 안할 거면 삭제)
            
            request.session['user'] = email_id

            print('request.session : ', email_id)

            return JsonResponse({'result': 'success', 'error_msg': '', 'next_url': 'register/'})

            # todos = MyInfo.objects.filter(email_id=email_id)[:1]
            # serializer = MyInfoSerializer(todos, many=True)

            # print('UserLoginView.serializer : ', serializer.data)

            # return render(request, 'main.html' , { 'result': 'success'  })

        except Exception as e:
            # authenticate 함수 내에서 예외가 발생하는 경우 분기
            if e.args[0] == 'USER IS LOCKED':
                return JsonResponse({'result': 'error', 'error_msg': 'User is locked'})
            elif e.args[0] == 'PASSWORD FAILED BY 5 TIMES':
                return JsonResponse({'result': 'error', 'error_msg': 'Password failure count is over the limit.'})
            return JsonResponse({'result': 'error', 'error_msg': traceback.format_exc()})
        
        # 유저의 패스워드 변경 기한 확인하여 로그인 후 NEXT URL 리턴 값 변경
        # next_url = '/'
        # if user.is_password_change_needed:
        #     next_url = '/account/password_change/'
        return JsonResponse({'result': 'success', 'error_msg': '', 'next_url': 'register/'})
        # return JsonResponse({'result': 'success', 'error_msg': ''})
        # return self.response({'result': 'success', 'error_msg': ''})
    

@method_decorator(csrf_exempt,name='dispatch')
class UserLogoutView(View):

    def get(self, request):
        if request.session.get('user'):
            del(request.session.get['user'])
            return redirect('/')