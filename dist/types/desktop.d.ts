import { Window } from './window';
interface Desktop {
    readonly windows: Window[];
    create: (window: Partial<Window>) => Window;
    destroy: (window: Window) => void;
    focus: (window: Window) => void;
}
export type { Desktop };
