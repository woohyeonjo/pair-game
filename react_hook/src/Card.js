import styled from "styled-components";

const Card = (props) => {
  const {value, onClick, isSelected, isMatched } = props;

  return (
    <StyledCard onClick={onClick} isMatched={isMatched} isSelected={isSelected}>
    {isMatched ? value : isSelected ? value : 0}
    </StyledCard>
  );
};

const StyledCard = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px solid black;
  background-color: ${({ isSelected, isMatched }) => {
      if (isMatched) return "gray";
  
      return isSelected ? "skyblue" : "white";
    }};
    cursor: ${({ isMatched }) => (isMatched ? "default" : "pointer")};
`;


export default Card;
