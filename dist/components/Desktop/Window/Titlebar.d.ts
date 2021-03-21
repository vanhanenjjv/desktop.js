import React from 'react';
export interface WindowTitlebarProps {
    title: string;
    onGrab?: () => void;
    onClose?: () => void;
}
export declare const WindowTitlebar: React.FC<WindowTitlebarProps>;
