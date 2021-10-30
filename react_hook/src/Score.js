const Score = (props) => {
const {correctionCount, wrongCount} = props;

  return (<div>Score: {(correctionCount * 5) - (wrongCount * 3)}</div>);
};

export default Score;
