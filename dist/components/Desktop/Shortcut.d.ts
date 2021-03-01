import React from 'react';
import { Window } from '../../types';
export interface DesktopShortcutProps {
    name: string;
    window: Partial<Window>;
}
export declare const DesktopShortcut: React.FC<DesktopShortcutProps>;
