import React from 'react';

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>


export interface WindowContentProps extends DivProps {
}

export const WindowContent: React.FC<WindowContentProps> = props => {
  return (
    <div {...props}>
      {props.children}
    </div>
  )
};
