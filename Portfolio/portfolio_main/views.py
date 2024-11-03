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
                
        else:
            messages.error(request, 'Please fill in all fields.')
            logger.warning("Incomplete form submission")
            
    return redirect('home')

def blog_list(request):
    # Your actual LinkedIn newsletter posts
    newsletter_posts = [
        {
            'title': 'The Coming Quantum Revolution - Why Quantum Computers Will Change Everything',
            'preview_content': 'Quantum computing represents a fundamentally different approach to computing compared to classical computing. While classical computers encode information in bits with binary values of 0 or 1, quantum computers utilize quantum bits or qubits, which can exist in a superposition of 0 and 1.',
            'linkedin_url': 'https://www.linkedin.com/pulse/coming-quantum-revolution-why-computers-change-saqlain-yousuf-kyc2c',
            'reading_time': 8,
            'created_at': '2024-03-26',
            'is_featured': True
        },
        {
            'title': 'Why Should You Learn Python in 2024',
            'preview_content': 'Python remains the dominant AI language despite growing competition. Python\'s popularity for AI/ML development continues rising due to its flexibility, vast ecosystem of libraries, and ease of use.',
            'linkedin_url': 'https://www.linkedin.com/pulse/why-should-you-learn-python-2024-saqlain-yousuf-asesc',
            'reading_time': 6,
            'created_at': '2024-03-27',
            'is_featured': True
        }
        # Add more newsletter posts as you publish them
    ]
    
    featured_posts = [post for post in newsletter_posts if post.get('is_featured', False)]
    
    context = {
        'posts': newsletter_posts,
        'featured_posts': featured_posts[:3],  # Show top 3 featured posts
        'newsletter_url': 'https://www.linkedin.com/newsletters/digu-trends-tech-7177762093369106432/'  # URL for "View All" button
    }
    return render(request, 'portfolio_main/blog_list.html', context)