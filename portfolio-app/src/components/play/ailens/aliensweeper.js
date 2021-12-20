// ADAPTED FROM
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E
//Assets

import Market_Deco from './assets/Market_Deco.ttf';
const ailen_flag = require('./assets/ailen_flag.png')
const alive1 = require('./assets/alive1.png')
const alive2 = require('./assets/alive2.png')
const alien1 = require('./assets/ailen1.png')
const alien2 = require('./assets/ailen2.png')
const alien3 = require('./assets/ailen3.png')
const alien4 = require('./assets/ailen4.png')
const alien5 = require('./assets/ailen5.png')
const alien6 = require('./assets/ailen6.png')
const alien7 = require('./assets/ailen7.png')
const alien8 = require('./assets/ailen8.png')
const vida1 = require('./assets/vida1.png')
const vida2 = require('./assets/vida2.png')
const vida3 = require('./assets/vida3.png')
const death1 = require('./assets/death1.png')
const death2 = require('./assets/death2.png')
const death3 = require('./assets/death3.png')

let AILENS_IMG = [];
let AILENS_IMG_GAMEBAR;
let LIVES_IMG = [];
let ALIVE_IMG = [];
let DEATH_IMG = [];
let FLAG_IMG_GAMEBAR;
let FLAG_IMG;
let MARKET_DECO_FONT;
let first_load = true;

//Dom
let width;
let height;
document.oncontextmenu = function() { return false; }

//Ailensweeper
let lives = 1;
let grid;
let cols;
let rows;
let offset;
let w;

//State
let totalAilens;
let progress = 0;
let numFlagged = 0;
let gamebar;
let flagMode = false;

//Game animations
let board;

export const sketch = (s) => {

    s.preload = () => {
        AILENS_IMG.push(s.loadImage(alien1))
        AILENS_IMG.push(s.loadImage(alien2))
        AILENS_IMG.push(s.loadImage(alien3))
        AILENS_IMG.push(s.loadImage(alien4))
        AILENS_IMG.push(s.loadImage(alien5))
        AILENS_IMG.push(s.loadImage(alien6))
        AILENS_IMG.push(s.loadImage(alien7))
        AILENS_IMG.push(s.loadImage(alien8))
        ALIVE_IMG.push(s.loadImage(alive1))
        ALIVE_IMG.push(s.loadImage(alive2))
        LIVES_IMG.push(s.loadImage(vida1))
        LIVES_IMG.push(s.loadImage(vida2))
        LIVES_IMG.push(s.loadImage(vida3))
        DEATH_IMG.push(s.loadImage(death1))
        DEATH_IMG.push(s.loadImage(death2))
        DEATH_IMG.push(s.loadImage(death3))
        FLAG_IMG = s.loadImage(ailen_flag)
        FLAG_IMG_GAMEBAR = s.loadImage(ailen_flag)
        AILENS_IMG_GAMEBAR = s.loadImage(alien8)
        MARKET_DECO_FONT = s.loadFont(Market_Deco, font => {});
    }

    s.setup = () => {

        width = document.getElementById("viewport").clientWidth;
        height = document.getElementById("viewport").clientHeight;
        let canvas = s.createCanvas(width, height);
        canvas.parent("viewport");

        //Setup GameBar Canvas
        let div = document.getElementById("gamebar");
        offset = div.clientHeight;
        div.style.display = "none";
        gamebar = new GameBar(width, offset, lives);

        //Setup AilenSweeper
        div = document.getElementById("ailensweeper")
        height = div.clientHeight;
        div.style.display = "none";

        //Setup Game State
        s.startGame(first_load);
        first_load = false;
    }

    s.startGame = () => {

        //Ailensweeper
        //Create 14xN or 32XN grid based on vertical or horizontal view
        if (width < height) {
            w = width / 15;
        } else {
            w = width / 32;
        }

        cols = s.floor(width / w);
        rows = s.floor(height / w);
        totalAilens = Math.ceil(w * 3);
        grid = make2DArray(cols, rows);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = new Cell(i, j, w, offset);
            }
        }

        // Pick totalAilens spots
        let options = [];
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                options.push([i, j]);
            }
        }

        for (let n = 0; n < totalAilens; n++) {
            let index = s.floor(s.random(options.length));
            let choice = options[index];
            let i = choice[0];
            let j = choice[1];
            // Deletes that spot so it's no longer an option
            options.splice(index, 1);
            grid[i][j].ailen = true;
            grid[i][j].img = AILENS_IMG[s.RandomInt(0, AILENS_IMG.length)];

        }


        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j].countAilens();
            }
        }

        //Gamebar
        if (first_load) {
            gamebar.setup();

            //Cell.setup is just resizing images, so calling it once is enough
            grid[0][0].setup();
        }

        //Initial State
        progress = 0;
        numFlagged = 0;
        lives = 1;
        gamebar.lives = lives;
        gamebar.setGameOver(false);
        gamebar.progress = 0;
        gamebar.ailensLeft = totalAilens;

        //Animation stuff
        //Get random cell from top row and random col not including extremes
        board = new Board(grid[s.RandomInt(1, grid.length - 1)][0], 0);
        setInterval(() => {
            board.animationOffset = 0;
            board.animationCell = grid[s.RandomInt(1, grid.length - 1)][0];
        }, 20000);
    }

    s.gameOver = () => {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j].revealed = true;
            }
        }
        gamebar.setGameOver(true);
    }

    s.restartGame = () => {
        s.startGame();
    }

    s.mousePressed = () => {
        if (gamebar.containsRestartBtn(s.mouseX, s.mouseY)) {
            s.restartGame();
            return false;
        }

        if (gamebar.containsFlagModeBtn(s.mouseX, s.mouseY)) {
            flagMode = !flagMode;
            gamebar.setFlagMode(!gamebar.flagMode);
            return false;
        }

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (grid[i][j].contains(s.mouseX, s.mouseY)) {
                    if (grid[i][j].revealed) {
                        return false;
                    }

                    if (flagMode) {

                        grid[i][j].flag();

                        if (grid[i][j].flagged) {
                            grid[i][j].img = FLAG_IMG;
                            numFlagged++;
                        } else {
                            numFlagged--;
                            grid[i][j].img = AILENS_IMG[s.RandomInt(0, AILENS_IMG.length)];
                        }
                        gamebar.updateAilensLeft(totalAilens - numFlagged);
                        return false;
                    }

                    if (grid[i][j].flagged) {
                        return false;
                    }

                    if (grid[i][j].ailen) {
                        if (gamebar.lives > 0) {
                            gamebar.lives--;
                        } else {
                            gamebar.lives--;
                            s.gameOver();
                        }
                    }

                    grid[i][j].reveal();
                    s.updateProgress(progress++);
                    return false;
                }
            }
        }
        return false;
    }

    s.updateProgress = (progress) => {
        let numCells = grid.length + grid[0].length;

        if (progress > numCells * 0.3) {
            gamebar.progress = 1;
        } else if (progress > numCells * 0.7) {
            gamebar.progress = 2;
        }
    }

    s.RandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    s.divisor = (number) => {
        let i;
        for (i = 2; i < Math.sqrt(number); i++) {
            if (number % i === 0) {
                break;
            }
        }
        return i;
    }

    s.resizeImg = (img, w, h) => {
        img.resize(w, h);
    }

    s.animatedLine = (obj, x, y, width, height, speed) => {
        s.line(x, y, x + width, y + height);
        obj.animationOffset += speed;
    }

    s.draw = () => {
        s.background("#262038");
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j].show();
            }
        }
        gamebar.show();
        board.animateBoard();
    }

    let Cell = function(i, j, w, offset) {
        this.i = i;
        this.j = j;
        this.x = i * w;
        this.y = j * w + offset;
        this.w = w;
        this.neighborCount = 0;

        this.ailen = false;
        this.flagged = false;
        this.revealed = false;

        //this.img;
    }

    Cell.prototype.setup = function() {
        for (var i = 0; i < AILENS_IMG.length; i++) {
            s.resizeImg(AILENS_IMG[i], this.w - 1, this.w - 1);
        }
        s.resizeImg(FLAG_IMG, this.w - 1, this.w - 1);
    }

    Cell.prototype.show = function() {
        s.strokeWeight(1);

        if (this.flagged) {
            s.image(this.img, this.x, this.y + 1);
        }

        if (this.revealed) {
            if (this.ailen) {
                s.image(this.img, this.x, this.y + 1);
            } else {
                s.fill("#990077");
                s.rect(this.x, this.y, this.w, this.w);
                s.textAlign(s.CENTER);
                s.textSize(16);
                s.textWidth(16);
                if (this.neighborCount > 0) {
                    switch (this.neighborCount) {
                        case 1:
                            s.fill(0, 0, 255);
                            s.stroke(0, 0, 255); //Blue
                            break;
                        case 2:
                            s.fill(0, 255, 0);
                            s.stroke(0, 255, 0); //Green
                            break;
                        case 3:
                            s.fill(255, 0, 0);
                            s.stroke(255, 0, 0); //Red
                            break;
                        case 4:
                            s.fill(153, 50, 204);
                            s.stroke(153, 50, 204); //Purple
                            break;
                        case 5:
                            s.fill(94, 33, 41);
                            s.stroke(94, 33, 41); //Vinotinto
                            break;
                        case 6:
                            s.fill(255, 120, 189);
                            s.stroke(255, 120, 189); //Pink
                            break;
                        case 7:
                            s.fill(255, 255, 0);
                            s.stroke(255, 255, 0); //Yellow
                            break;
                        case 8:
                            s.fill(64, 224, 208);
                            s.stroke(64, 224, 208); //Turquoise
                            break;
                        default:
                            s.fill(255);
                            s.stroke(255); //White
                            break;
                    }
                    s.text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
                }
            }
        }

        s.stroke("#cc0077");
        s.noFill();
        s.rect(this.x, this.y, this.w, this.w);
    }

    Cell.prototype.countAilens = function() {
        if (this.ailen) {
            this.neighborCount = -1;
            return;
        }
        var total = 0;
        for (var xoff = -1; xoff <= 1; xoff++) {
            var i = this.i + xoff;
            if (i < 0 || i >= cols) continue;

            for (var yoff = -1; yoff <= 1; yoff++) {
                var j = this.j + yoff;
                if (j < 0 || j >= rows) continue;

                var neighbor = grid[i][j];
                if (neighbor.ailen) {
                    total++;
                }
            }
        }
        this.neighborCount = total;
    }

    Cell.prototype.contains = function(x, y) {
        return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
    }

    Cell.prototype.floodFill = function() {
        for (var xoff = -1; xoff <= 1; xoff++) {
            var i = this.i + xoff;
            if (i < 0 || i >= cols) continue;

            for (var yoff = -1; yoff <= 1; yoff++) {
                var j = this.j + yoff;
                if (j < 0 || j >= rows) continue;

                var neighbor = grid[i][j];
                // Note the neighbor.ailen check was not required.
                // See issue #184
                if (!neighbor.revealed && !neighbor.flagged) {
                    neighbor.reveal();
                }
            }
        }
    }

    Cell.prototype.reveal = function() {
        this.revealed = true;
        if (this.neighborCount === 0) {
            // flood s.fill time
            this.floodFill();
        }
    }

    Cell.prototype.flag = function() {
        this.flagged = !this.flagged;
    }

    let Board = function(animationCell, animationOffset) {
        this.animationCell = animationCell;
        this.animationOffset = animationOffset || 0;
    }

    Board.prototype.animateBoard = function() {
        //Pick random cell without including extremes
        s.stroke("#ff0077");
        s.strokeWeight(2);
        s.animatedLine(this, this.animationCell.x, this.animationCell.y + this.animationOffset, 0, 12, 30);
        //if (this.animationOffset > rows * w) {
        //  this.animationOffset = 0;
        //}
    }

    let GameBar = function(w, h, lives) {
        this.x = 0;
        this.y = 0;
        this.w = w;
        this.h = h;
        this.lives = lives;
        this.gameOver = false;
        this.flagMode = false;
        this.progress = 0;
        //this.ailensLeft;
        //this.numFlagged;

        this.yBound = this.h * 0.8;

        this.ailensLeftTextX = this.x + this.w * 0.1;

        //this.flagModeImg;
        this.flagModeButtonX = this.x + this.w * 0.3;
        this.flagModeWidth = this.y + this.h * 0.1;

        //this.restartButtonImg;
        this.restartButtonX = this.x + this.w * 0.5;
        this.restartButtonWidth = this.y + this.h * 0.1;

        //Animation stuff
        this.animationOffset = 0;
        //this.interval;
    }

    GameBar.prototype.setup = function() {
        this.setGameOver(this.gameOver);
        this.setFlagMode(this.flagMode);

        s.resizeImg(FLAG_IMG_GAMEBAR, this.yBound * 0.8, this.yBound * 0.8);
        s.resizeImg(AILENS_IMG_GAMEBAR, this.yBound * 0.8, this.yBound * 0.8);
        for (var i = 0; i < DEATH_IMG.length; i++) {
            s.resizeImg(DEATH_IMG[i], this.yBound * 0.8, this.yBound * 0.8);
            s.resizeImg(LIVES_IMG[i], this.yBound * 0.6, this.yBound * 0.6);
        }

        for (var i = 0; i < ALIVE_IMG.length; i++) {
            s.resizeImg(ALIVE_IMG[i], this.yBound * 0.8 + i / 10, this.yBound * 0.8 + i / 10);
        }

        s.textFont(MARKET_DECO_FONT);
        this.interval = setInterval(() => {
            this.animationOffset = 0;
        }, 45000);
    }

    GameBar.prototype.show = function() {
        s.fill("#262038");
        s.stroke("#262038");
        s.rect(this.x, this.y, this.w, this.y + this.h);

        //Right border
        s.stroke("#cc0077");
        s.line(this.w, this.y, this.w, this.y + this.h)

        //AilensLeft
        s.textSize(24);
        s.fill(255);
        s.stroke(255);
        s.strokeWeight(2);
        s.text(this.ailensLeft, this.ailensLeftTextX, this.yBound * 0.75);

        drawButton(this, this.flagModeButtonX, this.yBound * 0.2, this.flagModeImg);
        drawButton(this, this.restartButtonX - 1, this.yBound * 0.2, this.restartButtonImg);

        //Vidas
        s.image(LIVES_IMG[this.lives + 1], this.x + this.w * 0.8, this.yBound * 0.3);

        this.animate();
    }

    GameBar.prototype.containsFlagModeBtn = function(x, y) {
        //Contains FlagMode s.image
        return (x > this.flagModeButtonX && x < this.flagModeButtonX + this.yBound && y > this.y && y < this.y + this.yBound);
    }

    GameBar.prototype.containsRestartBtn = function(x, y) {
        //Contains Death/Alive s.image
        return (x > this.restartButtonX && x < this.restartButtonX + this.yBound && y > this.y && y < this.y + this.yBound);
    }

    GameBar.prototype.updateAilensLeft = function(ailensLeft) {
        this.ailensLeft = ailensLeft
    }

    GameBar.prototype.setFlagMode = function(flagMode) {
        this.flagMode = flagMode;
        flagMode ? this.flagModeImg = FLAG_IMG_GAMEBAR : this.flagModeImg = AILENS_IMG_GAMEBAR;
    }

    GameBar.prototype.setGameOver = function(gameOver) {
        this.gameOver = gameOver;
        gameOver ? this.restartButtonImg = DEATH_IMG[this.progress] : this.restartButtonImg = ALIVE_IMG[this.progress];
    }

    GameBar.prototype.animate = function() {
        s.line(this.x, this.y + this.h, this.w, this.y + this.h);
        s.stroke("#ff0077");
        s.animatedLine(this, this.x + this.animationOffset, this.y + this.h, 12, 0, 15);
    }

    let drawButton = function(obj, x, y, img) {
        s.image(img, x, y)
        s.noFill();
        s.stroke("#990077");
        s.strokeWeight(5);
        s.ellipse(x + obj.yBound * 0.4, obj.yBound * 0.6, obj.yBound, obj.yBound);

        s.stroke("#cc0077");
        s.strokeWeight(2);
        s.ellipse(x + obj.yBound * 0.4, obj.yBound * 0.6, obj.yBound, obj.yBound);
    }

    let make2DArray = (cols, rows) => {
        let arr = new Array(cols);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
        }
        return arr;
    }
}