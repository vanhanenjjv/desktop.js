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
  onMouseDown?: (offset: [number, number]) => void

  onBeginDrag?: () => void
  onBeginResize?: () => void

  onResize?: (size: Size) => void

  onFocus?: () => void
  onHide?: () => void
  onClose?: () => void
}

export const DesktopWindow: React.FC<DesktopWindowProps> & DesktopWindowInnerComponents = props => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (props.onResize) {
      props.onResize(props.size);
    }

  }, [props.size, props.onResize]);

  function click(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    if (!ref.current)
      return;

    if (!props.onMouseDown)
      return;

    const windowPosition: Position = [ref.current.offsetLeft, ref.current.offsetTop];
    const mousePosition: Position = [event.clientX, event.clientY];

    if (props.onFocus) props.onFocus();

    props.onMouseDown([
      mousePosition[0] - windowPosition[0],
      mousePosition[1] - windowPosition[1]
    ]);
  }

  return (
    <div
      ref={ref}
      className={`window window:${props.title.toLowerCase()}`}
      onMouseDown={click}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: props.position[0],
        top: props.position[1],
        width: props.size[0],
        height: props.size[1],
        border: '1px solid black'
      }}>
      <DesktopWindow.Titlebar
        title={props.title} 
        onGrab={props.onBeginDrag}
        onClose={props.onClose} />
      <DesktopWindow.Content>
        {props.content}
      </DesktopWindow.Content>
      <DesktopWindow.Footer onGrab={props.onBeginResize} />
    </div>
  )
}

DesktopWindow.Titlebar = WindowTitlebar
DesktopWindow.Content = WindowContent
DesktopWindow.Footer = WindowFooter
