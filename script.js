document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const header = document.querySelector('.site-header');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  const form = document.getElementById('waitlistForm');
  const emailInput = document.getElementById('email');
  const formMessage = document.getElementById('formMessage');
  const yearElement = document.getElementById('year');
  const backToTopBtn = document.querySelector('.back-to-top');
  
  // Set current year in footer
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Mobile menu toggle
  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Close mobile menu when clicking on a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        mobileMenuToggle.click();
      }
    });
  });
  
  // Header scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class to header
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (backToTopBtn) {
      if (currentScroll > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
      }
    }
    
    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  }, { passive: true });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form submission
  if (form && emailInput && formMessage) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = emailInput.value.trim();
      
      // Simple email validation
      if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        emailInput.focus();
        return;
      }
      
      // Show loading state
      showFormMessage('Subscribing...', 'info');
      
      // In a real app, you would send this to your server
      // For demo purposes, we'll simulate a successful submission
      setTimeout(() => {
        showFormMessage('Thank you for subscribing! We\'ll be in touch soon.', 'success');
        form.reset();
        
        // If you're using FormSubmit or another service, you can uncomment this:
        // form.submit();
      }, 1500);
    });
    
    // Check for success message in URL (for form submission redirects)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('subscribed') === '1') {
      showFormMessage('Thank you for subscribing! We\'ll be in touch soon.', 'success');
    }
  }
  
  // Helper function to validate email
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Helper function to show form messages
  function showFormMessage(message, type = 'info') {
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = 'form-message';
    formMessage.classList.add(`form-message--${type}`);
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
      }, 5000);
    }
  }
  
  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.step, .benefit-card, .testimonial');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animate-fade-in');
      }
    });
  };
  
  // Run once on page load
  animateOnScroll();
  
  // Then run on scroll
  window.addEventListener('scroll', animateOnScroll, { passive: true });
  
  // Back to top button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Add animation delay classes to steps for staggered animation
  document.querySelectorAll('.step').forEach((step, index) => {
    step.classList.add(`delay-${(index + 1) * 100}`);
  });
  
  // Add animation delay classes to benefit cards
  document.querySelectorAll('.benefit-card').forEach((card, index) => {
    card.classList.add(`delay-${(index % 3 + 1) * 100}`);
  });
});
