import React from 'react';
import { DesktopWindow } from '../../components/Desktop/Window';
import { useAutoIncrementingId } from '../../hooks/useAutoIncrementingId';

import { Desktop, Window } from '../../types';


export const Context = React.createContext<Desktop>({} as Desktop);


export const DesktopProvider: React.FC = ({ children }) => {
  const [windows, setWindows] = React.useState<Window[]>([]);
  const getId = useAutoIncrementingId();

  function focusWindow(_id: number): void {
    
  }

  function destroyWindow(id: number): void {
    console.log(id);

    console.log(windows)

    const battleryoales = windows.filter(window => window.id !== id)

    console.log('battle ryoales', battleryoales);

    setWindows(battleryoales);
  }

  function createWindow(partialWindow: Partial<Window>): Window {
    console.log('yeyyeyeyyeeyt')
    const id = getId();

    const window = {
      id,
      title:    partialWindow.title    ?? "window",
      size:     partialWindow.size     ?? [400, 300],
      position: partialWindow.position ?? [0, 0],
      content:  partialWindow.content,
      index:    0,
      destroy:  () => destroyWindow(Number(id)),
      focus:    () => focusWindow(Number(id))
    }

    setWindows([...windows, window])

    console.log('ooooooo')

    return window;
  }

  console.log('wtff')

  return (
    <Context.Provider 
      value={{
        windows,
        createWindow,
        destroyWindow,
        focusWindow
      }}>
      {children}
      {windows.map(window => <DesktopWindow key={window.id} {...window} />)}
    </Context.Provider>
  );
}
