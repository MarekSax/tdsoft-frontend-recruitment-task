import React, { createContext, useState, useEffect, useMemo } from "react";
import ky from "ky";
import { API_URL } from "../config";
import type { Character } from "../types/RickAndMorty.types";

type AppData = {
  isLoading: boolean;
  character: {
    name: Character["name"];
    status: Character["status"];
    imageUrl: string;
  } | null;
};

export const AppDataContext = createContext<AppData>({
  isLoading: true,
  character: null
});

export const AppDataContextProvider = ({ children }: React.PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState<AppData["isLoading"]>(false);
  const [characterData, setCharacterData] = useState<AppData["character"]>(
    null
  );

  const appData: AppData = useMemo(() => {
    return {
      isLoading,
      character: characterData
    };
  }, [isLoading, characterData]);

  useEffect(() => {
    (async () => {
      const response: Character = await ky.get(`${API_URL}/character/1`).json();

      const nextCharacterData: AppData["character"] = {
        name: response.name,
        status: response.status,
        imageUrl: response.image
      };

      setCharacterData(nextCharacterData);
      setIsLoading(false);
    })();
  }, []);

  return (
    <AppDataContext.Provider value={appData}>
      {children}
    </AppDataContext.Provider>
  );
};
