var lastKey

const keys = {
    a: {
        pressed : false
    },
    d: {
        pressed : false
    }
}


window.addEventListener('keydown' , (event) => {
    switch (event.key) {
        case 'd' :
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'a' :
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'w' :
            player1.velocity.y = -10
            break
    }
    // console.log(event.key)
})

window.addEventListener('keyup' , (event) => {
    switch (event.key) {
        case 'd' :
            keys.d.pressed = false
            break
        case 'a' :
            keys.a.pressed = false
            break
    }
    // console.log(event.key)
})