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

/* Get country */
let url = '';

function getPage(){
    const params = new URLSearchParams(window.location.search);
    const country = params.get("country");
    console.log(country)
    if (!country) return;
    url = `https://restcountries.com/v3.1/name/${country}`
    getCountry();
}

getPage();

async function getCountry(){
    try {
        /* Show loading */
        document.getElementById('loading').classList.remove('hidden');
        
        /* Delay */
        await delay(1000);
        
        const data = await fetch(url).then(response => response.json());
        
        /* Hidden loading */
        document.getElementById('loading').classList.add('hidden');

        /* Show arrow back */
        document.getElementById('back').classList.remove('hidden');
        
        console.log(data[0])
        buildCard(data[0]);
        
    } catch (error) {
        console.log('error');

        document.getElementById('loading').classList.add('hidden');

        /* Show error */
        document.getElementById('errorMessage').classList.remove('hidden');
    }
}

/* Delay function */
function delay(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}

/* Build card */
function buildCard(data){
    const content = document.getElementById('content');
    /* Flag */
    const div = document.createElement('div');
    const image = document.createElement('img');
    
    div.className = 'py-10 col-span-1 sm:col-span-2 lg:row-span-3 lg:px-10';
    image.className = 'w-full h-64 lg:h-88 rounded-xl bg-center bg-cover';
    image.src = data.flags.png ?? 'none';
    image.alt = data.flags.alt ?? 'none';
    div.appendChild(image);
    
    /* Name country */
    const h2 = document.createElement('h2');
    h2.className = "px-4 text-xl font-extrabold text-gray-950-l pb-3 dark:text-white-d col-span-1 sm:col-span-2";
    h2.textContent = data.name.common ?? 'none';
    
    /* First part */
    const div1 = document.createElement('div');
    div1.className = 'space-y-3 px-4 col-span-1';
    const h4_1 = document.createElement('h4');
    const h4_2 = document.createElement('h4');
    const h4_3 = document.createElement('h4');
    const h4_4 = document.createElement('h4');
    const h4_5 = document.createElement('h4');
    const span_1 = document.createElement('span');
    const span_2 = document.createElement('span');
    const span_3 = document.createElement('span');
    const span_4 = document.createElement('span');
    const span_5 = document.createElement('span');
    
    h4_1.className = 'font-semibold text-gray-950-l dark:text-white-d';
    h4_1.textContent = 'Native Name: '
    
    h4_2.className = 'font-semibold text-gray-950-l dark:text-white-d';
    h4_2.textContent = 'Population: '
    
    h4_3.className = 'font-semibold text-gray-950-l dark:text-white-d';
    h4_3.textContent = 'Region: '
    
    h4_4.className = 'font-semibold text-gray-950-l dark:text-white-d';
    h4_4.textContent = 'Sub Region: '
    
    h4_5.className = 'font-semibold text-gray-950-l dark:text-white-d';
    h4_5.textContent = 'Capital: '
    
    span_1.className = "font-light text-gray-400-l dark:text-white-d"
    const language = Object.values(data.languages ?? {});
    span_1.textContent = language[0] ?? 'none';
    
    span_2.className = "font-light text-gray-400-l dark:text-white-d"
    span_2.textContent = data.population ?? 'none';
    
    span_3.className = "font-light text-gray-400-l dark:text-white-d"
    span_3.textContent = data.region ?? 'none';
    
    span_4.className = "font-light text-gray-400-l dark:text-white-d"
    span_4.textContent = data.subregion ?? 'none';
    
    span_5.className = "font-light text-gray-400-l dark:text-white-d"
    span_5.textContent = data.capital ? data.capital[0] : 'none'
    
    h4_1.appendChild(span_1);
    h4_2.appendChild(span_2);
    h4_3.appendChild(span_3);
    h4_4.appendChild(span_4);
    h4_5.appendChild(span_5);
    
    div1.append(h4_1);
    div1.append(h4_2);
    div1.append(h4_3);
    div1.append(h4_4);
    div1.append(h4_5);
    
    /* Second part */
    const div_2 = document.createElement('div');
    const h4_6 = document.createElement('h4')
    const h4_7 = document.createElement('h4')
    const h4_8 = document.createElement('h4')
    
    h4_6.className = 'font-semibold text-gray-950-l dark:text-white-d flex gap-1';
    h4_7.className = 'font-semibold text-gray-950-l dark:text-white-d flex gap-1';
    h4_8.className = 'font-semibold text-gray-950-l dark:text-white-d flex gap-1';
    
    div_2.className = 'px-4 pt-8 sm:pt-0 col-span-1 place-content-start';
    
    h4_6.textContent = 'Top Level Domain: ';
    const ul_6 = document.createElement('ul')
    ul_6.className = 'flex font-light flex-wrap *:text-gray-400-l *:dark:text-white-d gap-2 *:last:[&>span]:hidden';
    const data6 = data.tld ?? ['none'];
    data6.forEach(element => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.textContent = element;
        span.textContent = ','
        li.appendChild(span);
        ul_6.appendChild(li);
    });
    h4_6.appendChild(ul_6);

    h4_7.textContent = 'Currencies: ';
    const ul_7 = document.createElement('ul')
    ul_7.className = 'flex font-light flex-wrap *:text-gray-400-l *:dark:text-white-d gap-2 *:last:[&>span]:hidden';
    const data7 = Object.values(data.currencies ?? {});
    const currencies7 = data7.length>0 ? data7 : [{name:'none'}]

    currencies7.forEach(element => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.textContent = element.name;
        span.textContent = ','
        li.appendChild(span);
        ul_7.appendChild(li);
    }); 

    h4_7.appendChild(ul_7);

    h4_8.textContent = 'Languages: ';
    const ul_8 = document.createElement('ul')
    ul_8.className = 'flex font-light flex-wrap *:text-gray-400-l *:dark:text-white-d gap-2 *:last:[&>span]:hidden';
    
    const data8 = Object.values(data.languages ?? {});
    const languages8 = data8.length>0 ? data8 : ['none']
    
    languages8.forEach(element => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.textContent = element;
        span.textContent = ','
        li.appendChild(span);
        ul_8.appendChild(li);
    });
    h4_8.appendChild(ul_8);

    div_2.append(h4_6);
    div_2.append(h4_7);
    div_2.append(h4_8);
    
    /* Third part */
    const div_3 = document.createElement('div');
    const h2_3 = document.createElement('h2');
    
    const div_content = document.createElement('div');
    
    div_3.className = 'px-4 flex gap-5 flex-col sm:flex-row flex-wrap pt-8 col-span-1 sm:col-span-2';
    
    h2_3.className = 'text-lg font-semibold text-gray-950-l pb-3 sm:pb-0 place-content-center dark:text-white-d'
    h2_3.textContent = 'Border Countries';
    
    div_content.className = 'flex flex-wrap gap-3';
    const borders = data.borders ?? ['none']    
    borders.forEach(element => {
        const div_item = document.createElement('div');
        div_item.className = 'text-sm px-4 py-2 rounded-lg shadow bg-gray-50 dark:bg-blue-900-d text-gray-950-l dark:text-white-d';
        div_item.textContent = element;
        div_content.appendChild(div_item);
    });

    div_3.appendChild(h2_3);
    div_3.appendChild(div_content);

    content.append(div);
    content.append(h2);
    content.append(div1);
    content.append(div_2);
    content.append(div_3);
}

