import React from 'react';
import { Window, Size } from '../../../types';
import { WindowTitlebar } from './Titlebar';
import { WindowContent } from './Content';
import { WindowFooter } from './Footer';
interface DesktopWindowInnerComponents {
    Titlebar: typeof WindowTitlebar;
    Content: typeof WindowContent;
    Footer: typeof WindowFooter;
}
export interface DesktopWindowProps extends Window {
    onMouseDown?: (offset: [number, number]) => void;
    onBeginDrag?: () => void;
    onBeginResize?: () => void;
    onResize?: (size: Size) => void;
    onFocus?: () => void;
    onHide?: () => void;
    onClose?: () => void;
}
export declare const DesktopWindow: React.FC<DesktopWindowProps> & DesktopWindowInnerComponents;
export {};
