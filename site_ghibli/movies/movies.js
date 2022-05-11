var data;
var i = 0;

const app = document.getElementById('root');

const block_perspective = document.createElement('div');
block_perspective.setAttribute('class', 'perspective');

const container = document.createElement('div');
container.setAttribute('class', 'container');
container.setAttribute('onclick', 'rotate_card();');

const front = document.createElement('div');
front.setAttribute('class', 'card front');

const back = document.createElement('div');
back.setAttribute('class', 'card back');

/*
const right = document.createElement('div');
right.setAttribute('class', 'tranche_rl right');

const left = document.createElement('div');
left.setAttribute('class', 'tranche_rl left');

const topface = document.createElement('div');
topface.setAttribute('class', 'tranche_tb top');

const bottom = document.createElement('div');
bottom.setAttribute('class', 'tranche_tb bottom');
*/

const previous = document.createElement('div');
previous.setAttribute('id', 'previous');
previous.setAttribute('onclick', "previous_card();")

const next = document.createElement('div');
next.setAttribute('id', 'next');
next.setAttribute('onclick', "next_card();")

container.appendChild(front);
container.appendChild(back);
/*container.appendChild(right);
container.appendChild(left);
container.appendChild(topface);
container.appendChild(bottom);*/

block_perspective.appendChild(container);

app.appendChild(previous);
app.appendChild(next);
app.appendChild(block_perspective);

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

    var movies = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data = movies;
        init_card();
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }
}

request.send();

function init_card() {
    const h1 = document.createElement('h1');
    h1.textContent = data[i].title;

    const desc = document.createElement('p');
    desc.setAttribute('class', 'desc');
    data[i].description = data[i].description.substring(0, 500);
    desc.textContent = `${data[i].description}`;

    const romaji = document.createElement('p');
    romaji.textContent = `Original title : ${data[i].original_title_romanised}`;

    const director = document.createElement('p');
    director.textContent = `Director : ${data[i].director}`;

    const producer = document.createElement('p');
    producer.textContent = `Producer : ${data[i].producer}`;

    const date = document.createElement('p');
    date.textContent = `Release date : ${data[i].release_date}`;

    const img = document.createElement('img');
    img.setAttribute('class', 'picture');
    img.src = data[i].image;

    front.appendChild(img);
    back.appendChild(h1);
    back.appendChild(desc);
    back.appendChild(romaji);
    back.appendChild(director);
    back.appendChild(producer);
    back.appendChild(date);

}

function update_card() {
    const h1 = document.getElementsByTagName('h1')[0];
    h1.textContent = data[i].title;

    const romaji = document.getElementsByTagName('p')[1];
    romaji.textContent = `Original title : ${data[i].original_title_romanised}`;

    const desc = document.getElementsByClassName('desc')[0];
    data[i].description = data[i].description.substring(0, 500);
    desc.textContent = `${data[i].description}`;

    const director = document.getElementsByTagName('p')[2];
    director.textContent = `Director : ${data[i].director}`;

    const producer = document.getElementsByTagName('p')[3];
    producer.textContent = `Producer : ${data[i].producer}`;

    const date = document.getElementsByTagName('p')[4];
    date.textContent = `Release date : ${data[i].release_date}`;
    
    const img = document.getElementsByClassName('picture')[0];
    img.src = data[i].image;

}

function previous_card() {
    clearTimeout(timeout1);
    var time = 500;
    if (i > 0) {
        i--;
    } else {
        i = data.length-1;
    }
    if (container.style.transform === 'rotateY(180deg)') {
        time = 890;
    }
    backflip_card('previous');
    var timeout1 = setTimeout(() => {
        update_card();
    }, 500);
}

function next_card() {
    clearTimeout(timeout1);
    var time = 500;
    if (i < data.length-1) {
        i++;
    } else {
        i = 0;
    }
    if (container.style.transform === 'rotateY(180deg)') {
        time = 890;
    }
    backflip_card('next');
    var timeout1 = setTimeout(() => {
        update_card();
    }, time);
}


var rotation = 0;

function backflip_card(value) {
    disable_events(3000);
    var container = document.getElementsByClassName('container')[0];
    console.log(container.style.transform)

    if (value === 'next') {
        rotation += 360;
    } else {
        rotation -= 360;
    }
    container.style.transition = 'transform 3s';
    container.style.transform = `rotate3d(1,1,0,${rotation}deg)`;
    console.log(container.style.transform)

}

function rotate_card() {
    disable_events(2000);
    var container = document.getElementsByClassName('container')[0];
    rotation = 0;
    container.style.transition = 'transform 2s';
    if (container.style.transform === 'rotateY(180deg)') {
        container.style.transform = 'rotateY(0deg)';
    } else {
        container.style.transform = 'rotateY(180deg)';
    }
}

function disable_events(time) {
    clearTimeout(timeout);
    container.onclick = null;
    previous.onclick = null;
    next.onclick = null;
    var timeout = setTimeout(() => {
        container.onclick = () => {rotate_card();};
        previous.onclick = () => {previous_card();};
        next.onclick = () => {next_card();};
    }, time);
}