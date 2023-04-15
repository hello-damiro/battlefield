# battlefield

## Warning! This is a work in progress

The Odin Project - Intermediate JS project

LIVE SITE [HERE](https://hello-damiro.github.io/battlefield)

**Day 1:** Created modules for player, ship, gameboard. Pending gameloop since I think UI will matter when designing it. Designed basic UI at figma.

**Day 2:** Coded CSS/JS UI functionalties. Modularized UI factory functions. Struggle in Implementing PubSub.

**Day 3:** Refactored some functions. Needs to learn how to create proper classes that can easily be integrated to othher functions not just by using pubsub. On the other hand, I feel Im having a great progress.

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
