from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout


# Create your views here.

def login(request):
    return render(request, "index.html")

def signup(request):
    return render(request, "signup.html")


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('main')  # 로그인 후 리다이렉트할 URL
            else:
                error_message = '아이디 또는 비밀번호가 일치하지 않습니다.'
    else:
        form = AuthenticationForm()
        error_message = ''
    return render(request, 'login.html', {'form': form, 'error_message': error_message})

@login_required
def main(request):
    user = request.user
    return render(request, 'main.html', {'user': user})

def logout_view(request):
    logout(request)
    return redirect('login')