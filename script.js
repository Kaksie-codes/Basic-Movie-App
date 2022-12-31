const api_key ="a3ec5cef31325905723a0ad860da9c7e";
const movieAPI = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=1`;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const searchAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${api_key}&query=`;

const movieContainerEl = document.querySelector('.movies-container');
const search = document.getElementById('search');


const getMovies = async(api) => {
    try{
        const response = await fetch(api);
        const responseData = await response.json();
        showMovies(responseData.results);        
        }
    catch(err){
        console.log('error fetching data', err);
    }               
}
getMovies(movieAPI)

const showMovies = (movies) => {

     movies.forEach(movie => {
            const {title,vote_average, poster_path, backdrop_path} = movie;
            // console.log(title);
            // console.log(vote_average);

            if(!poster_path){
               poster_path = backdrop_path
            }
            const movieCardEl = document.createElement('div');
            movieCardEl.classList.add('movie-card');
            movieContainerEl.appendChild(movieCardEl);

            const img = document.createElement('img');
            img.src = `${IMGPATH}${poster_path}`;

            const movieDetailsEl = document.createElement('div');
            movieDetailsEl.classList.add('movie-details');

            const movieTitleEl = document.createElement('h1');
            movieTitleEl.classList.add('movie-title');
            movieTitleEl.textContent = title;

            const vote_averageEl = document.createElement('h1');
            vote_averageEl.classList.add('movie-rating');
            vote_averageEl.textContent = vote_average;
            vote_averageEl.classList.add(`${determineColor(vote_average)}`)

            movieDetailsEl.appendChild(movieTitleEl)
            movieDetailsEl.appendChild(vote_averageEl)

            movieCardEl.appendChild(img);
            movieCardEl.appendChild(movieDetailsEl);
     })
}
// getMovies();

function determineColor(average){
    if(average >= 8){
        return 'green'
    }else if(average  >= 6){
        return 'orange'
    }else{
        return 'red'
    }
}

search.addEventListener('keypress', (e) => {
    if(e.keyCode == '13'){
        movieContainerEl.innerHTML = '';
        console.log('we are in....')
        const searchTerm = search.value;
        const mainheaderEl = document.querySelector('.main-header');
        mainheaderEl.textContent = `Results for ${searchTerm}`
        console.log(searchTerm)
        
        if(searchTerm){
            getMovies(`${searchAPI}${searchTerm}`);

            search.value = '';
        }
    }
})
