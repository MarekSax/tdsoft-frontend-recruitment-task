import React from 'react';
import { AppDataContextProvider } from './contexts/AppData.context';
import { AppContainer } from './App.styled';
import CharacterWidget from './components/CharacterWidget';
import { Global } from '@emotion/react';
import { globalStyles } from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <AppDataContextProvider>
        <AppContainer>
          <CharacterWidget />
        </AppContainer>
      </AppDataContextProvider>
    </>
  );
};

export default App;
