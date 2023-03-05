const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.6

class Sprite {
    constructor({position, velocity, color = 'red', offset}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.color = color
        this.inAir = false
        this.attackBox = {
            position:{
                x: this.position.x,
                y: this.position.y
            } ,
            offset,
            width: 100,
            height: 50
        }
        this.isAttacking
        this.health = 100
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //attack box
        if(this.isAttacking){
            c.fillStyle = 'green'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    change() {
        this.draw()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

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
            this.velocity.y = -15
            this.inAir = true
        }
    }

    attack(delay = 500) {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, delay);
    }
}
const player1 = new Sprite({
    position: {
        x : 0,
        y : 0
    },
    offset: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue'
})

const player2 = new Sprite({
    position: {
        x : 400,
        y : 100
    },
    offset: {
        x: -50,
        y: 0
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
        case ' ' :
            player1.attack()
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
            player2.jump()
            break
        case 'ArrowDown' :
            player2.attack()
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

function collision({rectangle1, rectangle2}) {
    return ( rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}

let timer = 10
function decreaseTimer() {
    if(timer > 0) {
        setTimeout(decreaseTimer, 1000)
        timer --
        document.querySelector('#timer').innerHTML = timer
    }
}

decreaseTimer()

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

    //detect for collision
    if( collision({rectangle1: player1, rectangle2: player2}) && player1.isAttacking) {
            player1.isAttacking = false
            player2.health -= 20
            document.querySelector('#player2Health').style.width = player2.health + '%'
    }

    if( collision({rectangle1: player2, rectangle2: player1}) && player2.isAttacking) {
        player2.isAttacking = false
        player1.health -= 20
        document.querySelector('#player1Health').style.width = player1.health + '%'
}

}

animate()