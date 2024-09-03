import { useState } from 'react';
import './App.css';
import AppRoutes from './AppRoutes';
import NavBar from './NavBar';
import SettingsContext from './settings/SettingsContext';
import SettingsLoaderComponent from './settings/SettingsLoaderComponent';
import { s3NotesConfig } from './settings/SettingsStorer';

function App() {
  const [settings, setSettings] = useState(() => {
        if (s3NotesConfig in localStorage) {
            let config = JSON.parse(localStorage.getItem(s3NotesConfig))
            config.epoch = 0
            return config
        }

        return {password: null, epoch: 0, settings: {type: "none"}}
  })

  return (
    <div className="App">
      <SettingsContext.Provider value={[settings, setSettings]}>
        <SettingsLoaderComponent>

          <header className="App-header">
          </header>

          <NavBar />
          
          <AppRoutes />
        </SettingsLoaderComponent>
      </SettingsContext.Provider>
    </div>
  );
}


export default App;
