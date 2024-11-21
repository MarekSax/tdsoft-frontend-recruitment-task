import React, { useContext } from 'react';
import { AppDataContext, FetchStatus } from '../../contexts/AppData.context';
import {
  CharacterWidgetContainer,
  CharacterStatusLabel,
  CharacterAvatar,
  CharacterWidgetHeader,
  CharacterWidgetContent,
  Button,
  StatusMessage,
  ButtonContainer,
} from './CharacterWidget.styled';

const CharacterWidget: React.FC = () => {
  const {
    character,
    incrementCharacterId,
    decrementCharacterId,
    characterId,
    fetchStatus,
  } = useContext(AppDataContext);

  const MIN_CHARACTER_ID = 1;
  const MAX_CHARACTER_ID = 826;

  if (!character) return null;
  return (
    <>
      <CharacterWidgetContainer>
        {fetchStatus === FetchStatus.Loading && (
          <StatusMessage>Loading...</StatusMessage>
        )}

        {fetchStatus === FetchStatus.Error && (
          <StatusMessage>An error occured... try again later.</StatusMessage>
        )}

        {fetchStatus === FetchStatus.Success && (
          <>
            <CharacterWidgetHeader
              status={character.status}
              title={`status: ${character.status}`}
            >
              <p>{character.name}</p>
            </CharacterWidgetHeader>
            <CharacterWidgetContent>
              <div>test</div>
              <div>test</div>

              <CharacterAvatar src={character.imageUrl} />
            </CharacterWidgetContent>
          </>
        )}
      </CharacterWidgetContainer>
      <ButtonContainer>
        <Button
          onClick={decrementCharacterId}
          disabled={(characterId ?? 0) <= MIN_CHARACTER_ID}
        >
          Previous
        </Button>
        <Button
          onClick={incrementCharacterId}
          disabled={(characterId ?? 0) >= MAX_CHARACTER_ID}
        >
          Next
        </Button>
      </ButtonContainer>
    </>
  );
};

export default CharacterWidget;
