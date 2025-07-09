import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Guarda de segurança definitiva. Se src for nulo ou indefinido, não fazemos nada.
    if (!src) {
      return;
    }

    let hls;
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // A verificação .includes() agora está segura dentro deste bloco
    if (src.includes('.m3u8')) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoElement.play().catch(e => console.error("Autoplay foi bloqueado", e));
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) console.error('Erro fatal do HLS.js', data);
        });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = src;
        videoElement.play().catch(e => console.error("Autoplay foi bloqueado", e));
      }
    } else {
      videoElement.src = src;
      videoElement.play().catch(e => console.error("Autoplay foi bloqueado", e));
    }

    // Função de limpeza
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        controls
        className="w-full h-full"
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default VideoPlayer;