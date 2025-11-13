const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
context.scale(30, 30);

const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const linesElement = document.getElementById('lines');
const relaxButton = document.getElementById('relax-toggle');

const colors = [
    null,
    '#77a1f2', // I
    '#f7b267', // L
    '#f79d84', // J
    '#a0e7e5', // O
    '#b4f8c8', // S
    '#ffcef3', // Z
    '#d9abff', // T
];

const arena = createMatrix(10, 20);

const player = {
    pos: { x: 0, y: 0 },
    matrix: null,
    score: 0,
    level: 1,
    lines: 0,
};

let dropCounter = 0;
let dropIntervalBase = 1200;
let dropInterval = dropIntervalBase;
let lastTime = 0;
let relaxMode = true;

function arenaSweep() {
    outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
        player.lines += 1;
        player.score += 50 * player.level;

        if (player.lines % 10 === 0) {
            player.level += 1;
            updateDropInterval();
        }
    }
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(width, height) {
    const matrix = [];
    while (height--) {
        matrix.push(new Array(width).fill(0));
    }
    return matrix;
}

function createPiece(type) {
    switch (type) {
        case 'T':
            return [
                [0, 7, 0],
                [7, 7, 7],
                [0, 0, 0],
            ];
        case 'O':
            return [
                [4, 4],
                [4, 4],
            ];
        case 'L':
            return [
                [0, 2, 0],
                [0, 2, 0],
                [0, 2, 2],
            ];
        case 'J':
            return [
                [0, 3, 0],
                [0, 3, 0],
                [3, 3, 0],
            ];
        case 'I':
            return [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ];
        case 'S':
            return [
                [0, 5, 5],
                [5, 5, 0],
                [0, 0, 0],
            ];
        case 'Z':
            return [
                [6, 6, 0],
                [0, 6, 6],
                [0, 0, 0],
            ];
        default:
            return [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ];
    }
}

function draw() {
    context.fillStyle = 'rgba(255, 255, 255, 0.85)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);

                context.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                context.lineWidth = 0.05;
                context.strokeRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

function playerHardDrop() {
    while (!collide(arena, player)) {
        player.pos.y++;
    }
    player.pos.y--;
    merge(arena, player);
    playerReset();
    arenaSweep();
    updateScore();
    dropCounter = 0;
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function playerReset() {
    const pieces = 'TJLOSZI';
    const randomType = pieces[(pieces.length * Math.random()) | 0];
    player.matrix = createPiece(randomType);
    player.pos.y = 0;
    player.pos.x = ((arena[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);

    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        player.lines = 0;
        player.level = 1;
        updateDropInterval();
        updateScore();
    }
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}

function updateDropInterval() {
    const speedUp = relaxMode ? 0.85 : 0.75;
    dropIntervalBase = relaxMode ? 1200 : 800;
    dropInterval = Math.max(200, dropIntervalBase * Math.pow(speedUp, player.level - 1));
}

function updateScore() {
    scoreElement.innerText = player.score.toLocaleString('de-DE');
    levelElement.innerText = player.level.toString();
    linesElement.innerText = player.lines.toString();
}

relaxButton.addEventListener('click', () => {
    relaxMode = !relaxMode;
    relaxButton.textContent = relaxMode ? 'Relax-Modus: Aktiv' : 'Relax-Modus: Aus';
    updateDropInterval();
});

document.addEventListener('keydown', event => {
    switch (event.code) {
        case 'ArrowLeft':
            playerMove(-1);
            break;
        case 'ArrowRight':
            playerMove(1);
            break;
        case 'ArrowDown':
            playerDrop();
            break;
        case 'ArrowUp':
            playerRotate(1);
            break;
        case 'Space':
            event.preventDefault();
            playerHardDrop();
            break;
    }
});

playerReset();
updateScore();
updateDropInterval();
update();
