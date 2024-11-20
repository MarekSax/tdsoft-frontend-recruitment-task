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

type AppData = {
  isLoading: boolean;
  character: {
    name: Character['name'];
    status: Character['status'];
    imageUrl: string;
  } | null;
  characterId: number | null;
  incrementCharacterId: () => void;
  decrementCharacterId: () => void;
};

export const AppDataContext = createContext<AppData>({
  isLoading: true,
  character: null,
  characterId: null,
  incrementCharacterId: () => {},
  decrementCharacterId: () => {},
});

export const AppDataContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState<AppData['isLoading']>(false);
  const [characterData, setCharacterData] =
    useState<AppData['character']>(null);
  const [characterId, setCharacterId] = useState<number>(1);

  const fetchCharacterData = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      const response: Character = await ky
        .get(`${API_URL}/character/${id}`)
        .json();
      const nextCharacterData: AppData['character'] = {
        name: response.name,
        status: response.status,
        imageUrl: response.image,
      };
      setCharacterData(nextCharacterData);
    } catch (error) {
      console.error('Error fetching character data:', error);
    } finally {
      setIsLoading(false);
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
      isLoading,
      character: characterData,
      characterId,
      incrementCharacterId,
      decrementCharacterId,
    };
  }, [
    isLoading,
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
