/* Change theme */
document.getElementById('theme').addEventListener('change',(x) => {
    const theme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme',theme)
    changeTheme();
})

/* Function theme */
function changeTheme(){
    const theme = localStorage.getItem('theme');
    if (!theme) return;
    const cb = document.getElementById('theme');
    cb.checked = theme === 'dark';
    document.querySelector('html').setAttribute('data-theme',theme);
}

changeTheme();

/* Upload all countries */

let country;
let countryCopy;

const url = 'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,subregion,tld,currencies,languages,borders';

async function uploadCountries(){
    const getData = localStorage.getItem('countries');
    if (getData) {
        country = JSON.parse(getData);
    }else{
        try {
            let data = await fetch(url).then(response => response.json());
            data = data.sort((a,b) => a.name.common.localeCompare(b.name.common))
            localStorage.setItem('countries',JSON.stringify(data));
            country = JSON.parse(localStorage.getItem('countries'));
        } catch (error) {
            document.getElementById('errorMessage').classList.remove('hidden');
            document.getElementById('paginate').classList.remove('flex');
            document.getElementById('paginate').classList.add('hidden');
        }
    }
    countryCopy = country ? [...country] : []
    getPage();
}

uploadCountries();

/* Api */

let pageSize = 20;
let currentPage = 1;
let totalPages;

async function getCountries(){
    try {

        const countryLocal = countryCopy

        if (!countryLocal) return;

        /* Delete country-items */
        const items =document.querySelectorAll('.list-item');
        items.forEach(element => element.remove());
        
        /* Delete paginate-items */
        const paginateItem =document.querySelectorAll('.paginate-item');
        paginateItem.forEach(element => element.remove());

        /* Show loading */
        document.getElementById('loading').classList.remove('hidden');

        await delay(500)

        /* Hidden message */
        document.getElementById('errorMessage').classList.add('hidden');

        const ul = document.getElementById('list-content');

        /* Hidden loading */
        document.getElementById('loading').classList.add('hidden');

        /* Paginate logic */
        const total = countryLocal.length;
        const _totalPages =  Math.ceil(total/pageSize);
        totalPages = _totalPages;

        if (countryLocal.length > 0) {
            document.getElementById('paginate').classList.remove('hidden');
            document.getElementById('paginate').classList.add('flex'); 
            loadPages(_totalPages);
        }else{
            document.getElementById('paginate').classList.add('hidden');
            document.getElementById('paginate').classList.remove('flex'); 
        }

        var countryPerPage = countryLocal.slice((pageSize*currentPage)-pageSize,pageSize*currentPage)

        countryPerPage.forEach(element => {
            cardCountry(element,ul);
        });

    } catch (error) {
        /* document.getElementById('errorMessage').classList.remove('hidden');
        document.getElementById('paginate').classList.remove('flex');
        document.getElementById('paginate').classList.add('hidden'); */
    }
    
}



/* wait */
async function delay(ms){
   return new Promise(resolve => setTimeout(resolve, ms));
}

/* Build card */
function cardCountry(element,ul){
    const li = document.createElement('li');
    const img = document.createElement('img');
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const h4_1 = document.createElement('h4');
    const h4_2 = document.createElement('h4');
    const h4_3 = document.createElement('h4');
    const span_1 = document.createElement('span');
    const span_2 = document.createElement('span');
    const span_3 = document.createElement('span');

    li.className = `flex flex-col cursor-pointer bg-white hover:border-2 
    hover:border-gray-950-l dark:hover:border-2 dark:hover:border-white-d dark:bg-blue-900-d shadow rounded-lg`;
    li.classList.add('list-item');

    li.addEventListener('click',() => {
        const country = element.name.common;
        window.location.href = `./details.html?country=${encodeURIComponent(country)}`;
    })

    img.className = `h-44 w-full bg-center bg-cover rounded-t-lg`;
    img.src = element.flags.png;
    img.alt = element.flags.alt;
    div.className = `py-5 space-y-2 px-4`;
    h2.className = `text-xl font-extrabold text-gray-950-l pb-3 dark:text-white-d`;
    h2.textContent = element.name.common;

    h4_1.className = `font-semibold text-gray-950-l dark:text-white-d`;
    h4_1.textContent = 'Population: ';
    span_1.className = `font-light text-gray-400-l dark:text-white-d`;
    span_1.textContent = element.population;

    h4_2.className = `font-semibold text-gray-950-l dark:text-white-d`;
    h4_2.textContent = 'Region: ';
    span_2.className = `font-light text-gray-400-l dark:text-white-d`;
    span_2.textContent = element.region;
    
    h4_3.className = `font-semibold text-gray-950-l dark:text-white-d`;
    h4_3.textContent = 'Capital: ';
    span_3.className = `font-light text-gray-400-l dark:text-white-d`;
    span_3.textContent = element.capital[0];

    h4_1.appendChild(span_1);
    h4_2.appendChild(span_2);
    h4_3.appendChild(span_3);

    div.appendChild(h2);
    div.appendChild(h4_1);
    div.appendChild(h4_2);
    div.appendChild(h4_3);

    li.append(img);
    li.append(div);

    ul.append(li);
}

/* Load number pages */
function loadPages(num){
    const content = document.getElementById('paginate-content');
    for (let index = 1; index <= num; index++) {
        const div = document.createElement('div');
        const span = document.createElement('span');

        if (index == currentPage) {
            div.className = `size-10 bg-gray-400-l dark:bg-blue-900-d dark:bg-blue-950-d dark:border-2 border-white-d
            rounded-lg flex justify-center items-center cursor-pointer group`;
        }else{
            div.className = `size-10 bg-white hover:bg-gray-400-l dark:bg-blue-900-d dark:hover:bg-blue-950-d dark:hover:border-2 border-white-d
            rounded-lg flex justify-center items-center cursor-pointer group`;
        }

        div.classList.add('paginate-item');
        div.addEventListener('click',() => {
            const num = index;
            changePage(num);
        })
        if (index == currentPage) {
            span.className = ' dark:text-white-d text-gray-50-l dark:text-gray-400-l';
        }else{
            span.className = 'text-gray-950-l dark:text-white-d group-hover:text-gray-50-l dark:group-hover:text-gray-400-l';
        }

        span.textContent = index;
        div.appendChild(span);
        content.append(div);
    }
}

/* Get page */
function getPage(){
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") ?? 1;
    if (!page) return;
    changePage(page);
}

getPage()

/* Change page */
function changePage(num){
    if (currentPage != num || num == 1) {
        currentPage = num;
        changeRoute(num)
        getCountries();
    }
}

/* Change route */
function changeRoute(numPage){
    const url = new URL(window.location);
    url.searchParams.set('page',numPage);
    history.pushState({page:numPage},"",url)
}

/* Next page */
document.getElementById('nextPage').addEventListener('click',() => {
    const numPage = currentPage+1;
    if (numPage>0 && numPage<=totalPages) {
        changePage(numPage);
    }
})

/* Back page */
document.getElementById('backPage').addEventListener('click',() => {
    const numPage = currentPage-1;
    if (numPage > 0 && numPage < currentPage) {
        changePage(numPage)
    }
})

/* Change region */
function changeRegion(region){
    document.getElementById('search').value = "";
    let data = country;
    countryCopy = data.filter(x => x.region == region);
    changePage(1);
    document.getElementById('removeFilters').classList.remove('hidden');
}

/* Search */
let search = document.getElementById('search');
let timeOutId;
search.addEventListener('keydown',(x) => {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
        const newSearch = search.value.trim().toLowerCase();
        if (newSearch.length == 0) {
            let data = country;
            countryCopy = data;
            changePage(1);
            document.getElementById('removeFilters').classList.add('hidden');
        }
        if (newSearch.length>3) {
            document.getElementById('removeFilters').classList.remove('hidden');
            countryCopy = countryCopy.filter((x) => x.name.common.toLowerCase() == newSearch);
            if (countryCopy.length == 0) {
                document.getElementById('notFound').classList.remove('hidden')
            }
            changePage(1);
        }
    }, 1000);
})

/* Remove all filter */
const remove = document.getElementById('removeFilters')
remove.addEventListener('click',() => {
    let data = country;
    countryCopy = data;
    document.getElementById('search').value = "";
    changePage(1);
    remove.classList.add('hidden')
    document.getElementById('notFound').classList.add('hidden')
})