function loadVideo(playButton) {
    // Get the video container (parent of play-overlay)
    const container = playButton.closest('.video-container');
    const videoId = container.getAttribute('data-video-id');
    
    // Create iframe with proper Google Drive embed URL
    const iframe = document.createElement('iframe');
    // Use the correct preview URL format
    iframe.src = `https://drive.google.com/file/d/${videoId}/preview`;
    iframe.className = 'w-full h-full absolute top-0 left-0 border-0';
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;
    
    // Clear container and add iframe
    container.innerHTML = '';
    container.appendChild(iframe);
    
    // Add close button with higher z-index
    const closeButton = document.createElement('button');
    closeButton.className = 'absolute top-4 right-4 z-50 bg-red-600 hover:bg-red-700 rounded-full p-2 text-white transition-all duration-300 transform hover:scale-110 shadow-lg';
    closeButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    `;
    closeButton.onclick = (e) => {
        e.stopPropagation();
        resetVideo(container, videoId);
    };
    container.appendChild(closeButton);

    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40';
    loadingIndicator.innerHTML = `
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    `;
    container.appendChild(loadingIndicator);

    // Remove loading indicator when iframe loads
    iframe.onload = () => {
        loadingIndicator.remove();
    };

    // Add error handler
    iframe.onerror = () => {
        loadingIndicator.remove();
        showError(container);
    };
}

function showError(container) {
    container.innerHTML = `
        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="text-center text-white p-4">
                <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="mb-2">Error loading video</p>
                <button onclick="retryVideo(this)" class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors">
                    Retry
                </button>
            </div>
        </div>
    `;
}

function retryVideo(button) {
    const container = button.closest('.video-container');
    const videoId = container.getAttribute('data-video-id');
    loadVideo(container.querySelector('.play-overlay'));
}

function resetVideo(container, videoId) {
    container.innerHTML = `
        <div class="play-overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 cursor-pointer" onclick="loadVideo(this)">
            <div class="w-16 h-16 flex items-center justify-center rounded-full bg-red-600 group-hover:bg-red-700 transform group-hover:scale-110 transition-all duration-300">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </div>
        </div>
    `;
    container.setAttribute('data-video-id', videoId);
}

// Add event listener for escape key to close video
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeVideo = document.querySelector('.video-container iframe');
        if (activeVideo) {
            const container = activeVideo.closest('.video-container');
            const videoId = container.getAttribute('data-video-id');
            resetVideo(container, videoId);
        }
    }
}); 