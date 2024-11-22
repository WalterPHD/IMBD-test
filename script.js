const API_URL = 'https://api.collectapi.com/imdb/imdbSearchByName';
const API_KEY = 'apikey 3NxW9JhF6FbNjEZ7ftokk8:58O5ZWD6641TJonL1zqVWO'; // Substitua pela sua chave da API
const moviesList = document.getElementById('movies-list');

// Termo padrão para exibição inicial
fetchMovies("Inception");

async function fetchMovies(query) {
    try {
        const response = await fetch(`${API_URL}?query=${encodeURIComponent(query)}`, {
            headers: {
                'Authorization': `apikey ${API_KEY}`
            }
        });
        const data = await response.json();
        displayMovies(data.result);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        moviesList.innerHTML = '<p class="text-center text-danger">Falha ao carregar os filmes. Tente novamente mais tarde.</p>';
    }
}

function displayMovies(movies) {
    moviesList.innerHTML = '';
    if (movies && movies.length > 0) {
        movies.forEach(movie => {
            const title = movie.Title || 'Título não disponível';
            const image = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : 'default-placeholder-image.jpg';
            const imdbLink = `https://www.imdb.com/title/${movie.imdbID}`;

            const movieCard = `
                <div class="col-10 col-sm-6 col-md-4 col-lg-3">
                    <div class="card">
                        <a href="${imdbLink}" target="_blank">
                            <img src="${image}" class="card-img-top" alt="${title}">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                        </div>
                    </div>
                </div>
            `;
            moviesList.insertAdjacentHTML('beforeend', movieCard);
        });
    } else {
        moviesList.innerHTML = '<p class="text-center">Nenhum filme encontrado.</p>';
    }
}
