import './App.css';
import AppRoutes from './AppRoutes';
import NavBar from './NavBar';
import SettingsContext, { useSettingsContext } from './settings/SettingsContext';
import SettingsLoaderComponent from './settings/SettingsLoaderComponent';

function App() {
  const [settings, setSettings] = useSettingsContext()

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
