document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Navigation Bar
    const navHTML = `
        <nav class="main-nav">
            <a href="index.html" class="nav-brand">Siber Senaryolar</a>
            <button class="menu-toggle" aria-label="Toggle Menu">
                <i class="fas fa-bars"></i>
            </button>
            <ul class="nav-links">
                <li><a href="index.html" class="nav-link">Ana Sayfa</a></li>
                <li><a href="sirket.html" class="nav-link">Kurumlar İçin</a></li>
                <li><a href="krizler.html" class="nav-link">Siber Güvenlikçiler İçin</a></li>
                <li><a href="bilgi.html" class="nav-link">Bilgi Güvenliği</a></li>
                <li><a href="hakkinda.html" class="nav-link">Hakkında</a></li>
            </ul>
        </nav>
    `;

    // Insert Nav at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 2. Inject Footer
    const footerHTML = `
        <footer class="main-footer">
            <div class="footer-content">
                <p>&copy; 2025 Siber Kriz Simülasyonları. Tüm hakları saklıdır.</p>
                <div class="footer-links">
                    <a href="hakkinda.html" class="footer-link">Geliştirici</a>
                    <a href="https://github.com/ozancolhak" target="_blank" class="footer-link"><i class="fab fa-github"></i> GitHub</a>
                    <a href="https://linkedin.com/in/ozan-ismail-çolhak-119003313" target="_blank" class="footer-link"><i class="fab fa-linkedin"></i> LinkedIn</a>
                </div>
            </div>
        </footer>
    `;

    // Insert Footer at the end of body
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // 3. Highlight Active Link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 4. Mobile Menu Toggle Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 5. Lazy Loading for Images (Performance Optimization)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // 6. Add page-content class to body if not present (for layout consistency)
    // Only if it's NOT the index page (which has centered layout)
    // Actually relying on CSS class on body tag in HTML is better as per my refactor.
    // So this step is skipped to avoid overriding specific page structures.

    console.log('Cyber Scenarios script loaded and UI injected.');
});
