import './App.css';
import { Header } from './components/Header';
import './assets/images/background.png';
import { Equipo } from './components/Equipo';
import { Juego } from './components/Juego';
import { createContext } from 'react';
import { useGlobalState } from './hooks/useGlobalState';

export const  GlobalStateContext = createContext();
function App() {
  const globalStateHandler = useGlobalState();
  return (
    <div className="App">
      <Header/>
      <GlobalStateContext.Provider value={globalStateHandler}>
        <div className='body'>
          <Equipo align='left' number="1" integrantes={globalStateHandler.globalState?.team1}/>
          <Juego/> 
          <Equipo align='right' number="2" integrantes={globalStateHandler.globalState?.team2}/>
        </div>
      </GlobalStateContext.Provider>
      <div className='attributes'>
        <p>Creado por <a href="https://www.linkedin.com/in/kukiamarilla/">Kuki</a> de <a href="https://www.instagram.com/gsgg.94/">GSGG</a> - <span className='rojo'>PAR</span><span className='blanco'>AG</span><span className='azul'>UAY</span></p>
      </div>
    </div>
  );
}

export default App;
