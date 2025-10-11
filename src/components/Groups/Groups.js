import React, { useState,useEffect,useRef } from 'react';
import "../Groups/Groups.css";
import { useNotes } from '../../context/NotesContext';

const Groups = () => {

  const { groups, setActiveGroup, setShowPopup, activeGroup, isMobile, setGroups }=useNotes();

  const [editingGroup, setEditingGroup]=useState(null);
  const [newGroupName, setNewGroupName]= useState("")
  const [selectedColor, setSelectedColor]=useState("");
  const colors=["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];

  const popupRef=useRef();  
  useEffect(()=>{
          function handleOutSideClick(e){
              if(popupRef.current && !popupRef.current.contains(e.target)){                     
                  setEditingGroup(null)
              }
          }
          document.addEventListener("mousedown", handleOutSideClick);
          return ()=>document.removeEventListener("mousedown",handleOutSideClick);
      }, [])
  
  const handleGroupClick = (group) => {
    setActiveGroup(group);
    setNewGroupName(group.name);
    setSelectedColor(group.color);
  };


  const handleDeleteGroup=(id)=>{
    
    const confirmDelete = window.confirm("Are you sure you want to delete this group?");
    if (!confirmDelete) return;

    const updatedGroups=groups.filter((g)=>g.id !==id);
    setGroups(updatedGroups);

    if(activeGroup?.id===id) setActiveGroup(null);
  }

  const handleEditGroup=(group)=>{
    setEditingGroup(group);
    setNewGroupName(group.name);
    
  }

  const saveEditedGroup=()=>{
    if(!newGroupName||!selectedColor){
            return alert("Please enter new group name and select the color");
        }
      
    if(newGroupName.length<2)
      return alert("Group name must have atleast 2 letters!");

    if(groups.some(
      (g)=>g.name.toLowerCase()===newGroupName.toLowerCase()
           && g.id!==editingGroup.id))
      {
        return alert("Group already exixsts!");
      }

      const words = newGroupName.trim().split(" ");
        const initials = words.length > 1
       ? (words[0][0] + words[1][0]).toUpperCase()
      : (words[0][0] + words[0][1]).toUpperCase();

      const updatedGroups=groups.map((g)=>
      g.id===editingGroup.id ?
        {...g, name: newGroupName, color: selectedColor, initials}
        :g
      )
      setGroups(updatedGroups);

      if(activeGroup?.id===editingGroup.id){
        setActiveGroup({
          ...activeGroup,
          name: newGroupName,
          color: selectedColor,
          initials,
        });

      }
    
    setEditingGroup(null);
    setNewGroupName("");
    setSelectedColor("");
  }

  // On mobile, hide sidebar when a group is active
  const shouldHide = isMobile && activeGroup;

  return (
    <div className={`sidebar ${shouldHide ? 'hide' : ''}`}>
      <div className='sidebar-header'>
        <h2>Pocket Notes</h2>
      </div>
      <div className='group-list'>
        {groups.map((group) => (
          <div
            key={group.id}
            className='group-item'
            onClick={() => handleGroupClick(group)}
          >
            <div className='group-title'>
              <div className='avatar' style={{ backgroundColor: group.color }}>
              {group.initials}
              </div>
              <div>{group.name}</div>
            </div>
            
            <div className='menu'>
              <img className='edit' src='./assets/edit3.png' alt="" onClick={(e)=> {e.stopPropagation();handleEditGroup(group)}}/>
              <img className='delete' src='./assets/delete1.png' alt="" onClick={(e)=>{e.stopPropagation();handleDeleteGroup(group.id)}}/>
            </div>
            
          </div>
        ))}
      </div>
      <button className='add-btn' onClick={() => { setShowPopup(true); }}>+</button>

      {editingGroup&& (
        <div className='popup-overlay'>
          <div className='popup-box' ref={popupRef}>
            <h2>Edit Group</h2>
            <div className='group-name'>
              <label>Group Name</label>
              <input type='text' value={newGroupName}
                onChange={(e)=>setNewGroupName(e.target.value)}/>
            </div>

            <div className='group-color'>
              <label>Choose Colour</label>
              <div className="color-options">
               {colors.map((c)=>(
               <span key={c}                               //giving unique values to each color in array
               className={`color-circle ${selectedColor===c?"selected":""}`}                                      //if c color is selected, class name changes to "color-circle c"
               style={{ backgroundColor: c }}          //backgroudColor is given with key value(c) of each element in array 
               onClick={()=>setSelectedColor(c)}></span>    //on clicking, it changes state function from setSelectedColor("") to setSelectedColor(c)
               ))}
              </div>
            </div>
            <div className="ed-btn">
              <button onClick={() => saveEditedGroup()}>Save</button>
              <button onClick={() => setEditingGroup(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Groups;
