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
              <CharacterInfo>
                {characterInfo.map(({ label, value }) => (
                  <CharacterInfoItem key={label}>
                    <CharacterInfoLabel>{label}</CharacterInfoLabel>
                    <CharacterInfoText>{value}</CharacterInfoText>
                  </CharacterInfoItem>
                ))}
              </CharacterInfo>

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
