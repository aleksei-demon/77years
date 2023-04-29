let body = document.querySelector('body');

//appender('что', 'куда', 'холдер', 'контент', 'класс', 'id');
//adaptive('кому', 'vh', 'vw', portr_h, portr_w);
appender('h1', '', '', 'Прогресс вашей жизни', 'h', 'zagolovok');
appender('div', '', '', '', 'main',);
appender('form', '', '', '', '',);
appender('p', '', '', 'Введите дату своего рождения, или начала какого-либо дела', 'h',);

appender('canvas', 'div.main', '', '', 'canvas', 'canvas');
adaptive('#canvas', '65', '50', '70', '90');

appender('input', 'form', 'год, 4 цифры', '', 'y', 'y');
appender('input', 'form', 'мес (1 - 12)', '', 'm', 'm');

let y = document.querySelector('#y');
let m = document.querySelector('#m');
y.oninput = age; m.oninput = age;

function adaptive(to_whom, vh, vw, portr_h, portr_w) {
    let elem = document.querySelector(to_whom);
    let doc_width = document.documentElement.clientWidth;
    let doc_height = document.documentElement.clientHeight;

    if (doc_width > doc_height) {
        let set_w = Math.round((doc_width / 100) * vw); //(val / 10) * 10;
        let set_h = Math.round((doc_height / 100) * vh);
        elem.setAttribute('width', set_w);
        elem.setAttribute('height', set_h);
    } else {
        let set_w = Math.round((doc_width / 100) * portr_w); //(val / 10) * 10;
        let set_h = Math.round((doc_height / 100) * portr_h);
        elem.setAttribute('width', set_w);
        elem.setAttribute('height', set_h);
    }
}

function appender(it = 'div', paste_to = '', hold = '', content = '', css_class = '', id = '') {
    let item = '';
    if (it == '') { item = document.createElement('div'); } else {
        item = document.createElement(it);
    }
    if (it == 'input') { item.setAttribute('inputmode', 'numeric'); }
    if (hold != '') { item.setAttribute('placeholder', hold); }
    if (content != '') { item.innerHTML = content; }
    if (css_class != '') { item.setAttribute('class', css_class); }
    if (id != '') { item.setAttribute('id', id); }

    if (paste_to == '') { body.append(item); } else {
        let paste_to_place = document.querySelector(paste_to);
        paste_to_place.append(item);
    }
}

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

    to_draw();
    to_draw(result);
    to_say(result);
}

function to_say(result) {
    if (typeof result == "undefined") { return; }
    zagolovok = document.querySelector('#zagolovok');
    let resultStr = String(result);
    let penultimateSign = resultStr[resultStr.length - 2];

    if ((result % 10) == 5 || (result % 10) == 6 || (result % 10) == 7 ||
        (result % 10) == 8 || (result % 10) == 9 || penultimateSign == 1) {
        zagolovok.innerHTML = `Прогресс вашей жизни ${result} месяцев`;
    } else if ((result % 10) == 4 || (result % 10) == 3 || (result % 10) == 2 ||
        result == 2 || result == 3 || result == 4) {
        zagolovok.innerHTML = `Прогресс вашей жизни ${result} месяца`;
    } else if (result == 1 || (result % 10) == 1) {
        zagolovok.innerHTML = `Прогресс вашей жизни ${result} месяц`;
    } else { zagolovok.innerHTML = `Прогресс вашей жизни ${result} месяцев`; }
}

function to_draw(result = 0) {
    let red = 237;//246
    let green = 104;//148
    let blue = 62;//84
    let canvas = document.querySelector('#canvas');
    let tile_h = Math.round((canvas.getAttribute('height')) / 31) - 1;
    let tile_w = Math.round((canvas.getAttribute('width')) / 31) - 1;
    let ctx;
    if (canvas.getContext) { ctx = canvas.getContext('2d'); } else { console.log('canvas err') }

    ctx.fillStyle = "rgb(115,159,61)";

    let from_top = 0;
    let count = 0;
    for (let i = 0; i < 31; i++) { // РЯДЫ 
        let from_left = 0;
        for (let k = 0; k < 30; k++) { // stroka
            count++;
            if (result > 0) {
                ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
                if (red < 255 && red < 247) red += 0.1;
                if (red > 242 && green < 149) green += 0.1;
                if (green > 130 && blue < 85) blue += 0.1;
            }
            if (k != 0) { from_left = from_left + tile_w + 1; }
            ctx.fillRect(from_left, from_top, tile_w, tile_h);
            if (result > 0 && count == result) { return; break; }
            if (count == 924) { break; }
        }
        from_top = from_top + tile_h + 1;
    }
}

to_draw();

//---  dynamic adaptive  -------

let a, b;
let c = true;

let timerId = setTimeout(function tick() {
    if (c) {
        a = document.documentElement.clientWidth;
    } else { b = document.documentElement.clientWidth; }
    c = !c;
    timerId = setTimeout(tick, 999);
    if (a != b) {
        adaptive('#canvas', '65', '50', '70', '90');
        to_draw();
        age();
    };
}, 999);

