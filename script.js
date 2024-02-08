document.addEventListener("DOMContentLoaded", () => {
    const scoreDisplay = document.querySelector("#score")
    const startBtn = document.querySelector("#start-btn")

    const board = document.querySelector(".board")
    let cells = Array.from(document.querySelectorAll(".board div"))
    const GRID_WIDTH = 10

    const displayCells = document.querySelectorAll(".mini-board div")
    const DISPLAY_WIDTH = 4
    let displayIndex = 0
    let nextRandom = 0

    const DROP_INTERVAL = 1000
    let timer 

    let score = 0

    const L = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2],
    ]

    const Z = [
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    ]

    const T = [
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    ]

    const O = [
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    ]

    const I = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    ]

    const figures = [L, Z, T, O, I]

    let currentPosition = 4
    let currentRotation = 0

    let random = Math.floor(Math.random() * figures.length)
    let currentFigure = figures[random][currentRotation]

    function draw() {
        currentFigure.forEach(index => {
            cells[currentPosition + index].classList.add('figure')
        })
    }

    function undraw() {
        currentFigure.forEach(index => {
            cells[currentPosition + index].classList.remove('figure')
        })
    }

    function control(e) {
        if (e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }

    document.addEventListener("keyup", control)

    function moveDown() {
        undraw()
        currentPosition += GRID_WIDTH
        draw()
        freeze()
    }

    function moveLeft() {
        undraw()
        const isAtLeftEdge = currentFigure.some(index => (currentPosition + index) % GRID_WIDTH === 0)

        if (!isAtLeftEdge) {
            currentPosition -= 1
        }

        if (currentFigure.some(index => cells[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1
        }

        draw()
    }

    function moveRight() {
        undraw()
        const isAtRightEdge = currentFigure.some(index => (currentPosition + index) % GRID_WIDTH === GRID_WIDTH - 1)

        if (!isAtRightEdge) {
            currentPosition += 1
        }

        if (currentFigure.some(index => cells[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }

        draw()
    }

    function rotate() {
        undraw()
        currentRotation++

        if (currentRotation === currentFigure.length) {
            currentRotation = 0
        }

        currentFigure = figures[random][currentRotation]
        draw()
    }

    function freeze() {
        if (currentFigure.some(index => cells[currentPosition + index + GRID_WIDTH].classList.contains('taken'))) {
            currentFigure.forEach(index => cells[currentPosition + index].classList.add('taken'))
            random = nextRandom
            nextRandom = Math.floor(Math.random() * figures.length)
            currentFigure = figures[random][currentRotation]
            currentPosition = 4
            draw()
            displayFigure()
            addScore()
            gameOver()
        }
    }

    const nextFigures = [
        [1, DISPLAY_WIDTH + 1, DISPLAY_WIDTH * 2 + 1, 2],
        [0, DISPLAY_WIDTH, DISPLAY_WIDTH + 1, DISPLAY_WIDTH * 2 + 1],
        [1, DISPLAY_WIDTH, DISPLAY_WIDTH + 1, DISPLAY_WIDTH + 2],
        [0, 1, DISPLAY_WIDTH, DISPLAY_WIDTH + 1],
        [1, DISPLAY_WIDTH + 1, DISPLAY_WIDTH * 2 + 1, DISPLAY_WIDTH * 3 + 1],
    ]

    function displayFigure() {
        displayCells.forEach(cell => {
            cell.classList.remove("figure")
        })
        nextFigures[nextRandom].forEach(index => {
            displayCells[displayIndex + index].classList.add("figure")
        })
    }

    function addScore() {
        for (let i = 0; i < 199; i += GRID_WIDTH) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]

            if (row.every(index => cells[index].classList.contains("taken"))) {
                console.log("score")
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    cells[index].classList.remove("taken")
                    cells[index].classList.remove("figure")
                })
                const cellsRemoved = cells.splice(i, GRID_WIDTH)
                cells = cellsRemoved.concat(cells)
                cells.forEach(cell => board.appendChild(cell))
            }
        }
    }

    function gameOver() {
        if (currentFigure.some(index => cells[currentPosition + index].classList.contains("taken"))) {
            scoreDisplay.innerHTML += " - GAME OVER"
            clearInterval(timer)
        }
    }

    startBtn.addEventListener("click", () => {
        if (timer) {
            clearInterval(timer);
            timer = null
        } else {
            draw()
            timer = setInterval(moveDown, DROP_INTERVAL)
            nextRandom = Math.floor(Math.random() * figures.length)
            displayFigure()
        }
    })
});