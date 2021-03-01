import React from 'react';
import { Window, Size, Position } from '../../../types';
import { WindowTitlebar } from './Titlebar';
import { WindowContent } from './Content';
import { WindowFooter } from './Footer';
interface DesktopWindowInnerComponents {
    Titlebar: typeof WindowTitlebar;
    Content: typeof WindowContent;
    Footer: typeof WindowFooter;
}
export interface DesktopWindowProps extends Window {
    beforeMove?: (position: Position) => Position;
    beforeResize?: (size: Size) => Size;
}
export declare const DesktopWindow: React.FC<DesktopWindowProps> & DesktopWindowInnerComponents;
export {};
