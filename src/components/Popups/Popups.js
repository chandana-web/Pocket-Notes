import React, { useEffect, useState, useRef } from 'react';
import "../Popups/Popups.css"
import { useNotes } from '../../context/NotesContext';

const Popups = () => {

  const {setShowPopup, groups, setGroups}=useNotes();

    const [groupName, setGroupName]=useState("");
    const [selectedColor, setSelectedColor]=useState("");
    const colors=["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];

    const popupRef=useRef();                                                    //useref is used here to focused on pop-up and to avoid rendering for any evenr outside the pop-up

    useEffect(()=>{
        function handleOutSideClick(e){
            if(popupRef.current && !popupRef.current.contains(e.target)){                     
                setShowPopup(false)
            }
        }
        document.addEventListener("mousedown", handleOutSideClick);
        return ()=>document.removeEventListener("mousedown",handleOutSideClick);
    }, [setShowPopup])

    const handleSubmit=()=>{
        if(!groupName||!selectedColor){
            return alert("Please enter group name and select the color");
        }
        if(groupName.length<2)
            return alert("Group name must have atleast 2 letters!");

        if(groups.find((g)=>g.name.toLowerCase()===groupName.toLowerCase()))
            return alert("Group already exixsts!");

        const words = groupName.trim().split(" ");
        const initials = words.length > 1
       ? (words[0][0] + words[1][0]).toUpperCase()
      : (words[0][0] + words[0][1]).toUpperCase();

        const newGroup={
            id: Date.now(),
            name: groupName,
            initials,
            color: selectedColor,
            notes:[],
        }
        setGroups([...groups, newGroup]);
        setGroupName("");
        setSelectedColor("");
        setShowPopup(false);
        
    }



  return (
    <div className="popup-overlay" onClick={()=>setShowPopup(false)} >
      <div className="popup-box" ref={popupRef} onClick={(e)=>e.stopPropagation()} >            {/*To prevent bubbling up to parent element or capturing to child elements*/}
        <h2>Create New Notes</h2>

        <div className='group-name'>
        <label>Title Name</label>
        <input
          type="text"
          value={groupName}
          placeholder="Enter Title Name"
          onChange={(e)=>setGroupName(e.target.value)} //to capture given data to "groupName"
        />
        </div>

        <div className='group-color'>
        <label>Choose colour</label>
        <div className="color-options">
          {colors.map((c)=>(
            <span key={c}                               //giving unique values to each color in array
             className={`color-circle ${selectedColor===c?"selected":""}`}                                      //if c color is selected, class name changes to "color-circle c"
             style={{ backgroundColor: c }}          //backgroudColor is given with key value(c) of each element in array 
             onClick={()=>setSelectedColor(c)}></span>    //on clicking, it changes state function from setSelectedColor("") to setSelectedColor(c)
          ))}
        </div>
        </div>

       <div className='btn-row'><button className="create-btn" onClick={handleSubmit}>Create</button></div>
      </div>
    </div>
  );
}

export default Popups