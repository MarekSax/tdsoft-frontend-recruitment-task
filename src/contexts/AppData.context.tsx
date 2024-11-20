import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import ky from 'ky';
import { API_URL } from '../config';
import type { Character } from '../types/RickAndMorty.types';

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';
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

export const AppDataContext = createContext<AppData>({
  fetchStatus: 'idle',
  character: null,
  characterId: null,
  incrementCharacterId: () => {},
  decrementCharacterId: () => {},
});

export const AppDataContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>('idle');
  const [characterData, setCharacterData] =
    useState<AppData['character']>(null);
  const [characterId, setCharacterId] = useState<number>(1);

  const fetchCharacterData = useCallback(async (id: number) => {
    setFetchStatus('loading');

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
      setFetchStatus('success');
    } catch (error) {
      setFetchStatus('error');
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
