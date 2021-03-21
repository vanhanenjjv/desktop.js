import React from 'react';
import { Size } from '../../../types';

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>


export interface WindowContentProps extends DivProps {
}

export const WindowContent: React.FC<WindowContentProps> = props => {

  return (
    <div
      className="window-content"
      style={{
        flex: 1,
        overflow: 'hidden'
      }}
      {...props}>
      {props.children}
    </div>
  )
};
