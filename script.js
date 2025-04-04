document.addEventListener('DOMContentLoaded', function() {
    // Language toggle and mobile detection
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

    // Page load animation
    document.body.style.transform = 'translateY(50px)';
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'transform 1.5s ease, opacity 1.5s ease';
        document.body.style.transform = 'translateY(0)';
        document.body.style.opacity = '1';
    }, 100);

    // Fullscreen preview container
    const previewContainer = document.createElement('div');
    previewContainer.className = 'fullscreen-preview';
    previewContainer.innerHTML = '<img src="" alt="Full size preview">';
    previewContainer.style.display = 'none';
    document.body.appendChild(previewContainer);

    // Hover preview (Centered in the Relevant Table Cell)
    const hoverPreview = document.createElement('div');
    hoverPreview.className = 'thumbnail-preview';
    hoverPreview.innerHTML = '<img src="" alt="Preview">';
    hoverPreview.style.display = 'none';
    hoverPreview.style.position = 'absolute';
    hoverPreview.style.zIndex = '9999';
    hoverPreview.style.pointerEvents = 'none'; 
    hoverPreview.style.boxShadow = '0px 10px 30px rgba(0, 0, 0, 0.3)';
    document.body.appendChild(hoverPreview);

    // Set up event listeners for all photo links
    document.querySelectorAll('.photo-link').forEach(link => {
        const fullSizeUrl = link.getAttribute('data-fullsize');

        // Click for fullscreen preview
        link.addEventListener('click', function(e) {
            e.preventDefault();
            previewContainer.querySelector('img').src = fullSizeUrl;
            previewContainer.style.display = 'flex';
        });

        // Hover to show preview (Centered in the Table Row & Column)
        link.addEventListener('mouseenter', function() {
            if (!fullSizeUrl) return;

            const img = this.querySelector('img');
            if (!img) return;

            // Find the closest table row and column
            const cell = img.closest('td');
            const row = img.closest('tr');
            if (!cell || !row) return;

            // Get bounding box of the relevant row and column
            const rowRect = row.getBoundingClientRect();
            const cellRect = cell.getBoundingClientRect();

            // Calculate the center position of the relevant row & column
            const centerX = cellRect.left + cellRect.width / 2;
            const centerY = rowRect.top + rowRect.height / 2;

            // Set preview position
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

    // Close fullscreen preview on click
    previewContainer.addEventListener('click', function() {
        this.style.display = 'none';
    });

    // Prevent scrolling from moving the preview
    window.addEventListener('scroll', function() {
        if (hoverPreview.style.display === 'block') {
            hoverPreview.style.position = 'absolute';
        }
    });
});
