import { useEffect, useRef } from 'react';
import { FetchStatus, useAppDataContext } from '../../contexts/AppData.context';
import {
  CharacterWidgetContainer,
  CharacterAvatar,
  CharacterWidgetHeader,
  CharacterWidgetContent,
  Button,
  StatusMessage,
  ButtonContainer,
  CharacterInfoLabel,
  CharacterInfo,
  CharacterInfoItem,
  CharacterInfoText,
  CharacterWidgetTitle,
} from './CharacterWidget.styled';

const CharacterWidget: React.FC = () => {
  const {
    character,
    incrementCharacterId,
    decrementCharacterId,
    characterId,
    fetchStatus,
  } = useAppDataContext();

  const MIN_CHARACTER_ID = 1;
  const MAX_CHARACTER_ID = 826;

  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (fetchStatus === FetchStatus.Error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [fetchStatus]);

  if (!character) return null;

  const characterInfo = [
    { label: 'id', value: `#${characterId}` },
    { label: 'status', value: character.status },
    { label: 'gender', value: character.gender },
    { label: 'episodes', value: character.episodes },
  ];
  return (
    <>
      <CharacterWidgetContainer>
        {fetchStatus === FetchStatus.Loading && (
          <StatusMessage role="status" aria-live="polite">
            Loading...
          </StatusMessage>
        )}

        {fetchStatus === FetchStatus.Error && (
          <StatusMessage
            role="alert"
            aria-live="assertive"
            ref={errorRef}
            tabIndex={-1}
          >
            An error occured... try again later.
          </StatusMessage>
        )}

        {fetchStatus === FetchStatus.Success && (
          <>
            <CharacterWidgetHeader
              status={character.status}
              title={`status: ${character.status}`}
            >
              <CharacterWidgetTitle>{character.name}</CharacterWidgetTitle>
            </CharacterWidgetHeader>
            <CharacterWidgetContent>
              <CharacterInfo>
                {characterInfo.map(({ label, value }) => (
                  <CharacterInfoItem key={label}>
                    <CharacterInfoLabel>{label}</CharacterInfoLabel>
                    <CharacterInfoText>{value}</CharacterInfoText>
                  </CharacterInfoItem>
                ))}
              </CharacterInfo>

              <CharacterAvatar
                src={character.imageUrl}
                alt={`Image of ${character.name}`}
              />
            </CharacterWidgetContent>
          </>
        )}
      </CharacterWidgetContainer>
      <ButtonContainer>
        <Button
          onClick={decrementCharacterId}
          disabled={(characterId ?? 0) <= MIN_CHARACTER_ID}
          aria-disabled={(characterId ?? 0) <= MIN_CHARACTER_ID}
          aria-label="Previous character"
        >
          Previous
        </Button>
        <Button
          onClick={incrementCharacterId}
          disabled={(characterId ?? 0) >= MAX_CHARACTER_ID}
          aria-disabled={(characterId ?? 0) >= MAX_CHARACTER_ID}
          aria-label="Next character"
        >
          Next
        </Button>
      </ButtonContainer>
    </>
  );
};

export default CharacterWidget;
