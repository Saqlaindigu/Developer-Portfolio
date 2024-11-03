document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navLinks = document.getElementById('nav-links');

    mobileMenuButton.addEventListener('click', function() {
        navLinks.classList.toggle('hidden');
    });

    // Close menu when clicking a link
    const links = navLinks.getElementsByTagName('a');
    Array.from(links).forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) { // md breakpoint
                navLinks.classList.add('hidden');
            }
        });
    });

    // Handle resize events
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) { // md breakpoint
            navLinks.classList.remove('hidden');
        } else {
            navLinks.classList.add('hidden');
        }
    });
}); 