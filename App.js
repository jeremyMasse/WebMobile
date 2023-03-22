import React from 'react';
import Routes from './src/routes';
import {FavoritesProvider} from './src/contexts/FavoritesContext';
import {ToasterProvider} from './src/contexts/ToasterContext';
import Toaster from './src/components/Toaster';
import { ThemeProvider } from 'styled-components';
import globalStyledComponents from './src/styles/globalStyledComponents';

/**
 * Point de départ de l'application, nous avons ici l'import du router et des proviers ainsi que le composant global toaster
 */
const App = () => {
  return (
    <ThemeProvider theme={globalStyledComponents}>
      <ToasterProvider>
        <FavoritesProvider>
          <Toaster/>
          <Routes />
        </FavoritesProvider>
      </ToasterProvider>
    </ThemeProvider>
  );
};

export default App;
