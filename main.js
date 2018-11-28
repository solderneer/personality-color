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
    ['Are you ambitious?', 'Do you think you are aggressive?', 'Are you proud of yourself?'],
    ['Do you consider yourself chaotic?', 'Do you think you are extra?', 'Are you unpredictable?'],
    ['Are you optimistic?', 'Do you think you are loud?', 'Do people tell you you are annoying?'],
    ['Do you think that life sucks sometimes?', 'Are you often taking challenges?', 'Would you do anything to get what you want?'],
    ['Are you focused on what you want?', 'Do you zone people out often?', 'Are you patient for rewards?'],
    ['Are you content with your life now?', 'Do you take what you get?', 'Would you do anything for someone you care about?'],
]

// ---------------------- STATE ---------------------------------------- //
var page = '.one'
var lastpage = '.two'
var currentquestion = 0
var currentcolor = 0 // In terms of colours list index

var points_map = {
    'red': 0,
    'orange': 0,
    'yellow': 0,
    'green': 0,
    'blue': 0,
    'purple': 0,
}

// -------------------- UTILITIES --------------------- //
function pageSwitch(selector1, selector2) {
     anime({
        targets: selector1,
        left: [
            { value: '50%', duration: 0 },
            { value: '30%', duration: 1000 }
        ],
        opacity: 0,
        duration: 500,
        elasticity: 0,
        loop: false,
        complete: function(anim) {
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
        duration: 500,
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
        console.log('hi page 2')
    } else if(page === '.two') {
        lastpage = page
        page = '.one'
        document.querySelector('#q1').innerText = question
        console.log('hi page 1')
    }

    pageSwitch(lastpage, page)
}

// Should have a better gamestep which is random
function gameStep(isTrue) {
    points_map[colours[currentcolor]] += isTrue // Add the point

    if(currentcolor < 5) {
        currentcolor++
    } else {
        currentcolor = 0

        if(currentquestion < 3) {
            currentquestion++
        } else {
            endGame()
        }
    }
    console.log(points_map)
}

function endGame() {
    var sum = 0
    var pt_sum = 0
    for(var i = 0; i < colours.length; i++) {
        sum += (i+1) * (points_map[colours[i]])
        pt_sum += points_map[colours[i]]
    }

    return (sum/pt_sum)
}
// ----------------------------------------------------- MAIN CODE ------------------------------------------------- //
document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector('body').style.background = hex_map[colours[0]]
    document.querySelector('#start').style.color = hex_map[colours[0]]

    // Triggers the animated background
    var cnt = 1
    var colorswitch = setInterval(function() {
        document.querySelector('body').style.background = hex_map[colours[cnt]]
        document.querySelectorAll('.back')[0].style.color = hex_map[colours[cnt]]
        cnt = (cnt + 1) % 6
    }, 3000)

    document.querySelector('#start').addEventListener('click', function() {
        document.querySelector('#q1').innerText = questions_matrix[currentcolor][currentquestion]
        pageSwitch('.main', '.question.one')
    })

    document.querySelector('.yes.one').addEventListener('click', function() {
        gameStep(1)
        nextQuestion(questions_matrix[currentcolor][currentquestion])
    })

    document.querySelector('.yes.two').addEventListener('click', function() {
        gameStep(1)
        nextQuestion(questions_matrix[currentcolor][currentquestion])
    })

    document.querySelector('.no.one').addEventListener('click', function() {
        gameStep(0)
        nextQuestion(questions_matrix[currentcolor][currentquestion])
    })

    document.querySelector('.no.two').addEventListener('click', function() {
        gameStep(0)
        nextQuestion(questions_matrix[currentcolor][currentquestion])
    })

  })