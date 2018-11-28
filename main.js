var hex_map = {
    'red': '#e53935',
    'orange': '#fb8c00',
    'yellow': '#fbc02d',
    'green': '#43a047',
    'blue': '#039be5',
    'purple': '#5e35b1',
}

var colours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']

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
        pageSwitch('.one', '.two')
    })
  })