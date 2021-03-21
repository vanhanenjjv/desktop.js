import React from 'react';

import { Context } from '../../context';
import { useAutoIncrementingId } from '../../hooks';
import { Position, Size, Window } from '../../types';

import { DesktopShortcut } from './Shortcut';
import { DesktopWindow } from './Window/Window';
import { DesktopTaskbar } from './Taskbar/Taskbar';


function useArrayTop<T>(array: T[]): T | undefined {
  return React.useMemo(
    () => {
      if (array.length === 0)
        return undefined;

      return array[array.length - 1];
    },
    [array]
  );
}


type CursorState = 'default' | 'resizing' | 'dragging';

type Cursor = 
  { position: Position
    offset: [number, number]
    state: CursorState }

type Model = 
  { cursor: Cursor
    windows: Window[] }

type Message =
  | { type: 'CREATE_WINDOW', window: Window }
  | { type: 'DESTROY_WINDOW', window: Window }
  | { type: 'UPDATE_WINDOW', window: Window }
  | { type: 'FOCUS_WINDOW', window: Window }
  | { type: 'SET_CURSOR_OFFSET', offset: [number, number] }
  | { type: 'SET_CURSOR_POSITION', position: Position }
  | { type: 'SET_CURSOR_STATE', state: CursorState }

function useModel() {
  const initialValue: Model = {
    cursor: {
      position: [0, 0],
      offset: [0, 0],
      state: 'default'
    },
    windows: []
  };

  function reducer(model: Model = initialValue, message: Message): Model {
    switch (message.type) {
      case 'CREATE_WINDOW': {
        console.log(model.windows)
        return {
          ...model,
          windows: [...model.windows, message.window]
        }
      }
      case 'DESTROY_WINDOW': {
        return {
          ...model
        }
      }
      case 'UPDATE_WINDOW': {
        return {
          ...model,
          windows: [
            ...model.windows.filter(window => window.id !== message.window.id),
            message.window
          ]
        }
      }
      case 'FOCUS_WINDOW': {
        return {
          ...model,
          windows: [
            ...model.windows.filter(window => window.id !== message.window.id),
            message.window
          ]
        }
      }
      case 'SET_CURSOR_OFFSET': {
        return {
          ...model,
          cursor: {
            ...model.cursor,
            offset: message.offset
          }
        }
      }
      case 'SET_CURSOR_POSITION': {
        return {
          ...model,
          cursor: {
            ...model.cursor,
            position: message.position
          }
        }
      }
      case 'SET_CURSOR_STATE': {
        return {
          ...model,
          cursor: {
            ...model.cursor,
            state: message.state
          }
        }
      }
    }
  }

  return React.useReducer(reducer, initialValue);
}

interface DesktopInnerComponents {
  Window: typeof DesktopWindow,
  Shortcut: typeof DesktopShortcut,
  Taskbar: typeof DesktopTaskbar
}

interface DesktopProps {}

export const Desktop: React.FC<DesktopProps> & DesktopInnerComponents = props => {
  const [{ windows, cursor }, update] = useModel();
  const getId = useAutoIncrementingId();
  const ref = React.useRef<HTMLDivElement>(null);
  const activeWindow = useArrayTop(windows);

  function drag(window: Window) {
    const position: Position = [
      cursor.position[0] - cursor.offset[0],
      cursor.position[1] - cursor.offset[1]
    ]

    update({
      type: 'UPDATE_WINDOW',
      window: { ...window, position: position }
    })
  }

  function resize(window: Window) {
    const size: Size = [
      cursor.position[0] - window.position[0],
      cursor.position[1] - window.position[1]
    ];

    if (window.maximumSize) {
      size[0] = Math.min(size[0], window.maximumSize[0]);
      size[1] = Math.min(size[1], window.maximumSize[1]);
    }

    if (window.minimumSize) {
      size[0] = Math.max(size[0], window.minimumSize[0]);
      size[1] = Math.max(size[1], window.minimumSize[1]);
    }

    update({ type: 'UPDATE_WINDOW', window: { ...window, size }})
  }

  function focus(window: Window): void {
    update({ type: 'FOCUS_WINDOW', window })
  };

  function destroy(window: Window): void {
    update({ type: 'DESTROY_WINDOW', window })
  };


  function create({ title, size, position, content, onResize, minimumSize, maximumSize }: Partial<Window>): Window {
    const window: Window = {
      id: getId(),
      title: title ?? "window",
      size: size ?? [400, 300],
      position: position ?? [0, 0],
      content: content,
      minimumSize,
      maximumSize,
      onResize
    };

    update({ type: 'CREATE_WINDOW', window });

    return window;
  };

  function cursorType(): 'grabbing' | 'nw-resize' | 'default' {
    switch (cursor.state) {
      case 'default': return 'default';
      case 'dragging': return 'grabbing';
      case 'resizing': return 'nw-resize';
    }
  }

  return (
    <Context.Provider value={{ windows, create, destroy, focus }}>
      <div
        ref={ref} 
        className="desktop"
        style={{
          height: '100%',
          width: '100%',
          cursor: cursorType()
        }}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}>
        {props.children}
        {windows.map(window => (
          <DesktopWindow 
            key={window.id}
            onMouseDown={mouseDown}
            onBeginDrag={beginDrag}
            onBeginResize={beginResize}
            onClose={() => destroy(window)}
            onFocus={() => focus(window)}
            {...window} />
          ))}
      </div>
    </Context.Provider>
  );

  function beginResize(): void {
    update({ type: 'SET_CURSOR_STATE', state: 'resizing' });
  }

  function beginDrag(): void {
    update({ type: 'SET_CURSOR_STATE', state: 'dragging' });
  }

  function mouseUp() {
    if (cursor.state !== 'default')
      update({ type: 'SET_CURSOR_STATE', state: 'default' });
  }

  function mouseDown(offset: [number, number]): void {
    update({ type: 'SET_CURSOR_OFFSET', offset });
  }

  function mouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const position: Position = [event.clientX, event.clientY];

    if (activeWindow) {
      if (cursor.state === 'dragging') drag(activeWindow);
      if (cursor.state === 'resizing') resize(activeWindow);
    }

    update({ type: 'SET_CURSOR_POSITION', position })
  }
}

Desktop.Window = DesktopWindow
Desktop.Shortcut = DesktopShortcut
Desktop.Taskbar = DesktopTaskbar
