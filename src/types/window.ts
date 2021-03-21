import { Size } from './size';
import { Position } from './position';

interface Window { 
  id: number
  title: string
  size: Size,
  minimumSize?: Size,
  maximumSize?: Size,
  position: Position
  content?: React.ReactNode

  onResize?: (size: Size) => void
}


export type { Window };
