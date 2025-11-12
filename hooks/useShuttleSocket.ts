import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// 🔗 Server endpoint
const SOCKET_SERVER_URL = 'wss://shuttle-backend-0.onrender.com';

export const useShuttleSocket = () => {
  const [shuttles, setShuttles] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'], // ✅ Required for React Native
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      timeout: 10000,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
    //   console.log('✅ Connected to shuttle server:', newSocket.id);
      setIsConnected(true);

      const userData = {
        name: 'Mobile User',
        busStopId: 'BUS-STOP-001',
        busStopName: 'Main Campus Stop',
      };

      console.log('🚏 Joining as user:', userData);
      newSocket.emit('user-connect', userData);
    });

    newSocket.on('user-connected', (data: any) => {
    //   console.log('✅ Server response after connect:', data);
    });

    newSocket.on('shuttle-locations', (data: any[]) => {
    //   console.log('🚌 Received shuttle updates:', data);
      setShuttles(data);
    });

    newSocket.on('disconnect', () => {
      console.warn('❌ Disconnected from shuttle server');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (err: any) => {
      console.error('⚠️ Connection error:', err.message);
    });

    // 🧹 Cleanup when unmounted
    return () => {
      console.log('🧹 Cleaning up socket connection');
      newSocket.disconnect();
    };
  }, []);

  return { shuttles, isConnected, socket };
};
