import React from "react";
import { AppDataContextProvider } from "./contexts/AppData.context";
import { AppContainer } from "./App.styled";
import CharacterWidget from "./components/CharacterWidget";

const App: React.FC = () => {
  return (
    <AppDataContextProvider>
      <AppContainer>
        <CharacterWidget />
      </AppContainer>
    </AppDataContextProvider>
  );
};

export default App;
