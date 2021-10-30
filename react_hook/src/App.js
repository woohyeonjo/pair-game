import Timer from "./Timer";
import Score from "./Score";
import Board from "./Board";
import SizeController from "./SizeController";
import { useState } from "react";

const MAX_GAME_SIZE = 12;
const MIN_GAME_SIZE = 2;

export const gameStateType = {
  START: "START",
  INIT: "INIT",
  ENDED: "ENDED",
};

const App = () => {
  const [gameSize, setGameSize] = useState(2);
  const [gameState, setGameState] = useState(gameStateType.INIT);
  const [correctionCount, setCorrectionCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const increaseGameSize = () => {
    if (gameSize !== MAX_GAME_SIZE) {
      setGameSize(gameSize + 2);
      setGameState(gameStateType.INIT);
    }
  };
  const decreaseGameSize = () => {
    if (gameSize !== MIN_GAME_SIZE) {
      setGameSize(gameSize - 2);
      setGameState(gameStateType.INIT);
    }
  };

  return (
    <div>
      <Timer gameState={gameState} setGameState={setGameState} />
      <Score correctionCount={correctionCount} wrongCount={wrongCount} />
      <SizeController
        increaseGameSize={increaseGameSize}
        decreaseGameSize={decreaseGameSize}
      />
      <Board
        gameState={gameState}
        gameSize={gameSize}
        correctionCount={correctionCount}
        wrongCount={wrongCount}
        setGameState={setGameState}
        setCorrectionCount={setCorrectionCount}
        setWrongCount={setWrongCount}
      />
    </div>
  );
};

export default App;
