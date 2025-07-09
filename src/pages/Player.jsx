import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthCredentials, selectIsAuthenticated } from '../redux/slices/authSlice';
import VideoPlayer from '../components/player/VideoPlayer';
import Spinner from '../components/core/Spinner';

const Player = () => {
  const { type, id } = useParams();
  const credentials = useSelector(selectAuthCredentials);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated || !credentials) {
    return <div className="w-screen h-screen bg-black flex items-center justify-center"><Spinner /></div>;
  }

  const { username, password, host } = credentials;
  const streamIdWithExtension = type === 'live' ? `${id}.m3u8` : id;

  // ===================================================================
  // || INÍCIO DA MUDANÇA                                             ||
  // ===================================================================
  // 1. Cria a URL original e insegura
  const originalStreamUrl = `${host}/${type}/${username}/${password}/${streamIdWithExtension}`;
  
  // 2. Cria a nova URL segura que passa pelo nosso proxy
  const streamUrl = `/api/proxy?target=${encodeURIComponent(originalStreamUrl)}`;
  // ===================================================================
  // || FIM DA MUDANÇA                                                ||
  // ===================================================================

  return (
    <div className="w-screen h-screen">
      <VideoPlayer src={streamUrl} />
    </div>
  );
};

export default Player;
