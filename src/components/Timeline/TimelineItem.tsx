import React from 'react';
import { Panel, PanelResizeHandle } from 'react-resizable-panels';
import { Music, Video, Image, Type } from 'lucide-react';
import { Media, LyricLine } from '../../types/editor';

interface TimelineItemProps {
  item: Media | LyricLine;
  scale: number;
  isSelected: boolean;
  onResize: (id: string, startTime: number, duration: number) => void;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  scale,
  isSelected,
  onResize,
}) => {
  const isMedia = 'type' in item;
  const startTime = isMedia ? 0 : item.startTime;
  const duration = isMedia ? (item.duration || 0) : (item.endTime - item.startTime);
  
  const getIcon = () => {
    if (!isMedia) return <Type className="w-4 h-4" />;
    switch (item.type) {
      case 'audio':
        return <Music className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'image':
        return <Image className="w-4 h-4" />;
    }
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const startX = e.clientX;
    const initialDuration = duration;
    
    const handleMouseMove = (e: MouseEvent) => {
      const delta = (e.clientX - startX) / scale;
      const newDuration = Math.max(0.1, initialDuration + delta);
      onResize(item.id, startTime, newDuration);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={`absolute top-6 h-[calc(100%-24px)] cursor-move
        ${isSelected ? 'z-10 ring-2 ring-blue-500' : ''}
        ${isMedia ? 'bg-blue-600' : 'bg-green-600'}
        rounded-md opacity-90 hover:opacity-100 transition-opacity`}
      style={{
        left: `${startTime * scale}px`,
        width: `${duration * scale}px`,
      }}
    >
      <div className="flex items-center h-full px-2 space-x-2 overflow-hidden">
        {getIcon()}
        <span className="text-xs text-white truncate">
          {isMedia ? item.name : item.text}
        </span>
      </div>
      
      <div
        className="absolute right-0 top-0 bottom-0 w-2 cursor-e-resize hover:bg-white/20"
        onMouseDown={handleResizeStart}
      />
    </div>
  );
};