import { Window } from './window';
interface Desktop {
    readonly windows: Window[];
    createWindow(window: Partial<Window>): Window;
    destroyWindow(id: number): void;
    focusWindow(id: number): void;
}
export type { Desktop };
