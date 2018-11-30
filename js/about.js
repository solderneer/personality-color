var hex_map = {
    'red-purple': '#b63860',
    'red': '#e53935',
    'red-orange': '#ec5225',
    'orange': '#fb8c00',
    'yellow-orange': '#fba314',
    'yellow': '#fbc02d',
    'yellow-green': '#a8b239',
    'green': '#43a047',
    'blue-green': '#239e96',
    'blue': '#039be5',
    'blue-purple': '#3563c8',
    'purple': '#5e35b1',
}

var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
var current_color = 0;

var touchstartX = 0;
var touchendX = 0;

function mod(n, m) {
    return ((n % m) + m) % m;
  }

function pageSwitchRight(selector1, selector2) {
    anime({
        targets: selector1,
        left: [
            { value: '50%', duration: 0 },
            { value: '30%', duration: 1000 }
        ],
        opacity: 0,
        duration: 1000,
        elasticity: 0,
        loop: false,
        begin: function (anim) {
            document.querySelector('#right').removeEventListener('click', rightPage)
            document.querySelector('#left').removeEventListener('click', leftPage)
        },
        complete: function (anim) {
            document.querySelector(selector1).style.display = 'none'
        },
    });

    anime({
        targets: selector2,
        left: [
            { value: '70%', duration: 0 },
            { value: '50%', duration: 1000 }
        ],
        opacity: 1,
        duration: 1000,
        elasticity: 0,
        loop: false,
        begin: function (anim) {
            document.querySelector(selector2).style.display = 'flex'
            document.querySelector(selector2).style.opacity = 0
        },
        complete: function (anim) {
            document.querySelector('#right').addEventListener('click', rightPage)
            document.querySelector('#left').addEventListener('click', leftPage)
        }
    });
}

function pageSwitchLeft(selector1, selector2) {
    anime({
        targets: selector1,
        left: [
            { value: '50%', duration: 0 },
            { value: '70%', duration: 1000 }
        ],
        opacity: 0,
        duration: 1000,
        elasticity: 0,
        loop: false,
        begin: function (anim) {
            document.querySelector('#right').removeEventListener('click', rightPage)
            document.querySelector('#left').removeEventListener('click', leftPage)
        },
        complete: function (anim) {
            document.querySelector(selector1).style.display = 'none'
        },
    });

    anime({
        targets: selector2,
        left: [
            { value: '30%', duration: 0 },
            { value: '50%', duration: 1000 }
        ],
        opacity: 1,
        duration: 1000,
        elasticity: 0,
        loop: false,
        begin: function (anim) {
            document.querySelector(selector2).style.display = 'flex'
            document.querySelector(selector2).style.opacity = 0
        },
        complete: function (anim) {
            document.querySelector('#right').addEventListener('click', rightPage)
            document.querySelector('#left').addEventListener('click', leftPage)
        }
    });
}

function rightPage() {
    var nextcolor = mod((current_color + 1), 6)
    pageSwitchRight('.'+colors[current_color], '.'+colors[nextcolor])
    document.querySelector('body').style.background = hex_map[colors[nextcolor]]
    current_color = nextcolor
}

function leftPage() {
    var nextcolor = mod((current_color - 1), 6)
    pageSwitchLeft('.'+colors[current_color], '.'+colors[nextcolor])
    document.querySelector('body').style.background = hex_map[colors[nextcolor]]
    current_color = nextcolor
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector('#right').addEventListener('click', rightPage)
    document.querySelector('#left').addEventListener('click', leftPage)
})