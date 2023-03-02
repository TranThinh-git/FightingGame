const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2

class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.inAir = false
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    change() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
            this.inAir = false
        }
        else {
            this.velocity.y += gravity
            this.inAir = true
        }
    }
    jump() {
        if(!this.inAir) {
            this.velocity.y = -10
            this.inAir = true
        }
    }
}
const player1 = new Sprite({
    position: {
        x : 0,
        y : 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const player2 = new Sprite({
    position: {
        x : 400,
        y : 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const keys = {
    a: {
        pressed : false
    },
    d: {
        pressed : false
    },
    ArrowRight: {
        pressed : false
    },
    ArrowLeft: {
        pressed : false
    }
}



window.addEventListener('keydown' , (event) => {
    switch (event.key) {
        //player 1 keys
        case 'd' :
            keys.d.pressed = true
            player1.lastKey = 'd'
            break
        case 'a' :
            keys.a.pressed = true
            player1.lastKey = 'a'
            break
        case 'w' :
            player1.jump()
            break

        //player 2 keys
        case 'ArrowRight' :
            keys.ArrowRight.pressed = true
            player2.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = true
            player2.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp' :
            player2.velocity.y = -10
            break
    }
})

window.addEventListener('keyup' , (event) => {
    switch (event.key) {
        case 'd' :
            keys.d.pressed = false
            break
        case 'a' :
            keys.a.pressed = false
            break

        case 'ArrowRight' :
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft' :
            keys.ArrowLeft.pressed = false
            break
    }
})

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player1.change()
    player2.change()
    
    player1.velocity.x = 0
    player2.velocity.x = 0
    //player 1 movements
    if(keys.a.pressed && player1.lastKey === 'a' && player1.position.x >= 0 ) {
        player1.velocity.x = -5
    } else if(keys.d.pressed && player1.lastKey === 'd' && player1.position.x + player1.width <= canvas.width) {
        player1.velocity.x = 5
    }

    //player 2 movements
    if(keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft' && player2.position.x >= 0 ) {
        player2.velocity.x = -5
    } else if(keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight' && player2.position.x + player2.width <= canvas.width ) {
        player2.velocity.x = 5
    }

}

animate()