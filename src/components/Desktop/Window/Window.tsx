import React from 'react'

import { Window, Size, Position } from '../../../types'

import { WindowTitlebar } from './Titlebar';
import { WindowContent } from './Content';
import { WindowFooter } from './Footer';


interface DesktopWindowInnerComponents {
  Titlebar: typeof WindowTitlebar
  Content: typeof WindowContent
  Footer: typeof WindowFooter
}

export interface DesktopWindowProps extends Window {
  beforeMove?: (position: Position) => Position
  beforeResize?: (size: Size) => Size
}

export const DesktopWindow: React.FC<DesktopWindowProps> & DesktopWindowInnerComponents = props => {
  const [position, setPosition]   = React.useState<Position>(props.position);
  const [size, setSize]           = React.useState<Size>(props.size);
  const [draggable, setDraggable] = React.useState<boolean>(false);
  const [offset, setOffset]       = React.useState<Position>([0, 0]);

  const [resizePosition, setResizePosition] = React.useState<Position>([0, 0]);

  const { title, focus, destroy, beforeMove, beforeResize, children } = props;

  React.useEffect(() => {
    console.log('size', size);
  }, [size]);

  return (
    <div
      className={`window window:${title.toLowerCase()}`}
      onMouseUp={release}
      onMouseMove={drag}
      onMouseLeave={release}
      onClick={focus}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: position[0],
        top: position[1],
        width: size[0],
        height: size[1],
        border: '1px solid black'
      }}>
      <DesktopWindow.Titlebar
        title={title} 
        onGrab={grab}
        onClose={destroy} />
      <DesktopWindow.Content style={{ flex: 1 }}>
        {props.content}
      </DesktopWindow.Content>
      <DesktopWindow.Footer
        onResizeBegin={setResizePosition}
        onResizeEnd={() => setResizePosition([0, 0])}
        onResize={onResize} />
    </div>
  )

  function onResize([w, h]: Position) {

    console.log('Resize', [w, h])

    setSize([
      size[0] + w,
      size[1] + h
    ]);
  }

  function grab({ clientX, clientY }: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setOffset([
      position[0] - clientX, 
      position[1] - clientY
    ]);
    setDraggable(true);
  }

  function release() {
    setDraggable(false);
  }

  function drag({ clientX, clientY }: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!draggable)
      return;

    const newPosition: Position = [clientX + offset[0], clientY + offset[1]]

    setPosition(
      beforeMove ? beforeMove(newPosition) : newPosition
    )
  }
}

DesktopWindow.Titlebar = WindowTitlebar
DesktopWindow.Content = WindowContent
DesktopWindow.Footer = WindowFooter
