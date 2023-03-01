const gravity = 0.2

class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    change() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } 
        else this.velocity.y += gravity
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


