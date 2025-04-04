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
    previewContainer.innerHTML = '<img src="" alt="Full size preview">';
    previewContainer.style.display = 'none';
    document.body.appendChild(previewContainer);

    
    const hoverPreview = document.createElement('div');
    hoverPreview.className = 'thumbnail-preview';
    hoverPreview.innerHTML = '<img src="" alt="Preview">';
    hoverPreview.style.display = 'none';
    hoverPreview.style.position = 'absolute';
    hoverPreview.style.zIndex = '9999';
    hoverPreview.style.pointerEvents = 'none'; 
    hoverPreview.style.boxShadow = '0px 10px 30px rgba(0, 0, 0, 0.3)';
    document.body.appendChild(hoverPreview);

    
    document.querySelectorAll('.photo-link').forEach(link => {
        const fullSizeUrl = link.getAttribute('data-fullsize');

        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            previewContainer.querySelector('img').src = fullSizeUrl;
            previewContainer.style.display = 'flex';
        });

        
        link.addEventListener('mouseenter', function() {
            if (!fullSizeUrl) return;

            const img = this.querySelector('img');
            if (!img) return;

            
            const cell = img.closest('td');
            const row = img.closest('tr');
            if (!cell || !row) return;

           
            const rowRect = row.getBoundingClientRect();
            const cellRect = cell.getBoundingClientRect();

            
            const centerX = cellRect.left + cellRect.width / 2;
            const centerY = rowRect.top + rowRect.height / 2;

            
            hoverPreview.querySelector('img').src = fullSizeUrl;
            hoverPreview.style.display = 'block';
            hoverPreview.style.left = `${centerX}px`;
            hoverPreview.style.top = `${centerY}px`;
            hoverPreview.style.transform = 'translate(-50%, -50%)';
        });

        link.addEventListener('mouseleave', function() {
            hoverPreview.style.display = 'none';
        });
    });

    
    previewContainer.addEventListener('click', function() {
        this.style.display = 'none';
    });

    
    window.addEventListener('scroll', function() {
        if (hoverPreview.style.display === 'block') {
            hoverPreview.style.position = 'absolute';
        }
    });
});
