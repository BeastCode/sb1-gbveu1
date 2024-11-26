import React, { useState } from 'react';
import { Play, Pause, Plus, Settings, Download } from 'lucide-react';
import { MediaUploader } from './components/MediaLibrary/MediaUploader';
import { MediaList } from './components/MediaLibrary/MediaList';
import { TimelineTrack } from './components/Timeline/TimelineTrack';
import { LyricTimeline } from './components/LyricEditor/LyricTimeline';
import { FormatSelector } from './components/FormatSelector';
import { useEditorStore } from './store/editorStore';

function App() {
  const [showFormatSelector, setShowFormatSelector] = useState(true);
  const { timeline, isPlaying, togglePlayback, selectItem, projectSettings } = useEditorStore();

  if (showFormatSelector) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold">Choose Video Format</h2>
            <p className="text-gray-400 mt-2">Select the format that best suits your needs</p>
          </div>
          <FormatSelector />
          <div className="p-4 border-t border-gray-700 flex justify-end">
            <button
              onClick={() => setShowFormatSelector(false)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  const aspectRatio = `${projectSettings.width} / ${projectSettings.height}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Lyric Video Editor</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowFormatSelector(true)}
              className="p-2 hover:bg-gray-700 rounded-lg"
            >
              <Settings className="h-5 w-5" />
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 grid grid-cols-12 gap-4">
        <div className="col-span-3 bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Media Library</h2>
            <button className="p-2 hover:bg-gray-700 rounded-lg">
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <MediaUploader />
          <MediaList />
        </div>

        <div className="col-span-9 space-y-4">
          <div className="bg-gray-800 rounded-lg flex items-center justify-center p-4">
            <div 
              className="bg-black rounded-lg overflow-hidden"
              style={{
                aspectRatio,
                width: '100%',
                maxHeight: 'calc(100vh - 400px)',
              }}
            >
              <div className="text-gray-500 h-full flex items-center justify-center">
                Preview Window
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
            <button
              onClick={togglePlayback}
              className="p-2 hover:bg-gray-700 rounded-lg"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>
            <div className="flex-1">
              <LyricTimeline />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden">
            {timeline.tracks.map((track) => (
              <TimelineTrack
                key={track.id}
                track={track}
                onItemClick={selectItem}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;