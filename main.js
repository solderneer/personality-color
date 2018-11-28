var hex_map = {
    'red': '#e53935',
    'orange': '#fb8c00',
    'yellow': '#fbc02d',
    'green': '#43a047',
    'blue': '#039be5',
    'purple': '#5e35b1',
}

var colours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']

var questions_matrix = [
    ['red q1', 'red q2', 'red q3'],
    ['orange q1', 'orange q2', 'orange q3'],
    ['yellow q1', 'yellow q2', 'yellow q3'],
    ['green q1', 'green q2', 'green q3'],
    ['blue q1', 'blue q2', 'blue q3'],
    ['purple q1', 'purple q2', 'purple q3'],
]

// ---------------------- STATE ---------------------------------------- //
var page = '.one'
var lastpage = '.two'
var currentlevel = 0
var currentcolor = 0 // In terms of colours list index

var points_map = {
    'red': 0,
    'orange': 0,
    'yellow': 0,
    'green': 0,
    'blue': 0,
    'purple': 0,
}

var shortlist = [] // Shortlisted colours

// -------------------- UTILITIES --------------------- //
function pageSwitch(selector1, selector2) {
     anime({
        targets: selector1,
        left: [
            { value: '50%', duration: 0 },
            { value: '20%', duration: 2000 }
        ],
        opacity: 0,
        duration: 2000,
        elasticity: 0,
        loop: false,
        complete: function(anim) {
            document.querySelector(selector1).style.display = 'none'
        },
      });

      anime({
        targets: selector2,
        left: [
            { value: '100%', duration: 0 },
            { value: '50%', duration: 2000 }
        ],
        opacity: 1,
        duration: 2000,
        elasticity: 0,
        loop: false,
        begin: function(anim) {
            document.querySelector(selector2).style.display = 'flex'
            document.querySelector(selector2).style.opacity = 0
        }
      });
}

function nextQuestion(question) {
    if(page === '.one') {
        lastpage = page
        page = '.two'
        document.querySelector('#q2').innerText = question
    } else if(page === '.two') {
        lastpage = page
        page = '.one'
        document.querySelector('#q1').innerText = question
    }

    pageSwitch(page, lastpage)
}

function gameStep(isTrue) {
   
}
// ----------------------------------------------------- MAIN CODE ------------------------------------------------- //
document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector('body').style.background = hex_map[colours[0]]
    document.querySelector('#start').style.color = hex_map[colours[0]]

    // Triggers the animated background
    var cnt = 1
    var colorswitch = setInterval(function() {
        console.log("DOM fully loaded and parsed");
        document.querySelector('body').style.background = hex_map[colours[cnt]]
        document.querySelector('#start').style.color = hex_map[colours[cnt]]
        cnt = (cnt + 1) % 6
    }, 5000)

    document.querySelector('#start').addEventListener('click', function() {
        clearInterval(colorswitch)
        // Start actual game phase
        pageSwitch('.main', '.question.one')
    })
  })