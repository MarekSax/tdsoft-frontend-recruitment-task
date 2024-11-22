import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import ky from 'ky';
import { API_URL } from '../config';
import type { Character } from '../types/RickAndMorty.types';

export enum FetchStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}
type AppData = {
  fetchStatus: FetchStatus;
  character: {
    name: Character['name'];
    gender: Character['gender'];
    status: Character['status'];
    episodes: number;
    imageUrl: string;
  } | null;
  characterId: number | null;
  incrementCharacterId: () => void;
  decrementCharacterId: () => void;
};

export const AppDataContext = createContext<AppData | null>(null);

export const AppDataContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.Idle);
  const [characterData, setCharacterData] =
    useState<AppData['character']>(null);
  const [characterId, setCharacterId] = useState<number>(1);

  const fetchCharacterData = useCallback(async (id: number) => {
    setFetchStatus(FetchStatus.Loading);

    try {
      const response: Character = await ky
        .get(`${API_URL}/character/${id}`)
        .json();
      const nextCharacterData: AppData['character'] = {
        name: response.name,
        gender: response.gender,
        status: response.status,
        episodes: response.episode.length,
        imageUrl: response.image,
      };
      setCharacterData(nextCharacterData);
      setFetchStatus(FetchStatus.Success);
    } catch (error) {
      setFetchStatus(FetchStatus.Error);
      console.error('Error fetching character data:', error);
    }
  }, []);

  useEffect(() => {
    fetchCharacterData(characterId);
  }, [characterId, fetchCharacterData]);

  const incrementCharacterId = useCallback(() => {
    setCharacterId((prevId) => prevId + 1);
  }, []);

  const decrementCharacterId = useCallback(() => {
    setCharacterId((prevId) => Math.max(prevId - 1, 1));
  }, []);

  const appData: AppData = useMemo(() => {
    return {
      fetchStatus,
      character: characterData,
      characterId,
      incrementCharacterId,
      decrementCharacterId,
    };
  }, [
    fetchStatus,
    characterData,
    characterId,
    incrementCharacterId,
    decrementCharacterId,
  ]);

  return (
    <AppDataContext.Provider value={appData}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppDataContext = () => {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error(
      'useAppDataContext must be used within a AppDataContextProvider'
    );
  }

  return context;
};
