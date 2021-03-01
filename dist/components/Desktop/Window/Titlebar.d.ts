import React from 'react';
export interface WindowTitlebarProps {
    title: string;
    onGrab: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onClose: () => void;
}
export declare const WindowTitlebar: React.FC<WindowTitlebarProps>;
