import { Size } from './size';
import { Position } from './position';

interface Window { 
  id: number
  index: number
  title: string
  size: Size
  position: Position
  content?: React.ReactNode
  focus(): void
  destroy(): void
  afterResize?(size: Size): void
}


export type { Window };
