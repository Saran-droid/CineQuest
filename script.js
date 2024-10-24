const apiKey = '20584b2c71a16e8abef318baebde2049';
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

// Function to fetch movies based on the search input
async function fetchMovies() {
    const query = searchInput.value;
    if (!query) return; // Exit if the search input is empty

    // Clear previous results and show loading message
    resultsContainer.innerHTML = '';
    const loadingMessage = document.createElement('p');
    loadingMessage.textContent = 'Loading...';
    loadingMessage.style.color = '#ffffff'; // Set loading text color
    loadingMessage.style.fontSize = '1.2em';
    resultsContainer.appendChild(loadingMessage);

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
        const data = await response.json();

        // Check if movies are found
        if (data.results.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        } else {
            displayResults(data.results);
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        resultsContainer.innerHTML = '<p>Failed to fetch movies. Please try again.</p>';
    }
}

// Function to display the movie results
function displayResults(movies) {
    // Clear the loading message
    const loadingMessage = resultsContainer.querySelector('p');
    if (loadingMessage) {
        resultsContainer.removeChild(loadingMessage);
    }

    // Create movie cards for each result
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        // Create and append movie poster
        const posterImg = document.createElement('img');
        posterImg.src = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';
        movieCard.appendChild(posterImg);

        // Create and append movie title
        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;
        movieCard.appendChild(movieTitle);

        // Create and append movie release date
        const releaseDate = document.createElement('p');
        releaseDate.textContent = `Release Date: ${movie.release_date || 'N/A'}`;
        movieCard.appendChild(releaseDate);

        // Create and append movie overview
        const overview = document.createElement('p');
        overview.textContent = movie.overview || 'No overview available.';
        movieCard.appendChild(overview);

        // Append the movie card to the results container
        resultsContainer.appendChild(movieCard);
    });
}

// Event listener for the search button
searchButton.addEventListener('click', fetchMovies);

// Optional: Allow pressing Enter to search
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchMovies();
    }
});
