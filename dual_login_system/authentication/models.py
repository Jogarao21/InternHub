from django.db import models
from django.utils import timezone

class User(models.Model):
    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=20, choices=[('student', 'Student'), ('employer', 'Employer')])
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.email


class OTP(models.Model):
    email = models.EmailField()
    otp = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)
