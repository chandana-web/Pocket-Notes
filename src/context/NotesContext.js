import { createContext, useContext, useEffect, useState } from "react";


const NotesContext=createContext();

export const NotesProvider=({children})=>{

    const [groups, setGroups]=useState(()=>{
        const saved=localStorage.getItem("noteAppData");
        return saved?JSON.parse(saved):[];
    });

    const [activeGroup, setActiveGroup]=useState(null);

    const[showPopup, setShowPopup]=useState(false);

    const [isMobile, setIsMobile]=useState(window.innerWidth<=768);

    useEffect(()=>{
        const handleResize=()=>{
            setIsMobile(window.innerWidth<=768)
        };
        window.addEventListener("resize", handleResize);
        return ()=>window.removeEventListener("resize", handleResize);
    },[]);

    useEffect(()=>{
        localStorage.setItem("noteAppData", JSON.stringify(groups));
    }, [groups]);

    return(
        <NotesContext.Provider
        value={{
            groups,
            setGroups,
            activeGroup,
            setActiveGroup,
            showPopup,
            setShowPopup,
            isMobile,
        }}>
            {children}
        </NotesContext.Provider>
    )
}

export const useNotes=()=>useContext(NotesContext);