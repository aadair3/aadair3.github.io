document.addEventListener('DOMContentLoaded', function() {
    // Function to sort posts by date
    function sortPostsByDate(option) {
        const postsContainer = document.getElementById('posts-container');
        const posts = Array.from(postsContainer.children);

        posts.sort(function(a, b) {
            const dateA = parseInt(a.getAttribute('data-date'));
            const dateB = parseInt(b.getAttribute('data-date'));

            if (option === 'new-to-old') {
                return dateB - dateA;
            } else if (option === 'old-to-new') {
                return dateA - dateB;
            }

            return 0;
        });

        posts.forEach(post => {
            postsContainer.appendChild(post);
        });
    }

    // Event listener for date sorting
    const sortSelector = document.getElementById('sort-selector');
    sortSelector.addEventListener('change', function() {
        const selectedOption = sortSelector.value;
        sortPostsByDate(selectedOption);
    });

    
    // Function to toggle the filter dropdown visibility
    function toggleFilterDropdown() {
        const filterOptions = document.getElementById('filter-options');
        filterOptions.style.display = (filterOptions.style.display === 'block') ? 'none' : 'block';
    }

    // Function to apply the filter based on selected tags
    function applyFilter() {
        const selectedTags = Array.from(document.querySelectorAll('.tag-checkbox:checked')).map(checkbox => checkbox.value);
        const posts = Array.from(document.querySelectorAll('.post'));

        posts.forEach(post => {
            const postTags = post.getAttribute('data-tags').split(',');
            if (selectedTags.length === 0 || selectedTags.some(tag => postTags.includes(tag))) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });

        toggleFilterDropdown();
    }

    // Get all checkboxes and the "Select All" checkbox
    const checkboxes = document.querySelectorAll('.tag-checkbox');
    const selectAllCheckbox = document.getElementById('select-all');

    // Add a change event listener to the "Select All" checkbox
    selectAllCheckbox.addEventListener('change', function() {
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });

    // Add change event listeners to individual checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (!this.checked) {
                selectAllCheckbox.checked = false;
            } else {
                // Check if all checkboxes are selected, then set "Select All" to checked
                const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
                selectAllCheckbox.checked = allChecked;
            }
        });
    });

    // Event listener to close the dropdown when clicking outside of it
    document.addEventListener('click', function(event) {
        const filterContainer = document.querySelector('.filter-container');
        if (!filterContainer.contains(event.target)) {
            document.getElementById('filter-options').style.display = 'none';
        }
    });

    // Expose functions to the global scope for button onclick attributes
    window.toggleFilterDropdown = toggleFilterDropdown;
    window.applyFilter = applyFilter;
});