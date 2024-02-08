document.addEventListener("DOMContentLoaded", () => {
    const scoreDisplay = document.querySelector("#score")
    const startBtn = document.querySelector("#start-btn")

    const board = document.querySelector(".board")
    let cells = Array.from(document.querySelectorAll(".board div"))
    const GRID_WIDTH = 10

    const L = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
    ]

    const Z = [
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
    ]

    const T = [
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
    ]

    const O = [
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
    ]

    const I = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
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

    timer = setInterval(moveDown, 1000)
    function moveDown() {
        undraw()
        currentPosition += GRID_WIDTH
        draw()
        freeze()
    }

    function freeze() {
        if (currentFigure.some(index => cells[currentPosition + index + GRID_WIDTH].classList.contains('taken'))) {
            currentFigure.forEach(index => cells[currentPosition + index].classList.add('taken'))
            random = Math.floor(Math.random() * figures.length)
            currentFigure = figures[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }
});