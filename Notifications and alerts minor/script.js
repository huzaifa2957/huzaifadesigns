// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const filterButton = document.getElementById('filterButton');
    const filterMenu = document.getElementById('filterMenu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const markReadButton = document.querySelector('.mark-read-button');
    const notificationItems = document.querySelectorAll('.notification-item');
    const countBadge = document.querySelector('.count-badge');
    const showingCount = document.querySelector('.showing-count span');

    // Toggle dropdown
    filterButton.addEventListener('click', (e) => {
        e.stopPropagation();
        filterButton.classList.toggle('active');
        filterMenu.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!filterButton.contains(e.target) && !filterMenu.contains(e.target)) {
            filterButton.classList.remove('active');
            filterMenu.classList.remove('show');
        }
    });

    // Handle filter selection
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const priority = item.dataset.priority;
            const filteredCount = filterNotifications(priority);
            filterButton.classList.remove('active');
            filterMenu.classList.remove('show');
            showingCount.textContent = `Showing ${filteredCount} notification${filteredCount !== 1 ? 's' : ''}`;
        });
    });

    // Mark all as read functionality
    markReadButton.addEventListener('click', () => {
        notificationItems.forEach(item => {
            item.style.opacity = '0.6';
        });
        countBadge.textContent = '0';
        showingCount.textContent = 'Showing 0 notifications';
    });

    // Individual notification click handling
    notificationItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.opacity = '0.6';
            updateNotificationCount();
        });
    });

    // Filter notifications by priority
    function filterNotifications(priority) {
        let visibleCount = 0;
        notificationItems.forEach(item => {
            const itemPriority = item.dataset.priority;
            if (priority === itemPriority) {
                item.style.display = 'flex';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        return visibleCount;
    }

    // Update notification count
    function updateNotificationCount() {
        const unreadCount = Array.from(notificationItems)
            .filter(item => item.style.opacity !== '0.6')
            .length;
        countBadge.textContent = unreadCount;
        showingCount.textContent = `Showing ${unreadCount} notification${unreadCount !== 1 ? 's' : ''}`;
    }

    // Search functionality
    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = e.target.querySelector('input').value;
        console.log('Searching for:', searchTerm);
    });
});