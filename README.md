# battlefield

## Warning! This is a work in progress

The Odin Project - Intermediate JS project

LIVE SITE [HERE](https://hello-damiro.github.io/battlefield)

Game design was heavily focused on using the map for each player (AI/user) thats why I cant seem to create a logic to support my vision and process of creating the game based on Odin's challenges/procedures. I ended up creating 2 different gameboards (aiMap / playerMap) on which game mechanics are designed. Though I finished the procedure of this exrcise, I ended up not using what I started. **_Completed 17 April 2023_**

**Day 1:** Created modules for player, ship, gameboard. Pending gameloop since I think UI will matter when designing it. Designed basic UI at figma.

**Day 2:** Coded CSS/JS UI functionalties. Modularized UI factory functions. Struggle in Implementing PubSub to design a separate functions for UI and the game logic.

**Day 3:** Refactored some functions. Needs to learn how to create proper classes that can easily be integrated to othher functions not just by using pubsub. On the other hand, I feel Im having a great progress. Got a quite amount of challenge today on how to design an algorithm and refactor the code for optimization.

**Day 4:** Started to medle with the gameloop, Integration of modules and factoy functions. I re-read the challenges and the whole point of this exercise is to dev heavily using TDD. 🤣

**Day 5:** Finalized code just to finish the exercise. I know, its a crime. Getting ready for react!

</br>

Some nice [warships](https://www.shutterstock.com/g/Konstantin+Petrov/sets/178552838)

</br>

## Screenshot

![Screenshot](https://github.com/hello-damiro/battlefield/blob/main/src/assets/images/screenshot.png?raw=true)

</br>

## Challenges

1. Create factory functions for the `ship`, `gameboard`, `player` and test using `jest`.

2. Create the main game loop and a module for DOM interaction.
    1. At this point it is appropriate to begin crafting your User Interface.
    2. The game loop should set up a new game by creating Players and Gameboards.For now just populate each Gameboard with predetermined coordinates. You can implement a system for allowing players to place their ships later.
    3. We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class.
        - You need methods to render the gameboards and to take user input for attacking. For attacks, let the user click on a coordinate in the enemy Gameboard.
    4. The game loop should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.
    5. Create conditions so that the game ends once one players ships have all been sunk. This function is appropriate for the Game module.
