import { useState, useEffect, useCallback } from 'react';

interface DevicePosition {
  latitude: number;
  longitude: number;
  course: number;
  speed: number;
  valid: boolean;
  serverTime: string;
  deviceTime?: string;
  fixTime?: string;
  altitude?: number;
  address?: string | null;
  accuracy?: number;
}

interface Device {
  deviceId: string;
  name: string;
  uniqueId: string;
  status: string;
  lastUpdate: string;
  position: DevicePosition;
}

interface MQTTMessage {
  position: {
    deviceId: number;
    latitude: number;
    longitude: number;
    course: number;
    speed: number;
    valid: boolean;
    serverTime: string;
    deviceTime?: string;
    fixTime?: string;
    altitude?: number;
    address?: string | null;
    accuracy?: number;
  };
  device: {
    id: number;
    name: string;
    uniqueId: string;
    status: string;
    lastUpdate: string;
  };
}

const useMQTTBuses = () => {
  const [devices, setDevices] = useState<{[key: string]: Device}>({});
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [lastMessageTime, setLastMessageTime] = useState<Date | null>(null);

  // Update device data
  const updateDevice = useCallback((deviceId: string, data: Partial<Device>) => {
    setDevices(prev => ({
      ...prev,
      [deviceId]: {
        ...prev[deviceId],
        ...data,
        lastUpdate: new Date().toISOString(),
      }
    }));
  }, []);

  // Process incoming MQTT message
  const processMQTTMessage = useCallback((data: MQTTMessage) => {
    console.log('📨 Processing MQTT message:', data);
    
    const deviceId = data.device.uniqueId || `device-${data.device.id}`;
    const deviceName = data.device.name || `Bus ${data.device.id}`;
    
    // Create device object from MQTT data
    const device: Device = {
      deviceId,
      name: deviceName,
      uniqueId: data.device.uniqueId,
      status: data.device.status || 'online',
      lastUpdate: data.device.lastUpdate || new Date().toISOString(),
      position: {
        latitude: data.position.latitude,
        longitude: data.position.longitude,
        course: data.position.course || 0,
        speed: data.position.speed || 0,
        valid: data.position.valid !== false,
        serverTime: data.position.serverTime,
        deviceTime: data.position.deviceTime,
        fixTime: data.position.fixTime,
        altitude: data.position.altitude,
        address: data.position.address,
        accuracy: data.position.accuracy,
      }
    };
    
    console.log(`📍 Device ${deviceId} position:`, {
      lat: device.position.latitude,
      lng: device.position.longitude,
      course: device.position.course,
      speed: device.position.speed,
      valid: device.position.valid,
      name: device.name
    });
    
    // Update the device in state
    updateDevice(deviceId, device);
    setLastMessageTime(new Date());
  }, [updateDevice]);

  // Clean up old devices (remove devices not updated in last 5 minutes)
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      
      setDevices(prev => {
        const updatedDevices = { ...prev };
        
        Object.keys(updatedDevices).forEach(deviceId => {
          const device = updatedDevices[deviceId];
          const lastUpdate = new Date(device.lastUpdate);
          
          if (lastUpdate < fiveMinutesAgo) {
            console.log(`🧹 Removing stale device: ${deviceId}`);
            delete updatedDevices[deviceId];
          }
        });
        
        return updatedDevices;
      });
    }, 60000); // Check every minute

    return () => clearInterval(cleanupInterval);
  }, []);

  return {
    devices,
    updateDevice,
    processMQTTMessage,
    selectedDeviceId,
    setSelectedDeviceId,
    connectionStatus,
    setConnectionStatus,
    lastMessageTime,
  };
};

export default useMQTTBuses;