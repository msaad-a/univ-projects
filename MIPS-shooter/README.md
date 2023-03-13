Arcade shooter game written in MIPS Assembly based on the old "Centipede" arcade game.

Use MARS to run this project, you can find it using the link below:
http://courses.missouristate.edu/kenvollmar/mars/

Once you open the file with MARS, follow these steps to run the game:
1) Open Tools > Bitmap Display
2) Change the following settings:
    - Unit Width in Pixels: 8
    - Unit Height in Pixels: 8
    - Display Width in Pixels: 256
    - Display Height in Pixels: 256
    - Base Address for Display: 0x10008000 ($gp)
3) Click 'Connect to MIPS'
4) Open Tools > Keyboard and Display MMIO Simulator
5) Click 'Connect to MIPS'
6) Now run the file and the game will be shown on the Bitmap Display, use the bottom portion of the Keyboard and Display MMIO Simulator to use keyboard controls

Controls:
J and K to move left and right
X to shoot your blaster
S to restart the game

Game functionality:
- The centipede will start at the top left corner, and make its way down each row
- Blue mushrooms interrupt the centipede's pathing, making it go down a row immediately
- Shooting the blaster can break a mushroom in a single shot
- The centipede needs to be hit three times by the blaster to be killed, and when the centipede dies, the game is won
- Red fleas will occassionally rain down, and they will cause you to lose the game if they touch you
- If the centipede gets to the bottom rows, the game is lost

