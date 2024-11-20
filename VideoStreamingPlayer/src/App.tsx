import React from 'react';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Video Player
        </h1>
        <VideoPlayer />
      </div>
    </div>
  );
}

export default App;