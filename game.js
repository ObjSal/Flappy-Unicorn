// Author: Salvador Guerrero

'use strict'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const unicorn01 = document.getElementById('unicorn01')
const unicornOriginalWidth = 979
const unicornOriginalHeight = 810
const unicornHeight = 80
const unicornWidth = unicornOriginalWidth * (unicornHeight / unicornOriginalHeight)
let player = {
  pos: { x: 10, y: (canvas.height - unicornHeight) / 2 }
}

// Obstacles
const tubeWholeHeight = unicornHeight * 3
const tubeWidth = unicornWidth
const tubeGaps = tubeWidth * 3
const tubeWholeYPositionsCount = 20
const tubeWholeYPositions = []
const safeAreaHeight = canvas.height - unicornHeight - 40
const tubeWholeYPositionsHeight = safeAreaHeight / tubeWholeYPositionsCount
for (let i = 0; i < tubeWholeYPositionsCount; i++) {
  tubeWholeYPositions.push(20 + tubeWholeYPositionsHeight * i)
}

class Tube {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  draw() {
    context.fillStyle = "green"
    // Top tube
    context.fillRect(this.x, 0, tubeWidth, this.y)
    // Bottom Tube
    context.fillRect(this.x, this.y + tubeWholeHeight, tubeWidth, canvas.height)
  }

  update() {
    this.x -= 2
  }

  hitText(x, y, width, height) {
    // TBD
  }
}

let tubes = []
let firstTubeX = (canvas.width - tubeWidth) / 2
for (let i = 0; i < 1000; i++) {
  tubes.push(new Tube(firstTubeX + tubeGaps * i, tubeWholeYPositions[Math.round(Math.random() * (tubeWholeYPositions.length - 1))]))
  // firstTubeX += tubeGaps
}

function update() {
  context.fillStyle = "skyblue"
  context.fillRect(0, 0, canvas.width, canvas.height)

  unicorn01.addEventListener('load', e => {
    context.drawImage(unicorn01, player.pos.x, player.pos.y, unicornWidth, unicornHeight)
  })
  context.drawImage(unicorn01, player.pos.x, player.pos.y, unicornWidth, unicornHeight)

  for (const tube of tubes) {
    if (tube.x < canvas.width) {
      // draw only if within visible canvas
      tube.draw()
    }
    tube.update()
  }
}

window.onkeydown = function(event) {
  const step = 10
  if (event.key === 'ArrowUp') {
    player.pos.y -= step
  }
  if (event.key === 'ArrowDown') {
    player.pos.y += step
  }
}

setInterval(update, 33)