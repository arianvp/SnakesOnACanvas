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
    var direction = "right";

    
    var snake = new Array(4);
    
    snake[0] = new SnakePart(3,0);
    snake[1] = new SnakePart(2,0);
    snake[2] = new SnakePart(1,0);
    snake[3] = new SnakePart(0,0);


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
        
        var tail = snake.pop();
        tail.x = x;
        tail.y = y;
        snake.unshift(tail);
        
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,width,height);
        snake.forEach(function(part){
            part.paint(ctx);
        });
    }
    (function loop() {
        requestAnimationFrame(loop);
        render();
    })();
    
});