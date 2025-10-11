import React, { useState } from 'react';
import "../NoteSection/NoteSection.css";
import { useNotes } from '../../context/NotesContext';

const NoteSection = () => {

  const { activeGroup, groups, setGroups, setActiveGroup, isMobile }=useNotes();

  const [note, setNote] = useState("");
  const [editingNoteId,setEditingNoteId]=useState(null);
  const [editingText, setEditingText]=useState("")

  const handleSaveNote = () => {
    if (!note.trim()) return;                                           //to avoid saving empty notes

    const now = new Date().toLocaleString();

    const newNote = {
      id: Date.now(),
      text: note,
      createdAt: now,
    };

    const updatedGroups = groups.map((g) =>
      g.id === activeGroup.id ? { ...g, notes: [...g.notes, newNote] } : g  //to update notes to their respective group
    );
    setGroups(updatedGroups);

    const updatedActiveGroup = updatedGroups.find(                          //if this is not created, saved note is not reflecting on respective group unless group is clicked/selected. Adding this, saved notes is reflected on group immediately.
      (g) => g.id === activeGroup.id
    );
    setActiveGroup(updatedActiveGroup);
    setNote("");
  };

  const handleEdit=(id,oldText)=>{
    setEditingNoteId(id);
    setEditingText(oldText);
    
  }

  const handleSaveEdit=(id)=>{
    const now=new Date().toLocaleString();
    const updatedGroups= groups.map((g)=>
    g.id===activeGroup.id
    ?{
      ...g,
      notes:g.notes.map((note)=>
      note.id===id ? {...note, text: editingText, updatedAt:now} : note
    )
    }
    :g
  )
  

  setGroups(updatedGroups);
  setNote("");
  const updatedActiveGroup=updatedGroups.find((g)=>g.id===activeGroup.id);
  setActiveGroup(updatedActiveGroup);
  

  //reseting editing state
  setEditingNoteId(null);
  setEditingNoteId("");
  }

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditingText("");
  };

  const handleDelete=(id)=>{
    const updatedGroups=groups.map((g)=>
      g.id===activeGroup.id ? {...g, notes:g.notes.filter((note)=>note.id !== id)}
      : g
    );
    setGroups(updatedGroups);

    const updatedActiveGroup=updatedGroups.find((g)=>g.id===activeGroup.id);
    setActiveGroup(updatedActiveGroup);
    
  }

  const handleBack = () => {
    setActiveGroup(null);
  };

  return (
    <div className="note-section">
      <div className='note-header'>
        {isMobile && (
          <button className='back-btn' onClick={handleBack}>
            ←
          </button>
        )}
        <div className='avatar' style={{ backgroundColor: activeGroup.color }}>
          {activeGroup.initials}
        </div>
        <h2>{activeGroup.name}</h2>
      </div>

      <div className='notes-container'>
        {activeGroup.notes.map((n) => (
          <div key={n.id} className='note-card'>
          {editingNoteId===n.id ? (
            <>
            <textarea value={editingText} onChange={(e)=>setEditingText(e.target.value)}/>
            <div className='edit-btns'>
              <button onClick={()=>handleSaveEdit(n.id)}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
            </>
          ):(<>
            <p>{n.text}</p>
            <div className='note-meta'>
              {n.updatedAt && n.updatedAt !== n.createdAt ? 
                (<span>{n.updatedAt}</span>)
               :(<span>{n.createdAt}</span>)
              }
              <div className='ed'>
                <img src='./assets/edit2.png' alt='' className='edit' onClick={()=>handleEdit(n.id, n.text)}/>
                <img src='./assets/delete.png' alt='' className='delete' onClick={()=>handleDelete(n.id)}/>
              </div>
            </div>
          </>
          )}
          </div>
        ))}
      </div>

      <div className='note-input'>
        <div className='input-wrapper'>
          <textarea
            placeholder='Enter your notes here...........'
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSaveNote();
              }
            }}
          />
          <button
            className={`send-btn ${note.trim() ? 'active' : ''}`}
            onClick={handleSaveNote}
            disabled={!note.trim()}
            
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteSection;