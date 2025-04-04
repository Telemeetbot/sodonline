document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('language-toggle');
    const engContent = document.querySelectorAll('.eng');
    const mmContent = document.querySelectorAll('.mm');
    
    if (languageToggle) {
        languageToggle.addEventListener('change', function() {
            const isChecked = this.checked;
            engContent.forEach(el => el.style.display = isChecked ? 'none' : 'block');
            mmContent.forEach(el => el.style.display = isChecked ? 'block' : 'none');
        });
    }

    const pcContent = document.querySelector('.pc-content');
    const mobileMessage = document.querySelector('.mobile-message');
    
    function isMobileDevice() {
        return (('ontouchstart' in window) ||
               (navigator.maxTouchPoints > 0) ||
               (navigator.msMaxTouchPoints > 0)) &&
               (window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    }

    if (isMobileDevice()) {
        if (pcContent) pcContent.style.display = 'none';
        if (mobileMessage) mobileMessage.style.display = 'block';
    } else {
        if (pcContent) pcContent.style.display = 'block';
        if (mobileMessage) mobileMessage.style.display = 'none';
    }

    document.body.style.transform = 'translateY(50px)';
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'transform 1.5s ease, opacity 1.5s ease';
        document.body.style.transform = 'translateY(0)';
        document.body.style.opacity = '1';
    }, 100);
});
