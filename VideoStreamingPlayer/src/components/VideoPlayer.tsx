import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  PictureInPicture,
} from 'lucide-react';

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, [videoRef.current?.duration]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if (newMutedState) {
        videoRef.current.volume = 0;
        setVolume(0);
      } else {
        videoRef.current.volume = 1;
        setVolume(1);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.parentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const togglePictureInPicture = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (videoRef.current) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error('Picture-in-Picture failed:', error);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto bg-black rounded-lg overflow-hidden shadow-xl">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
          src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
        />
        
        {/* Controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          {/* Progress bar */}
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 mb-4 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm"
          />

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              {/* Play/Pause button */}
              <button
                onClick={togglePlay}
                className="hover:text-blue-400 transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              {/* Volume controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="hover:text-blue-400 transition-colors"
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm"
                />
              </div>

              {/* Time display */}
              <div className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Picture-in-Picture button */}
              <button
                onClick={togglePictureInPicture}
                className="hover:text-blue-400 transition-colors"
              >
                <PictureInPicture size={24} />
              </button>

              {/* Fullscreen button */}
              <button
                onClick={toggleFullscreen}
                className="hover:text-blue-400 transition-colors"
              >
                {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}