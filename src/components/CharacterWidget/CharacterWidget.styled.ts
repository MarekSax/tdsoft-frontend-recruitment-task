import styled from '@emotion/styled';
import { colors } from '../../styles/colors';
import { Character } from '../../types/RickAndMorty.types';

export const CharacterWidgetContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 360px;
  height: 120px;
  background-color: ${colors.grey6};
  border: 1px solid ${colors.grey5};
  border-radius: 8px;
  overflow: hidden;
`;

export const CharacterWidgetHeader = styled.div<{
  status: Character['status'];
}>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 700;
  font-size: 11px;
  line-height: 14px;
  width: 100%;
  background-color: ${(props) => {
    switch (props.status) {
      case 'Alive':
        return colors.green;
      case 'Dead':
        return colors.red;
      default:
        return colors.grey5;
    }
  }};
  padding: 7px 9px 8px;
`;

export const CharacterWidgetContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 9px 9px;
`;

export const CharacterInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 133px);
  gap: 8px 4px;
`;

export const CharacterInfoItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const CharacterInfoLabel = styled.p`
  background: ${colors.blue};
  border-radius: 4px;
  font-weight: 600;
  font-size: 11px;
  color: ${colors.grey1};
  padding: 1px 4px;
`;

export const CharacterInfoText = styled.p`
  font-weight: 600;
  font-size: 11px;
  color: ${colors.grey1};
`;

export const CharacterAvatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 4px;
  object-fit: cover;
  object-position: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

export const StatusMessage = styled.p`
  font-weight: 600;
  font-size: 11px;
  color: ${colors.grey2};
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  padding: 18px;
`;

export const Button = styled.button`
  width: 90px;
  background-color: ${colors.grey6};
  border: 1px solid ${colors.grey5};
  border-radius: 4px;
  padding: 7px;
  color: ${colors.grey1};
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;

  :disabled {
    color: ${colors.grey3};
  }
`;
