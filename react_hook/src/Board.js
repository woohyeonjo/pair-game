import Card from "./Card";
import { useState, useEffect } from "react";
import { gameStateType } from "./App";

const Board = (props) => {
  const {
    gameSize,
    gameState,
    correctionCount,
    wrongCount,
    setGameState,
    setCorrectionCount,
    setWrongCount,
  } = props;
  const [numbers, setNumbers] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [matchedPair, setMatchedPair] = useState([]);

  useEffect(() => {
    if (gameState === gameStateType.INIT) {
      setSelectedCard({});
      setMatchedPair([]);
      setCorrectionCount(0);
      setWrongCount(0);
      return;
    }

    if (gameState === gameStateType.START && correctionCount === gameSize) {
      setGameState(gameStateType.ENDED);
    }
  }, [gameState, correctionCount]);

  useEffect(() => {
    const ROW = gameSize;
    const COL = gameSize;
    const MAX_BOARD_SIZE = ROW * COL;
    const MAX_NUMBER = Math.floor(MAX_BOARD_SIZE / 2);

    const pairStateCount = Array(MAX_NUMBER).fill(2);
    const numbers = Array(MAX_BOARD_SIZE)
      .fill(0)
      .map(() => {
        let pickedNumber = -1;

        while (true) {
          pickedNumber = Math.floor(Math.random() * MAX_NUMBER);
          if (pairStateCount[pickedNumber] > 0) {
            pairStateCount[pickedNumber] -= 1;
            return pickedNumber;
          }
        }
      });
    setNumbers(numbers);
  }, [gameSize]);

  const handleCardClick = (card) => {
    if (gameState === gameStateType.INIT) {
      setGameState(gameStateType.START);
    }

    const { id: curId, value: curValue } = card;
    const { id: selectedId, value: selectedValue } = selectedCard;

    if (matchedPair.includes(curId)) return;

    if (selectedId === undefined) {
      setSelectedCard(card);
      return;
    }

    if (selectedId === curId) {
      setSelectedCard({});
      return;
    }

    if (selectedValue === curValue) {
      setMatchedPair((prev) => [...prev, curId, selectedId]);
      setSelectedCard({});
      setCorrectionCount(correctionCount + 1);
      return;
    }

    setWrongCount(wrongCount + 1);
    alert("틀렸습니다!");
  };

  const cards = [];
  numbers.forEach((value, index) => {
    if (index % gameSize === 0) cards.push([]);
    cards[cards.length - 1].push(
      <Card
        key={index.toString()}
        id={index}
        value={value}
        onClick={() => handleCardClick({ id: index, value: value })}
        isSelected={selectedCard.id === index}
        isMatched={matchedPair.includes(index)}
      />
    );
  });

  return (
    <div>
      {cards.map((row) => {
        return <div>{row}</div>;
      })}
    </div>
  );
};

export default Board;
