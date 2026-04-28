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

    // 4. Market Reports Page Logic
    const zoneFilter = document.getElementById('zone-filter');
    const assetFilter = document.getElementById('asset-filter');
    const marketReportsContainer = document.getElementById('market-reports-container');

    if (marketReportsContainer && zoneFilter && assetFilter) {
        const filterMarketReports = () => {
            const selectedZone = zoneFilter.value;
            const selectedAsset = assetFilter.value;

            insightCards.forEach(card => {
                const cardZone = card.getAttribute('data-zone');
                const cardAsset = card.getAttribute('data-asset');
                
                let zoneMatch = selectedZone === 'all' || cardZone === selectedZone;
                let assetMatch = selectedAsset === 'all' || cardAsset === selectedAsset;

                if (zoneMatch && assetMatch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        zoneFilter.addEventListener('change', filterMarketReports);
        assetFilter.addEventListener('change', filterMarketReports);

        // View Toggling (reuses viewBtns logic, just applies to marketReportsContainer)
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const viewType = btn.getAttribute('data-view');
                if (viewType === 'list') {
                    marketReportsContainer.classList.add('list-view');
                    marketReportsContainer.classList.remove('grid-3');
                } else {
                    marketReportsContainer.classList.remove('list-view');
                    marketReportsContainer.classList.add('grid-3');
                }
            });
        });
    }
});
