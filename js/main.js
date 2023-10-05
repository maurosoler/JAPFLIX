const btnSearch = document.getElementById('btnBuscar'); 
let arrayMovies = []; 
// FETCH al cargar la página con la información en la API lista para utilizar 
document.addEventListener('DOMContentLoaded', function () { 
    fetch('https://japceibal.github.io/japflix_api/movies-data.json') 
        .then(response => response.json()) 
        .then(data => { 
            arrayMovies = data; 
            console.log(arrayMovies); 
        }) 
        .catch(error => { 
            console.log('Error al obtener los datos:', error); 
        }) 
}); 
// funcion que filtra las peliculas comparando los datos del usuario con los de la API 
function filterMovies(inputSearch) { 
    const arrayFilteredMovies = arrayMovies.filter(item => { 
        const titulo = item.title.toLowerCase(); 
        const tag = item.tagline.toLowerCase(); 
        const over = item.overview.toLowerCase(); 
        const genres = (item.genres || []).map(genre => genre.name.toLowerCase()); 
        return titulo.includes(inputSearch) || tag.includes(inputSearch) || over.includes(inputSearch) || genres.some(genreName => genreName.includes(inputSearch)); 
    }); 
    return arrayFilteredMovies; 
}; 
const firstChild = document.getElementById('firstChild'); 
// Funcion para crear y mostrar los DIVS HTML de los RESULTADOS de peliculas    
function showMovie(filteredMovies) { 
    const list = document.getElementById('lista'); 
    list.innerHTML = ''; 
    filteredMovies.forEach(item => { 
        const divMovie = document.createElement('div'); 
        const divStars = document.createElement('div'); 
        const genres = item.genres.map(genre => genre.name); 
        starsRating(item.vote_average).forEach(star => { 
            divStars.appendChild(star); 
        }); 
        divStars.classList.add('text-end') 
        divMovie.appendChild(divStars); 
      divMovie.setAttribute("data-bs-toggle", "offcanvas"); 
      divMovie.setAttribute("data-bs-target", `#offcanvasTop${item.id}`); 
      divMovie.setAttribute("aria-controls", `offcanvasTop${item.id}`); 
      divMovie.classList.add('border-bottom' , 'border-top'); 
        const html = ` 
        <h4>${item.title}</h4> 
        <h6>${item.tagline}</h6> 
         `; 
        divMovie.innerHTML += html; 
        list.appendChild(divMovie); 
        // Funcion que despliega el menu con información adicional de las peliculas mostradas. 
divMovie.addEventListener('mousedown', () => { 
    const offcanvas = document.createElement('div'); 
    const movieData = ` 
        <div class="container offcanvas offcanvas-top" tabindex="1" id="offcanvasTop${item.id}" aria-labelledby="offcanvasTopLabel${item.id}" style="overflow: visible;"> 
            <div class="offcanvas-header container"> 
                <h3 id="offcanvasTopLabel" class="text-bold">${item.title}</h3> 
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button> 
            </div> 
            <div class="offcanvas-body container"> 
                <h6>${item.overview}</h6> 
                <hr> 
                <h6>${genres.join(" - ")}</h6> 
                <div class="btn-group"> 
                    <button type="button" class="btn btn-secondary dropdown-toggle float-end" data-bs-toggle="dropdown" aria-expanded="false"> 
                        More 
                    </button> 
                    <ul class="dropdown-menu"> 
                        <li><a class="dropdown-item" href="#">Year:         <span class="fs-5">${item.release_date.substring(0, 4)} </span></a></li> 
                        <li><a class="dropdown-item" href="#">Runtime:      <span class="fs-5">${item.runtime} mins                 </span></a></li> 
                        <li><a class="dropdown-item" href="#">Budget:       <span class="fs-5">$${item.budget}                      </span></a></li> 
                        <li><a class="dropdown-item" href="#">Revenue:      <span class="fs-5"> $${item.revenue}                    </span></a></li> 
                    </ul> 
                </div> 
                <br><br><br><br><br><br><br><br>
            </div> 
        </div> 
    `; 
    offcanvas.innerHTML += movieData; 
    document.body.appendChild(offcanvas); 
}); 
    }) 
    }; 
// AL HACER CLICK EN EL BOTÓN DE BÚSQUEDA 
btnSearch.addEventListener('click', function () { 
    const inputSearch = document.getElementById('inputBuscar').value.toLowerCase(); 
    const resultados = filterMovies(inputSearch); 
    showMovie(resultados); 
    console.log(resultados); 
}); 
// Funcion para las estrellas 
function starsRating(number) { 
    let stars = []; 
    for (let i=0; i<Math.floor(number)/2; i++) { 
        const starSpan = document.createElement('span'); 
        starSpan.classList.add('fa', 'fa-star', 'checked'); 
        stars.push(starSpan); 
    } 
    if (number%1<= 0.5) { 
        const halfStarSpan = document.createElement('span'); 
        halfStarSpan.classList.add('fa', 'fa-star-half-o', 'checked'); 
        stars.push(halfStarSpan); 
    } 
    if (stars.length < 5) { 
        for (let j = 0; j<6-stars.length; j++) { 
            const voidStarSpan = document.createElement('span'); 
            voidStarSpan.classList.add('fa', 'fa-star-o'); 
            stars.push(voidStarSpan); 
        } 
    } 
    console.log(stars); 
    return stars; 
}; 