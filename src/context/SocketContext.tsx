import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { ApiUrls } from '@/config/url';
import { useAuthStore } from '@/store/auth.store';

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  const socketUrl = ApiUrls.apiBaseUrl.replace(/\/api\/v1\/?$/, '');
  const socket = useMemo(() => io(socketUrl, {
    autoConnect: false,
    transports: ['websocket'],
    auth: { token },
  }), [socketUrl]);

  useEffect(() => {
    if (token) {
      socket.auth = { token };
      socket.connect();
    } else {
      socket.disconnect();
    }
    return () => {
      socket.disconnect();
    };
  }, [socket, token]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
