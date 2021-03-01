import React from 'react';
import { Position } from '../../../types';
declare type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export interface WindowFooterProps extends DivProps {
    onResizeBegin?: (position: Position) => void;
    onResize?: (position: Position) => void;
    onResizeEnd?: (position: Position) => void;
}
export declare const WindowFooter: React.FC<WindowFooterProps>;
export {};
