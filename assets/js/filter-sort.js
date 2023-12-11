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

            // Add more sorting options as needed

            return 0;
        });

        posts.forEach(post => {
            postsContainer.appendChild(post);
        });
    }

    // Event listener for tag filter
    // const tagButtons = document.querySelectorAll('.tag-button');
    // tagButtons.forEach(button => {
    //     button.addEventListener('click', function () {
    //         const selectedTag = this.getAttribute('data-tag');
    //         filterPostsByTag(selectedTag);
    //     });
    // });

    // Event listener for tag filter (attempt 2)


    // Event listener for date sorting
    const sortSelector = document.getElementById('sort-selector');
    sortSelector.addEventListener('change', function() {
        const selectedOption = sortSelector.value;
        sortPostsByDate(selectedOption);
    });

});

function toggleFilterDropdown() {
    const filterOptions = document.getElementById('filter-options');
    filterOptions.style.display = (filterOptions.style.display === 'block') ? 'none' : 'block';
}

// Function to filter posts by selected tags
function filterPostsByTag(tag) {
    const selectedTags = document.querySelector('.select-field')
    const posts = Array.from(document.querySelectorAll('.post'));

    posts.forEach(post => {
        const postTags = post.getAttribute('data-tags').split(',');
        if (selectedTags.length === 0 || selectedTags.some(tag => postTags.includes(tag))) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

// Get all checkboxes and the "Select All" checkbox
const checkboxes = document.querySelectorAll('.tag-checkbox');
const selectAllCheckbox = document.getElementById('select-all');

// Add a change event listener to the "Select All" checkbox
selectAllCheckbox.addEventListener('change', function() {
    // Set all individual tag checkboxes to the state of "Select All" checkbox
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
    selectAllCheckbox.value = selectAllCheckbox.checked ? 'Deselect All' : 'Select All';
});



function applyFilter() {
    // Update the post display based on the selected tags
    const allPosts = document.querySelectorAll('.post');
    const selectedTags = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    allPosts.forEach(post => {
        const postTags = post.getAttribute('data-tags').split(',');

        if (selectedTags.length === 0 || selectedTags.some(tag => postTags.includes(tag))) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });


    toggleFilterDropdown();
}