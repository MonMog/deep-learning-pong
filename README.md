# Description
This project is a JS implementation of the classic game Pong that learns to play using the NEAT algorithm. For handling the neural networks and NEAT, I used the [Neataptic Library](https://github.com/wagenaartje/neataptic). The way this project works is that there is an enemy paddle, the top paddle, that follows the logic of trying to keep its origin of the paddle centered on the ball. The player paddle, the bottom paddle, is the one that is being controlled by the neural network and is trying to learn how to play the game. Its main way of learning is through the fitness score and depending on how well it performs, its genes can carry into the next generation. Overtime, the player paddle learns how to play more efficiently and is able to play better.


# How it works

## Pong Class

To first start with this project, you need to build a playable version of Pong. In its most simple form, Pong is two lines being able to move back and forth with a ball bouncing off every surface except for the top and bottom walls. To start building this, we need to have a plan:
- Clear the canvas each frame
- Draw both the paddles
- Draw the ball
- Move both the paddles
- Update

It sounds simple at first, but it does involve some math and gets a bit harder to code (or maybe that was only for me). 

We should be using classes since it will be easier to reference and update values. We will start with the constructor and define the starting values for the player paddle, the enemy paddle and the ball, the 3 objects that will have our complete attention. We want to declare their x & y position, width & height and speed. The ball gets a radius instead of width and height. Before we move on to the next step, I would like to explain my way of approaching this problem. Think of the canvas as a whiteboard and for each second, we want to draw the position of the paddles and the ball. Since the paddles and ball have speed, they are going to be moving to a different position. Having the information about their speed, we can use that to calculate their next x and y position. So we will need to wipe the entire whiteboard and draw the new positions of the paddle and ball. We will need a clearCanvas() method. We will also need a drawPaddle() and drawBall() method, the drawPaddle() just draws the current position of the paddle and can be applied to both and the drawBall() does the similar thing. The way that the enemy paddle will move is checking if the ball is to its left or to its right, and move towards that direction. For the player paddle to move, it will need to do a little more and that will be explained in the next section.

At this point, we can clear the canvas, draw the positions of the paddles and ball and move them as well, but how do we actually play the game? The beauty of the update() method will answer this question surely. This is where all the magic happens for the game. It checks the collisons for the game, collsions with the ball between the paddle, collisions with the ball between the wall and changes the speed of the ball based off the interaction. There is one method that I didn't mention yet and that is the resetBall(). This method determines the angle and speed for which the ball spawns. For right now, and most likely for the future, I made it so that the ball spawns only towards the player paddle because I did not want it to be rewarded for the enemy paddle missing the starting ball. I also made two methods for resetBall() and resetBallIfPlayerWon(). The only difference is that when resetBallIfPlayerWon() is called, it sets `this.isGameOver = true;` so that the game knows its game over. There is also the calculateFitness() method inside the Pong class but it will also be explained in the other class. You now have a working Pong game, by working I mean in the sense that it will be played by the neural network, not you, sadly (If you still want the JS code for pong, I have it commented at the top of my script.js file!).

## Runner Class


# Credit
- https://github.com/wagenaartje/neataptic
- https://github.com/zonetti/snake-neural-network


