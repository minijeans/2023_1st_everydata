from django import from
from django.contrib.auth.forms import UseCreationForm
from django.contrib.auth.models importUser

class UseForm(UserCreationForm):
    email = forms.EmailField(label="이메일")
    
    class Meta:
        model = User
        fields = ("username","password1","password2","email","id","usernumber","department",)