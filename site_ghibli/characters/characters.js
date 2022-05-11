var data;
var i = 0;

const app = document.getElementById('root');

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/people', true);
request.onload = function () {

    var movies = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data = movies;
        build();
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }
}

request.send();

function build() {

    const block_perspective = document.createElement('div');
    block_perspective.setAttribute('class', 'perspective');
    
    for (var j = 1; j <= 3; j++) {
        const character = document.createElement('div');
        character.setAttribute('class', 'container');
        
        const front = document.createElement('div');
        front.setAttribute('class', 'card front');
        
        const back = document.createElement('div');
        back.setAttribute('class', 'card back');
    
        init_card(front);
    
        character.appendChild(front);
        character.appendChild(back);
        block_perspective.appendChild(character);
        i++;
    }
    
    const previous = document.createElement('div');
    previous.setAttribute('id', 'previous');
    previous.setAttribute('onclick', "previous_card();")
    
    const next = document.createElement('div');
    next.setAttribute('id', 'next');
    next.setAttribute('onclick', "next_card();")
    
    app.appendChild(previous);
    app.appendChild(next);
    app.appendChild(block_perspective);
}


function init_card(face) {
    const h1 = document.createElement('h1');
    h1.textContent = data[i].name;

    const gender = document.createElement('p');
    gender.textContent = `Gender : ${data[i].gender}`;

    const age = document.createElement('p');
    age.textContent = `Age : ${data[i].age}`;

    const text = document.createElement('p');
    text.textContent = 'blablablablabla...'

    if (data[i].gender ===  'Female') {
        face.style.backgroundColor = 'rgb(244, 224, 255)';
    } else {
        face.style.backgroundColor = 'rgb(224, 241, 255';
    }

    face.appendChild(h1);
    face.appendChild(gender);
    face.appendChild(age);
}

function update_card(face) {
    if (data[i].gender ===  'Female') {
        face.style.backgroundColor = 'rgb(244, 224, 255)';
    } else {
        face.style.backgroundColor = 'rgb(224, 241, 255';
    }
    const h1 = face.getElementsByTagName('h1')[0];
    h1.textContent = data[i].name;

    const gender = face.getElementsByTagName('p')[0];
    gender.textContent = `Gender : ${data[i].gender}`;

    const age = face.getElementsByTagName('p')[1];
    age.textContent = `Age : ${data[i].age}`;

    /*const film = face.getElementsByTagName('p')[2];
    film.textContent = `Film : ${data[i].films}`;*/
}

function previous_card() {
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    if (i > 0) {
        i--;
    } else {
        i = data.length-1;
    }
    var delais = 0;
    for (var j = 2; j >= 0; j--) {
        var timeout1 = setTimeout(() => {
            rotate_card_previous(j);
            delais+=500;
        }, delais);
        var timeout2 = setTimeout(() => {
            update_card(document.getElementsByClassName('front')[j]);
            i++;
        }, 2500);
    }
}

function next_card() {
    if (i < data.length-1) {
        i++;
    } else {
        i = 0;
    }
    var delais = 10;
    /*while (j < 3) {
        console.log('oui');
        var timeout1 = setTimeout(() => {
            rotate_card_next(j);
            delais+=500;
        }, delais);
        var timeout2 = setTimeout(() => {
            update_card(document.getElementsByClassName('front')[j]);
            i++;
            j++;
        }, 2500);
    }*/

    var j = 0;
    rotation += 360;
    var timer = setInterval(() => {
        //clearTimeout(timeout);
        console.log(j);
        clearTimeout(timeout2);
        if (j >= 2) {
            clearInterval(timer);
        }
        rotate_card_next(j);
        var timeout2 = setTimeout(() => {
            update_card(document.getElementsByClassName('front')[j]);
            i++;
            j++;
            delais+=100;
        }, 500);
        i++;
    }, delais);
}


var rotation = 0;
function rotate_card_next(key) {
    var container = document.getElementsByClassName('container')[key];
    
    container.style.transform = 'rotate3d(1,1,0,' + rotation + 'deg)';
}

function rotate_card_previous(key) {
    var container = document.getElementsByClassName('container')[key];
    rotation -= 360;
    container.style.transform = 'rotate3d(1,1,0,' + rotation + 'deg)';
}
