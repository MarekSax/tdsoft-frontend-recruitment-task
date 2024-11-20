import React, { useContext } from "react";
import { AppDataContext } from "../../contexts/AppData.context";
import {
  CharacterWidgetContainer,
  CharacterStatusLabel,
  CharacterAvatar
} from "./CharacterWidget.styled";

const CharacterWidget: React.FC = () => {
  const { character } = useContext(AppDataContext);

  if (!character) return null;
  return (
    <CharacterWidgetContainer>
      <div>
        <p>Name: {character.name}</p>

        <p>
          Status:{" "}
          <CharacterStatusLabel isAlive={character.status === "Alive"}>
            {character.status}
          </CharacterStatusLabel>
        </p>
      </div>

      <CharacterAvatar src={character.imageUrl} alt="Character avatar" />
    </CharacterWidgetContainer>
  );
};

export default CharacterWidget;
