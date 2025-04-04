document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('language-toggle');
    const engContent = document.querySelectorAll('.eng');
    const mmContent = document.querySelectorAll('.mm');
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

    if (languageToggle) {
        languageToggle.addEventListener('change', function() {
            if (this.checked) {
                engContent.forEach(el => el.style.display = 'none');
                mmContent.forEach(el => el.style.display = 'block');
            } else {
                engContent.forEach(el => el.style.display = 'block');
                mmContent.forEach(el => el.style.display = 'none');
            }
        });
    }

    document.body.style.transform = 'translateY(50px)';
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'transform 1.5s ease, opacity 1.5s ease';
        document.body.style.transform = 'translateY(0)';
        document.body.style.opacity = '1';
    }, 100);

    const previewContainer = document.createElement('div');
    previewContainer.className = 'fullscreen-preview';
    previewContainer.innerHTML = '<div class="preview-content"><img src="" alt="Full size preview"></div>';
    previewContainer.style.display = 'none';
    document.body.appendChild(previewContainer);

    document.querySelectorAll('.photo-link').forEach(link => {
        const fullSizeUrl = link.getAttribute('data-fullsize');

        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const thumbnail = this.querySelector('img');
            const thumbRect = thumbnail.getBoundingClientRect();
            
            const thumbClone = thumbnail.cloneNode();
            thumbClone.style.position = 'fixed';
            thumbClone.style.top = `${thumbRect.top}px`;
            thumbClone.style.left = `${thumbRect.left}px`;
            thumbClone.style.width = `${thumbRect.width}px`;
            thumbClone.style.height = `${thumbRect.height}px`;
            thumbClone.style.transition = 'all 0.4s cubic-bezier(0.32, 0.72, 0, 1)';
            thumbClone.style.zIndex = '2001';
            thumbClone.style.objectFit = 'cover';
            thumbClone.style.borderRadius = '4px';
            document.body.appendChild(thumbClone);
            
            const fullImg = new Image();
            fullImg.src = fullSizeUrl;
            fullImg.onload = function() {
                thumbClone.style.top = '50%';
                thumbClone.style.left = '50%';
                thumbClone.style.transform = 'translate(-50%, -50%)';
                thumbClone.style.width = 'min(90vw, ' + fullImg.naturalWidth + 'px)';
                thumbClone.style.height = 'auto';
                thumbClone.style.maxHeight = '90vh';
                thumbClone.style.borderRadius = '0';
                thumbClone.style.objectFit = 'contain';
                
                setTimeout(() => {
                    previewContainer.querySelector('img').src = fullSizeUrl;
                    previewContainer.style.display = 'flex';
                    setTimeout(() => {
                        previewContainer.classList.add('active');
                    }, 10);
                    
                    setTimeout(() => {
                        thumbClone.remove();
                    }, 400);
                }, 10);
            };
        });
    });

    previewContainer.addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('preview-content')) {
            this.classList.remove('active');
            setTimeout(() => {
                this.style.display = 'none';
                this.querySelector('img').src = '';
            }, 300);
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && previewContainer.style.display === 'flex') {
            previewContainer.classList.remove('active');
            setTimeout(() => {
                previewContainer.style.display = 'none';
                previewContainer.querySelector('img').src = '';
            }, 300);
        }
    });
});
