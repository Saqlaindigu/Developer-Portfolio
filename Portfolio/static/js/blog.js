// Blog page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    const articles = document.querySelectorAll('.article-card');
    const searchInput = document.querySelector('input[type="search"]');
    const sortSelect = document.querySelector('select');
    const categoryButtons = document.querySelectorAll('.category-btn');
    let currentCategory = 'all';
    let currentSort = 'latest';

    // Filter articles based on category and search
    function filterArticles() {
        const searchTerm = searchInput.value.toLowerCase();
        
        articles.forEach(article => {
            const title = article.querySelector('h3').textContent.toLowerCase();
            const content = article.querySelector('p').textContent.toLowerCase();
            const category = article.dataset.category;
            
            const matchesSearch = title.includes(searchTerm) || content.includes(searchTerm);
            const matchesCategory = currentCategory === 'all' || category === currentCategory;
            
            if (matchesSearch && matchesCategory) {
                article.style.display = 'block';
                article.classList.add('animate-fade-in');
            } else {
                article.style.display = 'none';
                article.classList.remove('animate-fade-in');
            }
        });

        updateNoResultsMessage();
    }

    // Sort articles
    function sortArticles() {
        const articleList = Array.from(articles);
        const container = articles[0].parentElement;

        switch(currentSort) {
            case 'latest':
                articleList.sort((a, b) => {
                    return new Date(b.dataset.date) - new Date(a.dataset.date);
                });
                break;
            case 'popular':
                articleList.sort((a, b) => {
                    return (b.dataset.likes || 0) - (a.dataset.likes || 0);
                });
                break;
            case 'series':
                articleList.sort((a, b) => {
                    return (a.dataset.seriesOrder || 0) - (b.dataset.seriesOrder || 0);
                });
                break;
        }

        // Remove and re-append in new order
        articleList.forEach(article => container.appendChild(article));
    }

    // Show no results message
    function updateNoResultsMessage() {
        const noResults = document.querySelector('.no-results');
        const visibleArticles = Array.from(articles).filter(article => 
            article.style.display !== 'none'
        );

        if (visibleArticles.length === 0) {
            if (!noResults) {
                const message = document.createElement('div');
                message.className = 'no-results text-center py-12';
                message.innerHTML = `
                    <div class="text-gray-400">
                        <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                        <h3 class="text-xl font-semibold mb-2">No articles found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                `;
                articles[0].parentElement.appendChild(message);
            }
        } else {
            noResults?.remove();
        }
    }

    // Event Listeners
    searchInput.addEventListener('input', debounce(() => {
        filterArticles();
    }, 300));

    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        sortArticles();
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            filterArticles();
        });
    });

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}); 