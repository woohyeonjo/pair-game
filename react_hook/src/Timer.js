import { useEffect, useState } from "react";
import { gameStateType } from "./App";

const MAX_GAME_TIME = 60;

const Timer = (props) => {
  const { gameState, setGameState } = props;

  const stateXLT = {
    [gameStateType.INIT]: "게임을 시작해주세요.",
    [gameStateType.START]: "카드 짝을 찾아 점수를 획득하세요.",
    [gameStateType.ENDED]: "게임이 종료되었습니다.",
  };

  const [curTime, setCurTime] = useState(MAX_GAME_TIME);
  const [timer, setTimer] = useState();

  useEffect(() => {
    if (curTime === 0) {
        setGameState(gameStateType.ENDED);
    }
  }, [curTime]);

  useEffect(() => {
    if (gameState === gameStateType.ENDED) {
        clearInterval(timer);
    }

    if (gameState === gameStateType.INIT) {
        clearInterval(timer);
      setCurTime(MAX_GAME_TIME);
      return;
    }

    if (gameState === gameStateType.START) {
        clearInterval(timer);
      setTimer(
        setInterval(() => {
          setCurTime((prev) => prev - 1);
        }, 1000)
      );
      return;
    }
  }, [gameState]);

  const min = Math.floor(curTime / 60);
  const sec = Math.floor(curTime % 60);
  return (
    <div>
      <h2>{stateXLT[gameState]}</h2>
      <h2>{`${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`}</h2>
    </div>
  );
};

export default Timer;
