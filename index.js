const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player1.change()
    player2.change()
    
    player1.velocity.x = 0
    if(keys.a.pressed && lastKey === 'a') {
        player1.velocity.x = -1
    } else if(keys.d.pressed && lastKey === 'd') {
        player1.velocity.x = 1
    }

}

animate()