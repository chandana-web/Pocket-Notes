import React from 'react'
import "../Welcome/Welcome.css"



const Welcome = () => {
  return (
    <div className='welcome-section'>
        <img className='welcome-img'
        src="./assets/img.pn.png" alt=''/>
        <h1>Pocket Notes</h1>
        <p className='welcome-text'>Organize your thoughts, ideas, and reminders effortlessly.<br/>
        Stay productive with Pocket Notes, your digital notebook that never forgets.
        </p>
        <div className='footer'>
            <span>🔒 End-to-End Encrypted</span>
        </div>


    </div>
  )
}

export default Welcome