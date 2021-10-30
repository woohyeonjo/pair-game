import styled from "styled-components";

const SizeController = (props) => {
  return (
    <div>
      <StyledButton onClick={props.increaseGameSize}>+</StyledButton>
      <StyledButton onClick={props.decreaseGameSize}>-</StyledButton>
    </div>
  );
};

const StyledButton = styled.div`
  display: inline-block;
  text-align: center;
  width: 20px;
  height: 15px;
  margin: 3px;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
`;

export default SizeController;
