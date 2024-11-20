import styled from "@emotion/styled";

export const CharacterWidgetContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 20px;
  width: 300px;
  height: 100px;
  background-color: gainsboro;
  border-radius: 4px;
  border: 1px solid darkgray;
`;

export const CharacterStatusLabel = styled.span<{ isAlive: boolean }>`
  color: ${(props) => (props.isAlive ? "green" : "red")};
`;

export const CharacterAvatar = styled.img`
  box-sizing: border-box;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 2px solid hotpink;
`;
