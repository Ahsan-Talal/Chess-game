# Chess Game Tech Stack

This project is a real-time multiplayer chess game built using the following technologies:

## Tech Stack

1. **Express.js**: A fast and minimalist web framework for Node.js. It handles the server-side logic and routing for the chess game.
2. **EJS (Embedded JavaScript Templates)**: A simple templating engine used to generate HTML markup dynamically on the server side.
3. **chess.js**: A JavaScript chess library that handles the game logic, including move validation, game state, and checkmate detection.
4. **Socket.IO**: A library for real-time, bidirectional communication between the client and server. It enables real-time updates for the chess game, such as move synchronization between players.

## How It Works

- The server is built with **Express.js** and uses **EJS** to render the chessboard and game interface.
- **chess.js** manages the game logic, ensuring that moves are valid and updating the game state.
- **Socket.IO** facilitates real-time communication between players, allowing them to see each other's moves instantly.



### Installation

To download and set up the project, follow these steps:

```bash
# Clone repository
git clone https://github.com/Ahsan-Talal/Chess-game.git

# Install dependencies
npm install

# Start development server
node app.js
