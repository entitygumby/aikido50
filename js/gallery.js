// Gallery Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    let lightbox = null;

    // Create lightbox element
    function createLightbox() {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <span class="lightbox-nav lightbox-prev">&lsaquo;</span>
            <div class="lightbox-content">
                <img src="" alt="Gallery image">
            </div>
            <span class="lightbox-nav lightbox-next">&rsaquo;</span>
        `;
        document.body.appendChild(lightbox);

        // Event listeners
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrevious);
        lightbox.querySelector('.lightbox-next').addEventListener('click', showNext);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;

            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevious();
                    break;
                case 'ArrowRight':
                    showNext();
                    break;
            }
        });
    }

    function openLightbox(index) {
        currentIndex = index;
        const img = galleryItems[index].querySelector('img');
        lightbox.querySelector('.lightbox-content img').src = img.src;
        lightbox.querySelector('.lightbox-content img').alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrevious() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        const img = galleryItems[currentIndex].querySelector('img');
        lightbox.querySelector('.lightbox-content img').src = img.src;
        lightbox.querySelector('.lightbox-content img').alt = img.alt;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        const img = galleryItems[currentIndex].querySelector('img');
        lightbox.querySelector('.lightbox-content img').src = img.src;
        lightbox.querySelector('.lightbox-content img').alt = img.alt;
    }

    // Initialize
    if (galleryItems.length > 0) {
        createLightbox();
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });
    }

    // Handle image load errors - show placeholder
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        img.addEventListener('error', function() {
            // Create a placeholder with the image number
            const match = this.src.match(/photo-(\d+)/);
            const num = match ? match[1] : '?';
            this.style.display = 'none';
            item.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#2C2C2C;color:#fff;font-size:1.2rem;">Photo ${num}</div>`;
        });
    });
});
