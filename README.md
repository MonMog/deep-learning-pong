# Description
This project is a JS implementation of the classic game Pong that learns to play using the NEAT algorithm. For handling the neural networks and NEAT, I used the [Neataptic Library](https://github.com/wagenaartje/neataptic). The way this project works is that there is an enemy paddle, the top paddle, that follows the logic of trying to keep its origin of the paddle centered on the ball. The player paddle, the bottom paddle, is the one that is being controlled by the neural network and is trying to learn how to play the game. Its main way of learning is through the fitness score and depending on how well it performs, its genes can carry into the next generation. Overtime, the player paddle learns how to play more efficiently and is able to play better.

Check it out here! https://monmog.github.io/deep-learning-pong-neat-js/

<p align="center">
  <img src="https://github.com/MonMog/deep-learning-pong-neat-js/blob/main/PongDemo.gif" width="100%">
</p>


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

At this point, we can clear the canvas, draw the positions of the paddles and ball and move them as well, but how do we actually play the game? The beauty of the update() method will answer this question surely. This is where all the magic happens for the game. It checks the collisions for the game, collisions with the ball between the paddle, collisions with the ball between the wall and changes the speed of the ball based off the interaction. There is one method that I didn't mention yet and that is the resetBall(). This method determines the angle and speed for which the ball spawns. For right now, and most likely for the future, I made it so that the ball spawns only towards the player paddle because I did not want it to be rewarded for the enemy paddle missing the starting ball. I also made two methods for resetBall() and resetBallIfPlayerWon(). The only difference is that when resetBallIfPlayerWon() is called, it sets `this.isGameOver = true;` so that the game knows its game over. There is also the calculateFitness() method inside the Pong class but it will also be explained in the other class. You now have a working Pong game, by working I mean in the sense that it will be played by the neural network, not you, sadly (If you still want the JS code for pong, I have it commented at the top of my script.js file!).

## Runner Class

Now that we have the Pong class setup for running the simulation, we need to actually set up how we want to run it (that's why I'm guessing it's called runner, because it runs it). Now color me surprised because the Pong Class is 300 lines while the Runner Class is 100 lines! Let's start with the constructor, to run this, we need to know the input of the neural network, which will be called the neat. We also want to keep an array of the games that are going on and we want to create a Pong object for each of them. The startGeneration() method will handle starting the games for each of the canvas we have created. It's going to iterate through the list of the games, or how many games we have declared, and it will call the resetGame() method from the Pong class, which just sets up the variables for a new pong game, it will assign that specific pong game a neural network based off fitness (since there is no fitness score on the first time, it should all be pretty much random) and then it will start each game. I wanted to make it so the generation does not end until all the games are over so I can see what each pong game is doing with their approach. Once a pong game is over, it will check if the isGameOver is equal to the length of games, meaning they're all done, and it will move on to the next method, the endGeneration(). This method starts by getting all the fitness score for each game. As previously stated, the calculateFitness() is a method inside the Pong class that keeps track of how well the player paddle performed in the game. 

  Fitness scores include:
- Staying in the same spot without moving for 4 seconds: -20 points
- Scoring against enemy paddle: 1 point
- Getting scored by the enemy paddle: -0.5 points
- Hitting the ball back: 0.5 points
- Surviving for a frame: 0.1 points
- Having the ball within the range of the paddle's width: 0.1 points

I do admit that I am not the best at determining the scaling for the points, but it is a good starting point and has worked well (so far) for me. After we get the fitness score of each of the games, we sort the population. With some sorting and some basic for loops to find the sum and highest and lowest fitness of the population. We now need to make a new generation so the next generation can take over the neural network and learn. If you have elitism, which I have for 20% of my popsize, we will first append them to the list. The remaining will be the elitism - popsize and we will append the offspring of their neural networks. We assign the population to the new generation and then we mutate. Notice how it does not have some type of end condition as it will just keep repeating until you are happy with the results, or just happy. To finally wrap it up, we need to define one last thing. <s>Calling neataptic.neat to define the neural network, it will look something like this
        `return new neataptic.Neat(7, 1, null, {
            popsize: popsize,
            elitism: Math.floor(popsize * 0.2),
            mutationRate: .5,
            mutationAmount: 3
          }`
The first value, 7, represents how many input nodes the neural network will have while the next value, 1, represents how many output nodes it will have. I wish I could tell you what the null does. The reason that I put 7 input nodes is because in the Pong Class, the method processNetworkOutput(), has an array of input data that it will use to determine its output. As listed, its the following information it bases it output on:
- Ball position (X & Y)
- Ball Speed (X & Y)
- Player Paddle X position
- Enemy Paddle X position & speed </s>

At the time of writing this, I have realized a major mistake in my input and have crossed it out for the time being. My mistake was... adding the enemy paddle position and speed as inputs. Intially, I thought doing so would allow the player paddle to learn where the ball was going to go by predicting where the enemy paddle was going to hit it, but alas, it did not. Instead, the player paddle would simply copy the postion of the enemy paddle, which the enemy paddle is programmed to simply follow the origin of the ball, which means the player paddle wasn't actually learning to play the game, but learning to cheat. I have instead updated the inputs to include the distance of the ball from the top and bottom walls, as well as the distance of the ball from the paddle. So far, it is not yeilding the results I would have hoped for. I have feeling it might have to do with my attempt of normalization of the input values to be between 0-1 but I will keep trying.

Time willing, I hopefully want to be able to actually show the real-time values of the neural network for each of these input nodes so that we can see the output node. Speaking of the output node, it only has 1 output node, how can we use that to determine 3 different actions for the paddle? We want to train the output node to give a value between 0 and 1, with 0 - 0.3 being move left, 0.3 - .6 is not move and the rest will be move right. Each frame, each of the 7 inputs will be different from the last frame, so that means each of the nodes will have a different value, thus a different output node. 

# Credit
- https://github.com/wagenaartje/neataptic
- https://github.com/zonetti/snake-neural-network


