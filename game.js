function SnakePart(x,y) {
    this.x = x;
    this.y = y;
}

SnakePart.prototype.paint = function(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x * 10, this.y * 10, 10, 10);
    ctx.strokeStyle = "black";
	ctx.strokeRect(this.x*10, this.y*10, 10, 10);
};

$(document).ready(function(){
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var ctx = $("#canvas")[0].getContext("2d");
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    
    var direction;
    var snake;
    var score;
    var running;
    var food;

    $(document).keydown(function(e){
        switch (e.which) {
            case 37:
                if (direction !== "right") {
                    direction = "left";
                }
                break;
            case 38:
                if (direction !== "down") {
                    direction = "up";
                }
                break;
            case 39:
                if (direction !== "left") {
                    direction = "right";
                }
                break;
            case 40:
                if (direction !== "up") {
                    direction = "down";
                }
                break;
        }
    });
    
    function render() {
        var x = snake[0].x;
        var y = snake[0].y;
        
        if (direction === "right") {
            x++;
        } else if (direction === "left") {
            x--;
        } else if (direction === "up") {
            y--;
        } else if (direction === "down") {
            y++
        }
        
        // hit the left or the top
        if (x == -1 || y == -1) {
            running = false;

        }
        
        // hit the right or the bottom
        if (x == width / 10 || y == height / 10) {
            running = false;
        }
        
        snake.forEach(function(part) {
            if (x == part.x && y == part.y) {
                running = false;
            }
        });
        if (running == false) { return }
        var tail;
        if (x == food.x && y == food.y) {
            tail = new SnakePart(x,y);
            spawnFood();
        } else {
            
            tail = snake.pop();
            tail.x = x;
            tail.y = y;
        }
        
        
        snake.unshift(tail);
        
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,width,height);
        food.paint(ctx);
        snake.forEach(function(part){
            part.paint(ctx);
        });

    }
    
    function init() {
        direction = "right";
        
        snake = [];
        var length = 10;
        
        for (var i = length - 1; i >= 0; i--)
        {

            snake.push(new SnakePart(i,0));
        }

        
        score = 0;
        spawnFood();
        running = true;

    }
    init();
    (function loop() {
        render();
        
        if (running) {
            setTimeout(function() {
                requestAnimationFrame(loop);
            }, 60);
        }
    })();
    
    function spawnFood() {
        food = new SnakePart(Math.random()*(width - 10) / 10 << 0,
            Math.random()*(height - 10) / 10 << 0);
    }
});