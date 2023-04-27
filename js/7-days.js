let body = document.querySelector('body');

//appender('', '', '', '', '',);
//appender('что', 'куда', 'холдер', 'контент', 'класс', 'id');
//gen('сколько', что', 'куда', 'холдер', 'контент', 'класс', 'id');
appender('h1', '', '', 'Прогресс вашей жизни', 'h', 'zagolovok');
appender('section', '', '', '', 'main',);
appender('form', '', '', '', '',);
appender('h3', '', '', 'Введите дату своего рождения', 'h',);

gen(924, '', 'section', '', '', 'tile');

appender('input', 'form', 'год, 4 цифры', '', 'y', 'y');
appender('input', 'form', 'мес (1 - 12)', '', 'm', 'm');

function appender(it = 'div', paste_to = '', hold = '', content = '', css_class = '', id = '') {
    let item = '';
    if (it == '') { item = document.createElement('div'); } else {
        item = document.createElement(it);
    }

    if (hold != '') { item.setAttribute('placeholder', hold); }
    if (content != '') { item.innerHTML = content; }
    if (css_class != '') { item.setAttribute('class', css_class); }
    if (id != '') { item.setAttribute('id', id); }

    if (paste_to == '') { body.append(item); } else {
        let paste_to_place = document.querySelector(paste_to);
        paste_to_place.append(item);
    }
}

function gen(count = 2, it = 'div', paste_to = '', hold = '', content = '', css_class = '', id = '') {
    for (let i = 1; i < (count + 1); i++) {
        appender(it, paste_to, hold, content, css_class, i);
    }
}

function fill_tile(num) {
    let tile_to_fill = document.querySelectorAll('.tile');
    let red = 237;//246
    let green = 104;//148
    let blue = 62;//84

    for (all of tile_to_fill) {
        all.style.background = '#739f3d';
    }

    for (let i = 0; i < (num); i++) {
        if (i < 924) {
            tile_to_fill[i].style.background = `rgb(${red}, ${green}, ${blue})`;
            if (red < 255 && red < 247) red += 0.1;
            if (red > 242 && green < 149) green += 0.1;
            if (green > 130 && blue < 85) blue += 0.1;
        }
    }
}

let y = document.querySelector('#y');
let m = document.querySelector('#m');

let month_count = 0;
y.oninput = age; m.oninput = age;

function age() {
    if (isNaN(+y.value) || y.value.length > 4 || y.value.includes('.')) { y.value = ''; return }
    if (isNaN(+m.value) || +m.value > 12 || +m.value < 1 || m.value.includes('.')) { m.value = ''; return }
    if (y.value.length < 4) { return }

    let now = new Date;
    let user_year = +y.value;
    let user_month = +m.value;
    let old = new Date(user_year + '-' + user_month);
    let result = now - old;
    result = Math.round(result / 2627424000);
    console.log(result);

    fill_tile(result);
    document.querySelector('#zagolovok').innerHTML = `Прогресс вашей жизни ${result} месяцев`;
}













