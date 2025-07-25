document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    /**
     * Shows a specific tab content and activates its corresponding tab button.
     * @param {string} tabId - The ID of the tab content to show (e.g., 'yoga-tab', 'physio-tab').
     */
    function showTab(tabId) {
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.classList.add('hidden');
        });

        // Deactivate all tab buttons
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Show the selected tab content
        const activeTabContent = document.getElementById(tabId);
        if (activeTabContent) {
            activeTabContent.classList.add('active');
            activeTabContent.classList.remove('hidden');
        }

        // Activate the clicked tab button
        const clickedButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        if (clickedButton) {
            clickedButton.classList.add('active');
        }
    }

    // Add click event listeners to the main tab buttons (Yoga Services, Physiotherapy Services)
    tabButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const tabId = event.target.dataset.tab;
            showTab(tabId);
            // When clicking a tab button on services.html, scroll to the top of the services section
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                // Calculate scroll position, accounting for sticky header
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                const targetScrollPosition = servicesSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetScrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- CRITICAL FIX: Ensure services.html loads at the very top ---
    if (window.location.pathname.includes('services.html')) {
        let initialHash = '';
        if (window.location.hash) {
            initialHash = window.location.hash.substring(1); // Get tab ID from hash (e.g., 'yoga-tab')
            // Immediately remove the hash from the URL to prevent browser's default scroll-to-hash
            history.replaceState(null, null, window.location.pathname);
        }

        // Force scroll to the very top of the document
        window.scrollTo(0, 0);

        // After a very short delay, activate the tab using the captured hash
        // This ensures the initial scroll to top completes before tab activation
        setTimeout(() => {
            if (initialHash) {
                showTab(initialHash); // Activate the tab specified in the URL hash
            } else {
                // If no hash, activate the first tab by default
                if (tabButtons.length > 0 && tabContents.length > 0) {
                    const firstTabId = tabButtons[0].dataset.tab;
                    showTab(firstTabId);
                }
            }
        }, 100); // Increased delay slightly to ensure scroll to top
    } else {
        // Initialize: Show the first tab by default when the page loads (if not services.html)
        // This block only applies to index.html if it has tabs, or other pages
        if (tabButtons.length > 0 && tabContents.length > 0) {
            const firstTabId = tabButtons[0].dataset.tab;
            showTab(firstTabId);
        }
    }

    // Mobile menu toggle (already present)
    document.getElementById('menuToggle')?.addEventListener('click', function () {
        document.getElementById('navLinks')?.classList.toggle('active');
    });
});
