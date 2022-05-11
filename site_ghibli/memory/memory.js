var i = 0;
var nb_card = 12;
var score = 0;
var lives = 5;
var images = ['hamster_fly.png','kiki_cat.png','lil_totoro_clean.png','noface.png','soot.png', 'mononoke_spirit.png', 'mononoke_mask.png', 'tanuki.png', 'squirrel.png'];
const app = document.getElementById('root');

const block_perspective = document.createElement('div');
block_perspective.setAttribute('class', 'perspective');

const play = document.createElement('button');
play.setAttribute('class', 'play');
play.setAttribute('onclick', 'init_card();');
play.textContent = 'Play';

const block_life = document.createElement('div');
block_life.setAttribute('class', 'block_life');

const block_score = document.createElement('div');
block_score.setAttribute('class', 'score');
block_score.textContent = `Score : ${score}`;


for(var k = 1; k <= lives; k++) {
    const life = document.createElement('div');
    life.setAttribute('class', 'life');
    life.setAttribute('id', `life${k}`);

    block_life.appendChild(life);
}


for(var i = 1; i <= nb_card; i++) {
    const card = document.createElement('div');
    card.setAttribute('id', i);
    card.setAttribute('class', 'container');

    const front = document.createElement('div');
    front.setAttribute('class', 'card front');

    const back = document.createElement('div');
    back.setAttribute('class', 'card back');

    const logo = document.createElement('img');
    logo.setAttribute('class', 'picture_front');

    const memory_pic = document.createElement('img');
    memory_pic.setAttribute('class', 'picture_back');

    back.appendChild(memory_pic);
    front.appendChild(logo);
    card.appendChild(front);
    card.appendChild(back);
    block_perspective.appendChild(card);
}

app.appendChild(block_score);
app.appendChild(block_life);
app.appendChild(play);
app.appendChild(block_perspective);

function disappear(card) {
    var op = 1;
    var timer = setInterval(function () {
        if (op <= 0.05) {
            card.style.visibility = 'hidden';
            clearInterval(timer);
        }
        card.style.opacity = op;
        card.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
}

function lose_life(life) {
    var i = 1;
    var timer = setInterval(() => {
        clearTimeout(timeout);
        if (i >= 3) {
            clearInterval(timer);
        }
        life.style.visibility = 'visible';
        var timeout = setTimeout(() => {
            life.style.visibility = 'hidden';
        }, 70);
        i++;
    }, 210);
}

function random_nb(nb) {
    var tab_fin = [];
    var tab = [];
    while (tab.length < nb) {
        rand = Math.ceil(Math.random() * nb);
        if (!tab.includes(rand)) {
            tab.push(rand);
        }
    }
    for (var i = 1; i <= tab.length; i=i+2) {
        tab_fin.push(Array(tab[i-1],tab[i]));
    }
    return tab_fin;
}

function random_image(nb, tab) {
    var tab_fin = [];
    while (tab_fin.length < nb/2) {
        rand = Math.ceil(Math.random() * tab.length-1);
        if (!tab_fin.includes(tab[rand])) {
            tab_fin.push(tab[rand]);
        }
    }
    return tab_fin;
}

function rotate_card(value) {
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    clearTimeout(timeout3);
    var cards_clicked = [];
    var card = document.getElementById(value);
    card.style.transform = 'rotateY(180deg)';
    for (var k = 1; k <= nb_card; k++) {
        if (document.getElementById(k).style.transform === 'rotateY(180deg)') {
            if (document.getElementById(k).style.opacity >= 0.1) {
                cards_clicked.push(document.getElementById(k));
            }
        }
    }
    if (cards_clicked.length > 1) {
        var timeout1 = setTimeout(() => {
            disable_events();
        }, 50);
        var timeout2 = setTimeout(() => {
            verif_card(cards_clicked);
        }, 1200);
        var timeout3 = setTimeout(() => {
            enable_events();
        }, 2000);
    }
}

function verif_card(cards) {
    clearTimeout(timeout);
    if (cards[0].getElementsByClassName('back')[0].style.backgroundImage === cards[1].getElementsByClassName('back')[0].style.backgroundImage) {
        disappear(cards[0]);
        disappear(cards[1]);
        score++;
        block_score.textContent = `Score : ${score}`;
    } else {
        cards[0].style.transform = 'rotateY(0deg)';
        cards[1].style.transform = 'rotateY(0deg)';
        lose_life(document.getElementById(`life${lives}`));
        lives--;
    }
    if (lives < 1) {
        var timeout = setTimeout(() => {
            alert('game over');
            reset();
        }, 500);
    }
    if (score >= nb_card/2) {
        var timeout = setTimeout(() => {
            alert('you won');
            reset();
        }, 500);
    }
}

function enable_events() {
    for (var k = 1; k <= nb_card; k++) {
        var card = document.getElementById(k);
        card.setAttribute('onclick', `rotate_card(${k});`);
    }
}

function disable_events() {
    for (var k = 1; k <= nb_card; k++) {
        var card = document.getElementById(k);
        card.onclick = null;
    }
}

function reset() {
    var button = document.getElementsByClassName('play')[0];
    button.textContent = 'Play';
    button.setAttribute('onclick', 'init_card();');
    init_style();
}

function init_style() {
    for (var k = 1; k <= nb_card; k++) {
        var card = document.getElementById(k);
        card.style.transition = 'transform 0s';
        card.style.transform = 'rotateY(0deg)';
    }
}

function init_card() {
    score = 0;
    lives = 5;
    var button = document.getElementsByClassName('play')[0];
    button.textContent = 'In game...';
    button.onclick = null;
    var tab_num_card = random_nb(nb_card);
    var tab_image = random_image(nb_card, images);
    block_score.textContent = `Score : ${score}`;
    for (var j = 1; j <= lives; j++) {
        document.getElementById(`life${j}`).style.visibility = 'visible';
    }
    for (var j = 0; j < tab_num_card.length; j++) {
        var card1 = document.getElementById(tab_num_card[j][0]);
        var card2 = document.getElementById(tab_num_card[j][1]);
        card1.style.opacity = 1;
        card2.style.opacity = 1;
        card1.style.visibility = 'visible';
        card2.style.visibility = 'visible';
        card1.style.transition = 'transform 1s';
        card2.style.transition = 'transform 1s';
        card1.setAttribute('onclick', `rotate_card(${tab_num_card[j][0]});`);
        card2.setAttribute('onclick', `rotate_card(${tab_num_card[j][1]});`);
        card1.getElementsByClassName('back')[0].style.backgroundImage = `url(../pictures/memory/${tab_image[j]})`;
        card2.getElementsByClassName('back')[0].style.backgroundImage = `url(../pictures/memory/${tab_image[j]})`;
    }
}

