import random
from django.core.mail import send_mail
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, OTP

class SendOTPView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user_type = request.data.get('user_type')

        # Email validation
        if user_type == 'employer' and not email.endswith('@company.com'):
            return Response({'error': 'Use company email only!'}, status=status.HTTP_400_BAD_REQUEST)

        otp = random.randint(100000, 999999)
        OTP.objects.create(email=email, otp=otp)

        send_mail(
            subject='Your OTP Code',
            message=f'Your OTP is {otp}',
            from_email='mjogarao21@gmail.com',
            recipient_list=[email],
        )

        # Create or update user
        User.objects.update_or_create(email=email, defaults={'user_type': user_type})

        return Response({'message': 'OTP sent successfully!'}, status=status.HTTP_200_OK)


class VerifyOTPView(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = int(request.data.get('otp'))

        try:
            otp_record = OTP.objects.filter(email=email).last()
            if otp_record.otp == otp:
                user = User.objects.get(email=email)
                user.is_verified = True
                user.save()
                return Response({'message': 'OTP verified successfully!'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'error': 'OTP not found'}, status=status.HTTP_400_BAD_REQUEST)
