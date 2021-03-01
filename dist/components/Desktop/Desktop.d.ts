import React from 'react';
import { DesktopShortcut } from './Shortcut';
import { DesktopWindow } from './Window/Window';
import { DesktopTaskbar } from './Taskbar/Taskbar';
interface DesktopInnerComponents {
    Window: typeof DesktopWindow;
    Shortcut: typeof DesktopShortcut;
    Taskbar: typeof DesktopTaskbar;
}
interface DesktopProps {
}
export declare const Desktop: React.FC<DesktopProps> & DesktopInnerComponents;
export {};
