

const movieInput = document.getElementById('movieInput');
const searchButton = document.getElementById('searchButton');
const moviesContainer = document.getElementById('moviesContainer');


searchButton.addEventListener('click', () => {
  const apiKey = 'af054f4566aebd07f8ff4399f856425d'; 
  const movieTitle = movieInput.value;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}`;

  
  axios.get(searchUrl)
    .then(response => {
      const data = response.data;
      moviesContainer.innerHTML = '';

      
      data.results.forEach(movie => {
        const movieElement = document.createElement('div');
        const movieImage = document.createElement('img');
        const movieTitle = document.createElement('h2');
        const movieDescription = document.createElement('p');
        const movieGenre = document.createElement('p'); 

        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieTitle.textContent = movie.title;
        movieDescription.textContent = movie.overview;

        
        const genreUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`;
        axios.get(genreUrl)
          .then(response => {
            const genreData = response.data;
            const genres = genreData.genres.map(genre => genre.name);
            movieGenre.textContent = `Género: ${genres.join(', ')}`;
          })
          .catch(error => console.log(error));

        movieElement.appendChild(movieImage);
        movieElement.appendChild(movieTitle);
        movieElement.appendChild(movieDescription);
        movieElement.appendChild(movieGenre);

        moviesContainer.appendChild(movieElement);
      });
    })
    .catch(error => console.log(error));
});