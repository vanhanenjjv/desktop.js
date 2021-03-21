import React from 'react';


export interface WindowTitlebarProps {
  title: string
  onGrab?: () => void
  onClose?: () => void
}

export const WindowTitlebar: React.FC<WindowTitlebarProps> = ({ title, onClose, onGrab }) => {
  return (
    <div 
      style={{ 
        height: 32,
        display: 'flex',
        padding: '0 8px',
        alignItems: 'center',
        background: 'gray',
        userSelect: 'none'
      }} 
      onMouseDown={onGrab}>
    <p 
      style={{ 
        flex: 1,
        margin: 0
      }}>
      {title}
    </p>
    <div>
      <button onClick={onClose}>X</button>
    </div>
  </div>
  )
};
