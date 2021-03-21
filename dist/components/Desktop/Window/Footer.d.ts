import React from 'react';
declare type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export interface WindowFooterProps extends DivProps {
    onGrab?: () => void;
}
export declare const WindowFooter: React.FC<WindowFooterProps>;
export {};
