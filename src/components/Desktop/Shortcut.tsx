import React from 'react'
// import { useDesktop } from '../../hooks';
import { Context } from '../../context';
import { Desktop, Window } from '../../types';

export interface DesktopShortcutProps { 
  name: string
  window: Partial<Window>
}

export const DesktopShortcut: React.FC<DesktopShortcutProps> = props => {
  const desktop = React.useContext(Context);

  const run = () => {
    desktop.create(props.window);
  }

  return (
    <div 
      className={`shortcut shortcut:${props.name.toLowerCase()}`}
      style={{
        width: 64,
        height: 64,
        borderRadius: '4px',
        border: '1px solid black'
      }}
      onClick={run}>
      {props.name}
    </div>
  );
};
