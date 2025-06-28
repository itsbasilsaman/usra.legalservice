document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.menu-button-two');
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.menu-close-icon');
  const navMenu = document.querySelector('.nav-menu-wrapper-two');
  
  if (menuButton && menuIcon && closeIcon) {
    menuButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle menu visibility
      const isMenuOpen = navMenu.classList.contains('w--open');
      
      if (isMenuOpen) {
        // Close menu
        navMenu.classList.remove('w--open');
        menuIcon.classList.remove('active');
        closeIcon.classList.remove('active');
        closeIcon.style.display = 'none';
      } else {
        // Open menu
        navMenu.classList.add('w--open');
        menuIcon.classList.add('active');
        closeIcon.classList.add('active');
        closeIcon.style.display = 'block';
      }
    });
    
    // Close menu when clicking on menu items
    const menuLinks = document.querySelectorAll('.nav-link-block');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('w--open');
        menuIcon.classList.remove('active');
        closeIcon.classList.remove('active');
        closeIcon.style.display = 'none';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!menuButton.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('w--open');
        menuIcon.classList.remove('active');
        closeIcon.classList.remove('active');
        closeIcon.style.display = 'none';
      }
    });
    
    // Listen for Webflow's own menu state changes
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isOpen = navMenu.classList.contains('w--open');
          if (isOpen) {
            menuIcon.classList.add('active');
            closeIcon.classList.add('active');
            closeIcon.style.display = 'block';
          } else {
            menuIcon.classList.remove('active');
            closeIcon.classList.remove('active');
            closeIcon.style.display = 'none';
          }
        }
      });
    });
    
    observer.observe(navMenu, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
});

// ...existing scripts...
document.addEventListener('DOMContentLoaded', function() {
  // Language Toggle Functionality
  const langToggle = document.getElementById('lang-toggle');
  const arBtn = langToggle.querySelector('.lang-ar');
  const enBtn = langToggle.querySelector('.lang-en');
  const slider = langToggle.querySelector('.lang-toggle-slider');
  // Helper: show/hide language
  function setLanguage(lang) {
    document.documentElement.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
    // Show/hide all data-ar/data-en
    document.querySelectorAll('[data-ar], [data-en]').forEach(el => {
      if (lang === 'ar') {
        if (el.hasAttribute('data-ar')) {
          el.style.display = '';
        }
        if (el.hasAttribute('data-en')) {
          el.style.display = 'none';
        }
      } else {
        if (el.hasAttribute('data-ar')) {
          el.style.display = 'none';
        }
        if (el.hasAttribute('data-en')) {
          el.style.display = '';
        }
      }
    });
    
    // Handle form placeholders
    document.querySelectorAll('[data-ar-placeholder], [data-en-placeholder]').forEach(el => {
      if (lang === 'ar' && el.hasAttribute('data-ar-placeholder')) {
        el.setAttribute('placeholder', el.getAttribute('data-ar-placeholder'));
      } else if (lang === 'en' && el.hasAttribute('data-en-placeholder')) {
        el.setAttribute('placeholder', el.getAttribute('data-en-placeholder'));
      }
    });
    
    // Handle button values
    document.querySelectorAll('[data-ar-value], [data-en-value]').forEach(el => {
      if (lang === 'ar' && el.hasAttribute('data-ar-value')) {
        el.setAttribute('value', el.getAttribute('data-ar-value'));
      } else if (lang === 'en' && el.hasAttribute('data-en-value')) {
        el.setAttribute('value', el.getAttribute('data-en-value'));
      }
    });
    
    // Handle data-wait attributes for submit buttons
    document.querySelectorAll('[data-wait]').forEach(el => {
      if (lang === 'ar') {
        el.setAttribute('data-wait', 'يرجى الانتظار...');
      } else {
        el.setAttribute('data-wait', 'Please wait...');
      }
    });
    
    // Handle select option text
    document.querySelectorAll('option[data-ar-text], option[data-en-text]').forEach(el => {
      if (lang === 'ar' && el.hasAttribute('data-ar-text')) {
        el.textContent = el.getAttribute('data-ar-text');
      } else if (lang === 'en' && el.hasAttribute('data-en-text')) {
        el.textContent = el.getAttribute('data-en-text');
      }
    });
    
    // Toggle active class
    if (lang === 'ar') {
      arBtn.classList.add('active');
      enBtn.classList.remove('active');
      slider.style.left = '3px';
      // Set direction RTL for body/main, keep header LTR
      document.body.setAttribute('dir', 'rtl');
      var header = document.querySelector('.header');
      if (header) header.setAttribute('dir', 'ltr');
    } else {
      arBtn.classList.remove('active');
      enBtn.classList.add('active');
      slider.style.left = 'calc(50% + 3px)';
      // Set direction LTR for body/main, keep header LTR
      document.body.setAttribute('dir', 'ltr');
      var header = document.querySelector('.header');
      if (header) header.setAttribute('dir', 'ltr');
    }
  }
  // Default: Arabic
  setLanguage('ar');
  // Toggle click
  langToggle.addEventListener('click', function() {
    const isArabic = arBtn.classList.contains('active');
    setLanguage(isArabic ? 'en' : 'ar');
  });
  // Keyboard accessibility
  langToggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      langToggle.click();
    }
  });
});
