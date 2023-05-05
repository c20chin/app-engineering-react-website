import { useState, useEffect } from 'react';

const useVideo = (url) => {
  const [videoSrc, setVideoSrc] = useState('');
  const [isYoutube, setIsYoutube] = useState(false);

  useEffect(() => {
    if (!url) return;

    const youtubeVideoRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    const youtubePlaylistRegex = /(?:https?:\/\/)?(?:www\.)?youtube.com\/(?:playlist\?list=)([^"&?\/ ]+)/i;
    const videoMatch = url.match(youtubeVideoRegex);
    const playlistMatch = url.match(youtubePlaylistRegex);

    if (videoMatch) {
      setIsYoutube(true);
      setVideoSrc(videoMatch[1]);
    } else if (playlistMatch) {
      setIsYoutube(true);
      setVideoSrc(`videoseries?list=${playlistMatch[1]}`);
    } else {
      setIsYoutube(false);
      setVideoSrc(url);
    }
  }, [url]);

  return { videoSrc, isYoutube };
};

export default useVideo;
