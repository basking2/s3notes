import './App.css';
import AppRoutes from './AppRoutes';
import NavBar from './NavBar';
import NoticeComponent from './NoticeComponent';
import SettingsContext, { useSettingsContext } from './settings/SettingsContext';
import SettingsStorageComponent from './settings/SettingsStorageComponent';

function App() {
  const [settings, setSettings] = useSettingsContext()

  return (
    <div className="App">
      <SettingsContext.Provider value={[settings, setSettings]}>
        <NoticeComponent>
          <SettingsStorageComponent>

            <header className="App-header">
            </header>

            <NavBar />
          
            <AppRoutes />
          </SettingsStorageComponent>
        </NoticeComponent>
      </SettingsContext.Provider>
    </div>
  );
}


export default App;
