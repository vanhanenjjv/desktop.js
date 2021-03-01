import React from 'react';

import { useDesktop } from '../../hooks';

import { DesktopShortcut } from './Shortcut';
import { DesktopWindow } from './Window/Window';
import { DesktopTaskbar } from './Taskbar/Taskbar';


interface DesktopInnerComponents {
  Window:   typeof DesktopWindow,
  Shortcut: typeof DesktopShortcut,
  Taskbar:  typeof DesktopTaskbar
}

interface DesktopProps {

}

export const Desktop: React.FC<DesktopProps> & DesktopInnerComponents = props => {
  const desktop = useDesktop();

  return (
    <div 
      className="desktop"
      style={{ 
        display: 'grid',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
      {props.children}
      {desktop.windows.map(window => { console.log(window.id); return (
        <div key={window.id}>
          <p>shit</p>
        <Desktop.Window  {...window}>
          {window.content}
        </Desktop.Window>
        </div>
      ) })}
    </div>
  )
}

Desktop.Window = DesktopWindow
Desktop.Shortcut = DesktopShortcut
Desktop.Taskbar = DesktopTaskbar
