import React from 'react';
import { Music, Image, Video, Trash2 } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { Media } from '../../types/editor';

export const MediaList: React.FC = () => {
  const { mediaLibrary, removeMedia } = useEditorStore();

  const handleDragStart = (e: React.DragEvent, media: Media) => {
    e.dataTransfer.setData('application/json', JSON.stringify(media));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const renderPreview = (media: Media) => {
    if (media.type === 'audio') {
      return <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center">
        <Music className="w-8 h-8 text-gray-400" />
      </div>;
    }

    if (media.type === 'video' && media.thumbnail) {
      return <div className="relative w-16 h-16">
        <img src={media.thumbnail} alt={media.name} className="w-full h-full object-cover rounded" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Video className="w-6 h-6 text-white" />
        </div>
      </div>;
    }

    if (media.type === 'image') {
      return <img src={media.url} alt={media.name} className="w-16 h-16 object-cover rounded" />;
    }

    return null;
  };

  return (
    <div className="mt-4 space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
      {mediaLibrary.map((media) => (
        <div
          key={media.id}
          draggable
          onDragStart={(e) => handleDragStart(e, media)}
          className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-move group"
        >
          <div className="flex items-center space-x-3">
            {renderPreview(media)}
            <div className="flex flex-col">
              <span className="text-sm font-medium truncate max-w-[150px]">
                {media.name}
              </span>
              <span className="text-xs text-gray-400">
                {media.type}
                {media.duration && ` • ${Math.round(media.duration)}s`}
              </span>
            </div>
          </div>
          <button
            onClick={() => removeMedia(media.id)}
            className="p-1 hover:bg-gray-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      ))}
      {mediaLibrary.length === 0 && (
        <div className="text-center text-gray-500 py-4">
          No media files added yet
        </div>
      )}
    </div>
  );
};