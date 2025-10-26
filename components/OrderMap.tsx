import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

interface RiderInfo {
  name: string;
  vehicleNumber: string;
  rating: number;
  eta: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const OrdersMap = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'terrain' | 'hybrid'>('standard');
  const [region, setRegion] = useState({
    latitude: 5.6037,
    longitude: -0.1870,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const mapRef = React.useRef<MapView>(null);

  // Mock rider info - replace with actual order data
  const [riderInfo] = useState<RiderInfo>({
    name: 'Kwame Mensah',
    vehicleNumber: 'GR 1234-21',
    rating: 4.8,
    eta: '5 mins',
    location: {
      latitude: 5.6137, // Slightly offset from user location
      longitude: -0.1770,
    },
  });

  // Pickup and dropoff locations
  const [pickupLocation] = useState({
    latitude: 5.6037,
    longitude: -0.1870,
    title: 'Pickup Point',
    description: 'University Campus',
  });

  const [dropoffLocation] = useState({
    latitude: 5.6237,
    longitude: -0.1670,
    title: 'Drop-off Point',
    description: 'Airport Terminal 2',
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const goToMyLocation = async () => {
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: location.coords.latitude - 0.005,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const fitToRoute = () => {
    mapRef.current?.fitToCoordinates(
      [pickupLocation, riderInfo.location, dropoffLocation],
      {
        edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
        animated: true,
      }
    );
  };

  useEffect(() => {
    // Fit map to show all points when component mounts
    setTimeout(() => {
      fitToRoute();
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType={mapType}
        initialRegion={region}
        showsUserLocation={false}
        showsCompass={true}
        zoomEnabled={true}
        scrollEnabled={true}
      >
        {/* Route line from pickup to dropoff */}
        <Polyline
          coordinates={[pickupLocation, riderInfo.location, dropoffLocation]}
          strokeColor="#34A853"
          strokeWidth={4}
          lineDashPattern={[1]}
        />

        {/* Pickup Location Marker */}
        <Marker
          coordinate={pickupLocation}
          title={pickupLocation.title}
          description={pickupLocation.description}
          pinColor="#34A853"
        >
          <View style={styles.pickupMarker}>
            <Icon name="place" size={40} color="#34A853" />
          </View>
        </Marker>

        {/* Drop-off Location Marker */}
        <Marker
          coordinate={dropoffLocation}
          title={dropoffLocation.title}
          description={dropoffLocation.description}
        >
          <View style={styles.dropoffMarker}>
            <Icon name="place" size={40} color="#EA4335" />
          </View>
        </Marker>

        {/* Rider Location Marker */}
        <Marker
          coordinate={riderInfo.location}
          title={`Rider: ${riderInfo.name}`}
          description={`Vehicle: ${riderInfo.vehicleNumber}`}
        >
          <View style={styles.riderMarker}>
            <View style={styles.riderIconContainer}>
              <Text style={styles.riderIcon}>🚐</Text>
            </View>
          </View>
        </Marker>
      </MapView>

      {/* Rider Info Card */}
      <View style={styles.riderCard}>
        <View style={styles.riderCardHeader}>
          <View style={styles.riderAvatar}>
            <Text style={styles.riderAvatarText}>
              {riderInfo.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          
          <View style={styles.riderDetails}>
            <Text style={styles.riderName}>{riderInfo.name}</Text>
            <View style={styles.riderMeta}>
              <Icon name="directions-car" size={14} color="#666" />
              <Text style={styles.vehicleNumber}>{riderInfo.vehicleNumber}</Text>
              <Text style={styles.separator}>•</Text>
              <Icon name="star" size={14} color="#FFA500" />
              <Text style={styles.rating}>{riderInfo.rating}</Text>
            </View>
          </View>

          <View style={styles.etaContainer}>
            <Text style={styles.etaLabel}>ETA</Text>
            <Text style={styles.etaValue}>{riderInfo.eta}</Text>
          </View>
        </View>

        <View style={styles.riderActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="phone" size={20} color="#34A853" />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="message" size={20} color="#34A853" />
            <Text style={styles.actionButtonText}>Message</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => console.log('Cancel ride')}
          >
            <Icon name="close" size={20} color="#EA4335" />
            <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Location Button */}
      <TouchableOpacity 
        style={styles.customLocationButton}
        onPress={goToMyLocation}
      >
        <Icon name="my-location" size={24} color="#007AFF" />
      </TouchableOpacity>

      {/* Recenter Button */}
      <TouchableOpacity 
        style={styles.recenterButton}
        onPress={fitToRoute}
      >
        <Icon name="center-focus-strong" size={24} color="#007AFF" />
      </TouchableOpacity>

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, styles.statusActive]} />
          <Text style={styles.statusText}>Rider on the way</Text>
        </View>
      </View>
    </View>
  );
};

export default OrdersMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  map: {
    width: width,
    height: height,
  },
  customLocationButton: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recenterButton: {
    position: 'absolute',
    top: 130,
    right: 20,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pickupMarker: {
    alignItems: 'center',
  },
  dropoffMarker: {
    alignItems: 'center',
  },
  riderMarker: {
    alignItems: 'center',
  },
  riderIconContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 3,
    borderColor: '#34A853',
  },
  riderIcon: {
    fontSize: 32,
  },
  riderCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  riderCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  riderAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#34A853',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  riderAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  riderDetails: {
    flex: 1,
  },
  riderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  riderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleNumber: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  separator: {
    fontSize: 13,
    color: '#999',
    marginHorizontal: 6,
  },
  rating: {
    fontSize: 13,
    color: '#666',
    marginLeft: 2,
    fontWeight: '600',
  },
  etaContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  etaLabel: {
    fontSize: 11,
    color: '#F57C00',
    fontWeight: '600',
  },
  etaValue: {
    fontSize: 18,
    color: '#E65100',
    fontWeight: 'bold',
  },
  riderActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34A853',
  },
  cancelButton: {
    backgroundColor: '#FFEBEE',
  },
  cancelButtonText: {
    color: '#EA4335',
  },
  statusBar: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusActive: {
    backgroundColor: '#34A853',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});