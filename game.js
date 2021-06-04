var mouse_pos = document.getElementById("mouse-pos");
var coinDiameter = 25;

var pocket_width_and_height, pockets, thickStripWidth, coins_pos, canvas, boardEdge,
    thinStripWidth, coins, striker, striker2, strikerMove, black1, black2, ellipse_pos, haveToSetStriker, black3, queen, white1, white2, white3, music, edges, strip_pos, stopped_coins, thickBand, thinBand, whiteImg, blackImg, queenImg, strikerImg, strikerReady, pocket_pos, gameState, showOptions;

function preload() {
    // music = loadSound("Favorite-Audio.mp3");
    whiteImg = loadImage("images/whitepiece.png");
    blackImg = loadImage("images/blackpiece.png");
    queenImg = loadImage("images/queenpiece.png");
    strikerImg = loadImage("images/striker.png");
}

function setup() {
    canvas = createCanvas(600, 750);
    // music.play();
    strikerReady = true;
    gameState = 0;
    // Game state legend - 0 = Home screen || 1 = Playing || 2 = Player 1 won || 3 = Player2 won
    showOptions = {
        currentOpt: 0,
        showButtons: function () {
            showOptions.currentOpt = 1;
        },
        goNeutral: function () {
            showOptions.currentOpt = 0;
        },
        hideButtons: function () {
            showOptions.currentOpt = -1;
        }
    };
    // Show options legend - 0 = neutral || 1 = Show || -1 = Hide
    var aboutTxt = createElement("h2").html("About").position(35, 100).hide();
    var aboutInfo = createElement("p").attribute("class", "info").html("<i> This is a very popular game named carrom. <br> It is mainly about aiming on a point and acting according to it. <br> The aim and target of the person should be determined. <br> This game helps people be determined on their aims. <br> This game sends awareness amongst people <br> and tells an important story of </i> <strong> UNAWARENESS </strong> <i> <br> of their own motive. </i>").position(35, 150).hide();
    startButtons = [
        (createButton("About / How to play / Learnings").attribute("class", "button").position(150, 200).style("background-color", "red")).mousePressed(() => {
            startButtons[0].hide();
            startButtons[1].hide();
            startButtons[7].hide();
            startButtons[2].show();
            aboutTxt.show();
            aboutInfo.show();

        }),
        (createButton("Play").attribute("class", "button").position(150, 335).style("background-color", "blue").mousePressed(() => {
            startButtons[0].hide();
            startButtons[1].hide();
            startButtons[7].hide();
            aboutTxt.hide();
            aboutInfo.hide();
            gameState = 1;
            startGame();
            startButtons[3].show();
        })),
        (createButton("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Back_Arrow.svg/1200px-Back_Arrow.svg.png' draggable=false width='50' height='50'/>").attribute("class", "button").style("width", "50px").style("height", "50px").style("background-color", rgb(255, 250, 220)).position(520, 690).mousePressed(() => {
            startButtons[0].show();
            startButtons[1].show();
            startButtons[2].hide();
            startButtons[7].show();
            aboutTxt.hide();
            aboutInfo.hide();
        }).hide()),
        (createButton("<img src='images/menu.png' draggable=false width='50' height='50'/>").attribute("class", "button").style("width", "50px").style("background-color", rgb(155, 210, 220)).style("height", "50px").position(545, 710).mousePressed(() => {
            showOptions.showButtons();
        }).hide()),
        (createButton("Give up").attribute("class", "button").style("width", "140px").style("height", "50px").style("font-size", "20px").style("background-color", "red").position(465, 640).mousePressed(() => {
            resetGame(aboutTxt, aboutInfo);
        }).hide()),
        (createButton("New Game").attribute("class", "button").style("width", "140px").style("height", "50px").style("font-size", "20px").style("background-color", "red").position(465, 580).mousePressed(() => {
            resetGame(aboutTxt, aboutInfo);
        }).hide()),
        (createButton("Cancel").attribute("class", "button").style("width", "140px").style("height", "50px").style("font-size", "20px").style("background-color", "red").position(465, 520).mousePressed(() => {
            showOptions.hideButtons();
        }).hide()),
        (createButton(" <a href='Peeyush Agarwal - Project 43 - Answered - Project+Questionairre.html'  target='_blank'> View Game Detail Document </a>").attribute("class", "button").position(150, 470).style("background-color", "green").style("color", "red").style("font-size", "30px").mousePressed(() => {
        })),
    ];
}

function draw() {
    background(255, 250, 220);
    // mouse_pos.innerText = "MouseX: " + mouseX + " || MouseY: " + mouseY;

    if (showOptions.currentOpt === 1) {
        startButtons[4].show();
        startButtons[5].show();
        startButtons[6].show();
        showOptions.goNeutral();
    }
    if (showOptions.currentOpt === -1) {
        startButtons[4].hide();
        startButtons[5].hide();
        startButtons[6].hide();
        showOptions.goNeutral();
    }
    if (gameState === 1) {
        for (let j = 0; j < strip_pos.x.length; j++) {
            push();
            fill("black");
            rect(strip_pos.x[j] - strip_pos.width[j] / 2, strip_pos.y[j] - strip_pos.height[j] / 2, strip_pos.width[j], strip_pos.height[j]);
            pop();
        }
        push();
        noFill();
        push();
        translate(200, 200);
        rotate(-135);
        arc(0, 0, 40, 40, 35, 325);
        pop();
        push();
        translate(400, 200);
        rotate(-45);
        arc(0, 0, 40, 40, 35, 325);
        pop();
        push();
        translate(200, 400);
        rotate(135);
        arc(0, 0, 40, 40, 35, 325);
        pop();
        push();
        translate(400, 400);
        rotate(45);
        arc(0, 0, 40, 40, 35, 325);
        pop();
        pop();
        // Down left
        line(213, 386, 52.5, 542.5);
        // Down right
        line(386, 386, 547.5, 542.5);
        // Up Left
        line(213, 215, 55, 57.5);
        // Up Right
        line(386, 215, 545, 60);

        push();
        fill("black");
        // Triangles as arrows
        triangle(175, 205, 187.5, 205, 180, 195);
        triangle(205, 187.5, 205, 175, 195, 180);

        triangle(400, 175, 400, 185, 410, 180);
        triangle(415, 200, 425, 200, 420, 190);

        triangle(205, 415, 202.5, 425, 195, 417.5);
        triangle(185, 395, 175, 395, 180, 405);

        triangle(412.5, 397.5, 425, 397.5, 420, 405);
        triangle(390, 422.5, 395, 412.5, 402.5, 420);

        // Up left
        triangle(52.5, 65, 65, 55, 42.5, 47.5);

        // Up right
        triangle(532.5, 60, 545, 70, 550, 52.5);

        // Down left
        triangle(67.5, 535, 57.5, 525, 47.5, 545);

        // Down right
        triangle(532.5, 535, 545, 525, 550, 545);

        push();
        stroke("black");
        noFill();
        for (let k = 0; k < ellipse_pos.x.length; k++) {
            var current_r;
            if (k <= 3) {
                current_r = 0;
            }
            else if (k === 4) {
                current_r = 1;
            }
            else if (k >= 5 && k <= 12) {
                current_r = 2;
                fill("yellow");
            }
            else if (k >= 13 || k <= 20) {
                current_r = 3;
                fill("red");
            }
            else if (k >= 21 || k <= 24) {
                current_r = 4;
            }
            ellipse(ellipse_pos.x[k], ellipse_pos.y[k], ellipse_pos.r[current_r]);
        }
        pop();
        pop();

        // Bouncing
        bounceObjects();

        if (keyDown("enter")) {
            console.log("abc");
        }

        if (strikerReady) {
            striker.x = striker2.x;
            striker2.pointTo(mouseX, mouseY);
            if (mouseDown()) {
                striker.pointTo(mouseX, mouseY);
                if (dist(mouseX, mouseY, striker2.x, striker2.y) < striker2.width && striker2.x <= 500 && striker2.x >= 100) striker2.x = mouseX;
            }
            if (striker.x <= 497 && (keyDown("right") || keyDown("d"))) {
                striker.x = striker.x + 3;
                striker2.x = striker.x;
            }
            if (striker.x >= 103 && (keyDown("left") || keyDown("a"))) {
                striker.x = striker.x - 3;
            }
            if (keyDown("enter")) {
                strikerReady = false;
                striker.setSpeedAndDirection(30);
            }
        }
        else striker2.pointTo(striker.x, striker.y);
        if (striker2.x > 464) {
            striker2.x = 500;
        }
        if (striker2.x < 136) {
            striker2.x = 100;
        }

        if (Math.round(Math.abs(striker.velocity.x)) <= 0.65
            && Math.round(Math.abs(striker.velocity.y)) <= 0.65
            && striker.x !== 300
            && striker.y !== 530) {
            setStriker();
        }
        if (striker.y === 530 && Math.round(Math.abs(striker.velocity.x)) <= 0.65 && Math.round(Math.abs(striker.velocity.y)) <= 0.65) {
            strikerReady = true;
        }
        else {
            strikerReady = false;
        }

        // Destroying coins
        destroyCoins();
        // Reset striker
        if (striker.isTouching(pockets)) {
            setStriker();
            striker.setVelocity(0, 0);
        }

        if (haveToSetStriker) {
            setStrikerToInitPos();
        }

        if (coins.length === 0) {
            gameWin();
        }
        coins.bounceOff(edges);
    }
    drawSprites();
}

function gameWin() {
    fill(rgb(0, 128, 0));
    textSize(25);
    text("You Win!", 250, 307);
}

function destroyCoins() {
    for (let m = 0; m < coins.length; m++) {
        const spr = coins[m];
        if (spr.isTouching(pockets)) {
            spr.destroy();
            coins.remove(spr);
        }
    }
}

function bounceObjects() {
    striker.bounceOff(edges);
    striker.bounceOff(boardEdge);
    if (!strikerReady) {
        striker.bounce(coins);
    }
    for (let m = 0; m < coins.length; m++) {
        const spr = coins[m];
        coins.bounceOff(spr);
    }
    coins.bounceOff(boardEdge);
}

function setStriker() {
    if (striker2 !== undefined) striker.x = striker2.x;
    else striker.x = 300;
    striker.y = 530;
    strikerReady = false;
    striker.setSpeedAndDirection(0)
    striker.pointTo(canvas.width / 2, canvas.height / 2);
}

function startGame() {
    // Pockets
    pocket_width_and_height = 56;
    pockets = createGroup();
    pocket_pos = { x: [0, 600, 600, 0], y: [0, 0, 600, 600] };
    for (let i = 0; i < pocket_pos.x.length; i++) {
        const spr = createSprite(pocket_pos.x[i], pocket_pos.y[i], pocket_width_and_height, pocket_width_and_height);
        spr.setCollider("circle");
        pockets.add(spr);
        spr.visible = false;
    }

    // Strips
    thickStripWidth = 9;
    thinStripWidth = 4;

    strip_pos = {
        x: [525, 540, 75, 60, 300, 300, 300, 300],
        y: [300, 300, 300, 300, 75, 60, 525, 540],
        width: [thickStripWidth, thinStripWidth, thickStripWidth, thinStripWidth, thinStripWidth * 100, thinStripWidth * 100, thinStripWidth * 100, thinStripWidth * 100],
        height: [thinStripWidth * 100, thinStripWidth * 100, thinStripWidth * 100, thinStripWidth * 100, thickStripWidth, thinStripWidth, thickStripWidth, thinStripWidth]
    };
    coins = createGroup();

    //  Striker
    striker = createSprite();
    setStriker();
    striker.restitution = 0.18;
    striker.rotation = -90;
    striker.rotateToDirection = true;
    striker.friction = 0.02;
    striker2 = createSprite(300, 650);
    striker2.rotation = -90;
    striker2.depth = 1;

    // Coins

    var queenX = 300;
    var queenY = 300;

    coins_pos = { black: { x: [], y: [] }, white: { x: [], y: [] } };
    //Black coins - first layer
    for (var angle = 75; angle < 360; angle += 120) {
        var coinX = queenX + cos(angle) * coinDiameter;
        var coinY = queenY + sin(angle) * coinDiameter;
        coins_pos.black.x.push(coinX);
        coins_pos.black.y.push(coinY);
        console.log("Black Coin 1 -", coinX, coinY);
    }

    //Black coins second layer
    for (var angle = 45; angle < 360; angle += 60) {

        var xOffset = cos(angle) * (2 * coinDiameter * cos(30));
        var yOffset = sin(angle) * (2 * coinDiameter * cos(30));

        var coinX = queenX + xOffset;
        var coinY = queenY + yOffset;
        coins_pos.black.x.push(coinX);
        coins_pos.black.y.push(coinY);
        console.log("Black Coin 2 -", coinX, coinY);
    }


    //White coins - first layer
    for (var angle = 15; angle < 360; angle += 120) {
        var coinX = queenX + cos(angle) * coinDiameter;
        var coinY = queenY + sin(angle) * coinDiameter;
        coins_pos.white.x.push(coinX);
        coins_pos.white.y.push(coinY);
        console.log("White Coin 1 -", coinX, coinY);
    }

    //White coins second layer
    for (var angle = 15; angle < 360; angle += 60) {

        var xOffset = cos(angle) * (2 * coinDiameter);
        var yOffset = sin(angle) * (2 * coinDiameter);

        var coinX = queenX + xOffset;
        var coinY = queenY + yOffset;
        coins_pos.white.x.push(coinX);
        coins_pos.white.y.push(coinY);
        console.log("White Coin 2 -", coinX, coinY);
    }

    for (let l = 0; l < coins_pos.white.x.length; l++) {
        var spr = createSprite(coins_pos.white.x[l], coins_pos.white.y[l], coinDiameter, coinDiameter);
        blackImg.width = spr.width;
        spr.addImage(blackImg);
        coins.add(spr);
        spr.restitution = 0.5;
        spr.setCollider("circle", 0, 0, 12);
        spr.friction = 0.065;
    }
    for (let l = 0; l < coins_pos.black.x.length; l++) {
        var spr = createSprite(coins_pos.black.x[l], coins_pos.black.y[l], coinDiameter, coinDiameter);
        whiteImg.width = spr.width;
        spr.addImage(whiteImg);
        coins.add(spr);
        spr.restitution = 0.5;
        spr.setCollider("circle", 0, 0, 12);
        spr.friction = 0.065;
    }
    var queen = createSprite(300, 300, coinDiameter, coinDiameter);
    whiteImg.width = queen.width;
    queen.addImage(queenImg);
    coins.add(queen);
    queen.restitution = 0.004;
    queen.setCollider("circle", 0, 0, 12);
    queen.friction = 0.055;

    striker.setCollider("circle");
    // strikerImg.width = 5;
    striker.addImage(strikerImg);
    striker2.addImage(strikerImg);
    ellipse_pos = {
        x: [0, 0, 600, 600,
            300,
            500, 532.5, 500, 532.5, 67.5, 100, 100, 67.5, 500, 532.5, 500, 532.5, 67.5, 100, 100, 67.5,
            520, 520, 82, 82.5],
        y: [0, 600, 600, 0,
            300,
            68, 105, 532, 495, 495, 530, 68, 100, 68, 105, 532, 495, 495, 530, 68, 100,
            82.5, 515, 515, 82.5],
        r: [90, 130, 35, 15],
    };
    edges = createEdgeSprites();
    boardEdge = createSprite(300, 675, 600, 150);
    boardEdge.shapeColor = rgb(155, 210, 220);
    boardEdge.depth = -2;

    // thickBand at the bottom
    thickBand = createSprite(300, 640, 438, 10);
    thickBand.shapeColor = "black";
    thickBand.depth = -1;
    // thinBand at the bottom
    thinBand = createSprite(300, 660, 438, 5);
    thinBand.shapeColor = "black";
    thinBand.depth = -1;
}

function resetGame() {
    for (const i in arguments) {
        const elt = arguments[i];
        elt.hide();
    }
    startButtons[0].show();
    startButtons[1].show();
    startButtons[7].show();
    startButtons[2].hide();
    startButtons[3].hide();
    gameState = 0;
    striker.destroy();
    striker2.destroy();
    coins.destroyEach();
    boardEdge.destroy();
    thickBand.destroy();
    thinBand.destroy();
    showOptions.hideButtons();
}