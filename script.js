document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Initial check in case page loads partway down
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // 2. Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // 3. Insights Page Logic
    const themeFilter = document.getElementById('theme-filter');
    const dateFilter = document.getElementById('date-filter');
    const viewBtns = document.querySelectorAll('.view-btn');
    const insightsContainer = document.getElementById('insights-container');
    const insightCards = document.querySelectorAll('.insight-card');

    if (insightsContainer && themeFilter && dateFilter) {
        // Filtering
        const filterInsights = () => {
            const selectedTheme = themeFilter.value;
            const selectedDate = dateFilter.value;

            insightCards.forEach(card => {
                const cardTheme = card.getAttribute('data-theme');
                const cardDate = card.getAttribute('data-date');
                
                let themeMatch = selectedTheme === 'all' || cardTheme === selectedTheme;
                let dateMatch = selectedDate === 'all' || cardDate.startsWith(selectedDate);

                if (themeMatch && dateMatch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        themeFilter.addEventListener('change', filterInsights);
        dateFilter.addEventListener('change', filterInsights);

        // View Toggling
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                viewBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const viewType = btn.getAttribute('data-view');
                if (viewType === 'list') {
                    insightsContainer.classList.add('list-view');
                    insightsContainer.classList.remove('grid-3');
                } else {
                    insightsContainer.classList.remove('list-view');
                    insightsContainer.classList.add('grid-3');
                }
            });
        });
    }
});
