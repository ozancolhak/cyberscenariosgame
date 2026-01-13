document.addEventListener('DOMContentLoaded', () => {
    // 0. Detect Language based on URL
    const isEnglish = window.location.pathname.includes('/en/');
    const basePath = isEnglish ? '../' : '';
    const homePath = 'index.html'; // Within en/ it is index.html, root is index.html

    // Define Text Resources
    const txt = isEnglish ? {
        brand: "Cyber Scenarios",
        home: "Home",
        corp: "For Corporations",
        pros: "For Cyber Pros",
        infosec: "InfoSec",
        about: "About",
        dev: "Developer",
        rights: "All rights reserved.",
        langLink: "../index.html",
        langLabel: "TR",
        langFlag: "🇹🇷"
    } : {
        brand: "Siber Senaryolar",
        home: "Ana Sayfa",
        corp: "Kurumlar İçin",
        pros: "Siber Güvenlikçiler İçin",
        infosec: "Bilgi Güvenliği",
        about: "Hakkında",
        dev: "Geliştirici",
        rights: "Tüm hakları saklıdır.",
        langLink: "en/index.html",
        langLabel: "EN",
        langFlag: "🇬🇧"
    };

    // 1. Inject Navigation Bar
    const navHTML = `
        <nav class="main-nav">
            <a href="${homePath}" class="nav-brand">${txt.brand}</a>
            <button class="menu-toggle" aria-label="Toggle Menu">
                <i class="fas fa-bars"></i>
            </button>
            <ul class="nav-links">
                <li><a href="${homePath}" class="nav-link">${txt.home}</a></li>
                <li><a href="sirket.html" class="nav-link">${txt.corp}</a></li>
                <li><a href="krizler.html" class="nav-link">${txt.pros}</a></li>
                <li><a href="bilgi.html" class="nav-link">${txt.infosec}</a></li>
                <li><a href="hakkinda.html" class="nav-link">${txt.about}</a></li>
                <li><a href="${txt.langLink}" class="nav-link lang-switch" style="color:var(--main-accent); border:1px solid var(--main-accent); padding: 5px 10px; border-radius: 5px;">${txt.langFlag} ${txt.langLabel}</a></li>
            </ul>
        </nav>
    `;

    // Insert Nav at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 2. Inject Footer
    const footerHTML = `
        <footer class="main-footer">
            <div class="footer-content">
                <p>&copy; 2025 ${isEnglish ? 'Cyber Crisis Simulations' : 'Siber Kriz Simülasyonları'}. ${txt.rights}</p>
                <div class="footer-links">
                    <a href="hakkinda.html" class="footer-link">${txt.dev}</a>
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
        // Simple check: matches href exactly (ignoring path depth for simple pages)
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

    console.log(`Cyber Scenarios script loaded (${isEnglish ? 'EN' : 'TR'}) and UI injected.`);
});
