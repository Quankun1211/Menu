import React, { createContext, useContext, useMemo, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { ApiUrls } from '@/config/url';
import { useAuthStore } from '@/store/auth.store';
import Toast from 'react-native-toast-message';

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  const connectedOnce = useRef(false);
  const socketUrl = ApiUrls.apiBaseUrl.replace(/\/api\/v1\/?$/, '');
  const socket = useMemo(() => io(socketUrl, {
    autoConnect: false,
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1500,
    auth: { token },
  }), [socketUrl]);

  useEffect(() => {
    const onConnect = () => {
      if (connectedOnce.current) Toast.show({ type: 'success', text1: 'Đã kết nối lại', text2: 'Dữ liệu đang được đồng bộ.' });
      connectedOnce.current = true;
    };
    const onDisconnect = () => {
      if (connectedOnce.current) Toast.show({ type: 'info', text1: 'Mất kết nối thời gian thực', text2: 'Ứng dụng đang tự kết nối lại.' });
    };
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    if (token) {
      socket.auth = { token };
      socket.connect();
    } else {
      socket.disconnect();
    }
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
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
