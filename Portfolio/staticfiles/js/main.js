// Add any general JavaScript functionality here
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any general page functionality
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-fade-in').forEach((element) => {
        observer.observe(element);
    });

    // Form handling
    const form = document.getElementById('contactForm');
    
    if (form) {
        // Add loading state to button during submission
        form.addEventListener('submit', function(e) {
            const button = form.querySelector('button[type="submit"]');
            const submitText = button.querySelector('.submit-text');
            const submitArrow = button.querySelector('.submit-arrow');
            const submitLoading = button.querySelector('.submit-loading');

            // Show loading state
            button.disabled = true;
            submitText.textContent = 'Sending...';
            submitArrow.classList.add('hidden');
            submitLoading.classList.remove('hidden');
        });

        // Add animation to form fields
        const formControls = document.querySelectorAll('.form-control');
        formControls.forEach((control, index) => {
            control.style.opacity = '0';
            control.style.transform = 'translateY(20px)';
            setTimeout(() => {
                control.style.transition = 'all 0.5s ease-out';
                control.style.opacity = '1';
                control.style.transform = 'translateY(0)';
            }, 100 * index);
        });

        // Character count for message
        const messageField = document.getElementById('message');
        if (messageField) {
            const maxLength = 500;
            const countContainer = document.createElement('div');
            countContainer.className = 'text-sm text-gray-400 mt-1 text-right';
            messageField.parentNode.appendChild(countContainer);

            function updateCount() {
                const remaining = maxLength - messageField.value.length;
                countContainer.textContent = `${remaining} characters remaining`;
            }

            messageField.addEventListener('input', updateCount);
            updateCount(); // Initial count
        }
    }

    // Display messages
    const messages = document.querySelectorAll('.success-message, .error-message');
    messages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 500);
        }, 5000);
    });

    // Message auto-dismiss
    document.querySelectorAll('.messages .message').forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 500);
        }, 5000);
    });

    // Reading Progress
    function updateReadingProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.querySelector('.reading-progress-bar').style.width = scrolled + '%';
    }

    // Back to Top Button
    function toggleBackToTopButton() {
        const button = document.getElementById('back-to-top');
        if (window.scrollY > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    }

    // Event Listeners
    window.addEventListener('scroll', () => {
        updateReadingProgress();
        toggleBackToTopButton();
    });

    document.getElementById('back-to-top')?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Category Filter Animation
    function animateFilteredArticles() {
        const articles = document.querySelectorAll('.article-card');
        articles.forEach((article, index) => {
            article.style.animationDelay = `${index * 0.1}s`;
            article.classList.add('animate-fade-in');
        });
    }
}); 