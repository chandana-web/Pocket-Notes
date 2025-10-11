
import './App.css';
import Groups from './components/Groups/Groups';
import NoteSection from './components/NoteSection/NoteSection';
import Popups from './components/Popups/Popups';
import Welcome from './components/Welcome/Welcome';
import { useNotes } from './context/NotesContext';

function App() {
  
  const {activeGroup, showPopup, isMobile}=useNotes()

  return (
    <div className="App">
      
      <Groups/>
      
      {activeGroup ? <NoteSection/>
      :<Welcome isMobile={isMobile}/>}                     
      
      {showPopup && <Popups/> }  

    </div>
  );
}

export default App;
