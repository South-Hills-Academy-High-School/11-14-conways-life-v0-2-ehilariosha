namespace SpriteKind {
    export const cursor = SpriteKind.create()
    export const newCursor = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorGridRow += -1
    cursorY += -10
    drawGrid()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    grid[cursorGridRow][cursorGridCol] = grid[cursorGridRow][cursorGridCol] * -1 + 1
    drawGrid()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorGridCol += -1
    cursorX += -10
    drawGrid()
})
function countNeighbors2 (currentRow: number, currentCol: number) {
    neighborCount = 0
    neighborCount += grid[currentRow - 1][currentCol - 1]
    neighborCount += grid[currentRow - 1][currentCol - 0]
    neighborCount += grid[currentRow - 1][currentCol + 1]
}
function copyBottom () {
    return grid[11]
}
function copyRight (whichRowR: number) {
    return grid[whichRowR][15]
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorGridCol += 1
    cursorX += 10
    drawGrid()
})
function drawGrid () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    gridSprites = []
    currentY = 0
    for (let row of grid) {
        currentX = 0
        for (let gridSpace of row) {
            if (gridSpace == 1) {
                gridSprite = sprites.create(img`
                    f f f f f f f f f f 
                    f c c c 3 3 c c c f 
                    f c a b 7 7 b a c f 
                    f c b a b 7 a b c f 
                    f 3 7 b a b 7 7 3 f 
                    f 3 7 7 b a b 7 3 f 
                    f c b a 7 b a b c f 
                    f c a b 7 7 b a c f 
                    f c c c 3 3 c c c f 
                    f f f f f f f f f f 
                    `, SpriteKind.Player)
                gridSprite.left = currentX
                gridSprite.top = currentY
                gridSprites.push(gridSprite)
            }
            currentX += 10
        }
        currentY += 10
    }
    cursor.left = cursorX
    cursor.top = cursorY
    neighborCountSprite.left = cursorX
    neighborCountSprite.top = cursorY
    neighborCountSprite.setText(convertToText(countNeighbors(cursorGridCol, cursorGridRow)))
}
function countNeighborsWrapTop (currentRow: number, currentCol: number) {
    neighborCount += grid[0 - 0][currentCol + 1]
    neighborCount += grid[currentRow + 1][currentCol + 1]
    neighborCount += grid[currentRow + 1][currentCol + 0]
    neighborCount += grid[currentRow + 1][currentCol - 1]
    neighborCount += grid[currentRow + 0][currentRow - 1]
    return neighborCount
}
function countNeighbors (currentRow: number, currentCol: number) {
    neighborCount = 0
    neighborCount += grid[currentRow - 1][currentCol - 1]
    neighborCount += grid[currentRow - 1][currentCol - 0]
    neighborCount += grid[currentRow - 1][currentCol + 1]
    neighborCount += grid[currentRow - 0][currentCol + 1]
    neighborCount += grid[currentRow + 1][currentCol + 1]
    neighborCount += grid[currentRow + 1][currentCol + 0]
    neighborCount += grid[currentRow + 1][currentCol - 1]
    neighborCount += grid[currentRow + 0][currentCol - 1]
    return neighborCount
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorGridRow += 1
    cursorY += 10
    drawGrid()
})
function copyLeft (whichRowL: number) {
    return grid[whichRowL][0]
}
function copyTop () {
    return grid[0]
}
let gridSprite: Sprite = null
let currentX = 0
let currentY = 0
let gridSprites: Sprite[] = []
let neighborCount = 0
let neighborCountSprite: TextSprite = null
let cursorY = 0
let cursorX = 0
let cursorGridRow = 0
let cursorGridCol = 0
let cursor: Sprite = null
let grid: number[][] = []
grid = []
for (let row = 0; row <= 11; row++) {
    grid.push([])
    for (let column = 0; column <= 15; column++) {
        grid[row].push(0)
    }
}
cursor = sprites.create(img`
    3 3 3 3 . . 3 3 3 3 
    3 . . . . . . . . 3 
    3 . . . . . . . . 3 
    3 . . . . . . . . 3 
    . . . . . . . . . . 
    . . . . . . . . . . 
    3 . . . . . . . . 3 
    3 . . . . . . . . 3 
    3 . . . . . . . . 3 
    3 3 3 3 . . 3 3 3 3 
    `, SpriteKind.newCursor)
cursorGridCol = 7
cursorGridRow = 5
cursorX = 70
cursorY = 50
cursor.z = 10
neighborCountSprite = textsprite.create("")
neighborCountSprite.z = 10
drawGrid()
