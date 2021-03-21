import React from 'react';
import { Position, Size } from '../../../types';

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>


export interface WindowFooterProps extends DivProps {
  onGrab?: () => void
}

export const WindowFooter: React.FC<WindowFooterProps> = ({ onGrab, ...props }) => {
  return (
    <div 
      {...props}
      style={{
        userSelect: 'none',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
      <span onMouseDown={onGrab}>XXXX</span>
    </div>
  )
};
