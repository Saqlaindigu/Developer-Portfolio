from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail, BadHeaderError
from django.conf import settings
from django.http import HttpResponse
import logging

logger = logging.getLogger(__name__)

def home(request):
    return render(request, 'portfolio_main/home.html')

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        subject = request.POST.get('subject', '')
        message = request.POST.get('message', '')
        
        if name and email and subject and message:
            email_body = f"""
            Name: {name}
            Email: {email}
            Subject: {subject}
            
            Message:
            {message}
            """
            
            try:
                # Print debug information
                print(f"Attempting to send email with settings:")
                print(f"EMAIL_HOST: {settings.EMAIL_HOST}")
                print(f"EMAIL_PORT: {settings.EMAIL_PORT}")
                print(f"EMAIL_USE_TLS: {settings.EMAIL_USE_TLS}")
                print(f"EMAIL_HOST_USER: {settings.EMAIL_HOST_USER}")
                
                send_mail(
                    subject=f"Portfolio Contact: {subject}",
                    message=email_body,
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[settings.EMAIL_HOST_USER],
                    fail_silently=False,
                )
                messages.success(request, 'Your message has been sent successfully!')
                logger.info(f"Email sent successfully from {email}")
                
            except BadHeaderError:
                messages.error(request, 'Invalid header found.')
                logger.error("BadHeaderError in email sending")
                
            except Exception as e:
                messages.error(request, f'There was an error sending your message: {str(e)}')
                logger.error(f"Failed to send email: {str(e)}")
                print(f"Email error: {str(e)}")  # Debug print
                
        else:
            messages.error(request, 'Please fill in all fields.')
            logger.warning("Incomplete form submission")
            
    return redirect('home')