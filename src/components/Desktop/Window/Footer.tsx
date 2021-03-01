import React from 'react';
import { Position, Size } from '../../../types';

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>


export interface WindowFooterProps extends DivProps {
  onResizeBegin?: (position: Position) => void;
  onResize?: (position: Position) => void
  onResizeEnd?: (position: Position) => void;
}

export const WindowFooter: React.FC<WindowFooterProps> = ({ onResizeBegin, onResize, onResizeEnd, ...props }) => {
  const [grabbed, setGrabbed] = React.useState(false);
  const [cursor, setCursor] = React.useState<Position>([0, 0]);

  return (
    <div 
      {...props}
      style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
      <span 
        onMouseDown={grab}
        onMouseLeave={release}
        onMouseUp={release}
        onMouseMove={resize}>...</span>
    </div>
  )

  function grab({ clientX, clientY }: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    setGrabbed(true);

    setCursor([clientX, clientY]);

    console.log('window:footer:grab');
  }

  function release({ clientX, clientY }: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    setGrabbed(false);

    console.log('window:footer:release');
  }

  function resize({ clientX, clientY }: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if (!grabbed)
      return;

    console.log('window:footer:resize');

    const offset: Size = [
      clientX - cursor[0],
      clientY - cursor[1]
    ];

    setCursor([clientX, clientY]);

    onResize && onResize(offset);
  }
};
