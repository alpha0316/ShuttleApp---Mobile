import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Svg, { G, Path, ClipPath, Rect, Defs } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Define proper types for the props
type DropPoint = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

type LocationType = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  dropPoints?: DropPoint[];
};

interface MapScreenProps {
  selectedLocation?: LocationType | null;
  selectedDropPoint?: DropPoint | null;
}

// Route coordinates type
type RouteCoordinates = {
  latitude: number;
  longitude: number;
}[];

// Custom SVG Marker Component - ALL BLUE for bus stops
const CustomMapMarker = () => {
  const markerColor = '#4285F4'; // Blue for all bus stops

  return (
    <Svg width="30" height="48" viewBox="0 0 30 48" fill="none">
      <G clipPath="url(#clip0_29022_559)">
        {/* Bottom circle (parking area) */}
        <Path 
          d="M21 42C21 38.6863 18.3137 36 15 36C11.6863 36 9 38.6863 9 42C9 45.3137 11.6863 48 15 48C18.3137 48 21 45.3137 21 42Z" 
          fill="white"
        />
        <Path 
          d="M19 42C19 39.7909 17.2091 38 15 38C12.7909 38 11 39.7909 11 42C11 44.2091 12.7909 46 15 46C17.2091 46 19 44.2091 19 42Z" 
          fill="white"
        />
        <Path 
          d="M19 42C19 39.7909 17.2091 38 15 38C12.7909 38 11 39.7909 11 42C11 44.2091 12.7909 46 15 46C17.2091 46 19 44.2091 19 42Z" 
          stroke={markerColor}
          strokeWidth="2"
        />
        
        {/* Connecting line */}
        <Path 
          d="M16 28C16 27.4477 15.5523 27 15 27C14.4477 27 14 27.4477 14 28V42C14 42.5523 14.4477 43 15 43C15.5523 43 16 42.5523 16 42V28Z" 
          fill="black"
        />
        
        {/* Top circle (main marker) */}
        <Path 
          d="M30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15Z" 
          fill={markerColor}
        />
        <Path 
          d="M21 15C21 11.6863 18.3137 9 15 9C11.6863 9 9 11.6863 9 15C9 18.3137 11.6863 21 15 21C18.3137 21 21 18.3137 21 15Z" 
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_29022_559">
          <Rect width="30" height="48" fill="white"/>
        </ClipPath>
      </Defs>
    </Svg>
  );
};

// Custom marker wrapper with label for bus stops
const CustomMarker = ({ 
  locationName
}: { 
  locationName: string;
}) => {
  return (
    <View style={styles.markerContainer}>
      <CustomMapMarker />
      <View style={styles.markerLabel}>
        <Text style={styles.markerLabelText}>{locationName}</Text>
      </View>
    </View>
  );
};

const MapScreen: React.FC<MapScreenProps> = ({ 
  selectedLocation = null, 
  selectedDropPoint = null 
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'terrain' | 'hybrid'>('standard');
  const [routes, setRoutes] = useState<{ [key: string]: RouteCoordinates }>({});
  const [loadingRoutes, setLoadingRoutes] = useState(false);
  
  // Set initial region to KNUST area
  const [region, setRegion] = useState({
    latitude: 6.672,
    longitude: -1.570,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });
  
  const mapRef = React.useRef<MapView>(null);

  // Fetch route from Google Directions API
  const fetchRoute = async (
    origin: { latitude: number; longitude: number },
    destination: { latitude: number; longitude: number },
    routeKey: string
  ) => {
    try {
      // Using Google Directions API
      // Note: You'll need to replace YOUR_API_KEY with your actual Google Maps API key
      // For production, store this in environment variables
      const GOOGLE_MAPS_API_KEY = 'AIzaSyBW23eOeYHicJMBzZ7rMa0zJODf5lVF7Do'; // Replace with your API key
      
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=driving&key=${GOOGLE_MAPS_API_KEY}`;
      

      // AIzaSyBW23eOeYHicJMBzZ7rMa0zJODf5lVF7Do
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        const points = decodePolyline(data.routes[0].overview_polyline.points);
        setRoutes(prev => ({
          ...prev,
          [routeKey]: points
        }));
      } else {
        console.log('No route found for', routeKey);
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  // Decode Google's encoded polyline format
  const decodePolyline = (encoded: string): RouteCoordinates => {
    const points: RouteCoordinates = [];
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return points;
  };

  // Fetch routes when locations change
  useEffect(() => {
    const fetchAllRoutes = async () => {
      if (!selectedLocation) {
        setRoutes({});
        return;
      }

      setLoadingRoutes(true);
      const newRoutes: { [key: string]: RouteCoordinates } = {};

      try {
        // Route from user location to start location
        if (location && selectedLocation.latitude && selectedLocation.longitude) {
          await fetchRoute(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            {
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            },
            'user-to-start'
          );
        }

        // Route from start location to selected drop point
        if (selectedDropPoint && selectedLocation.latitude && selectedLocation.longitude) {
          await fetchRoute(
            {
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            },
            {
              latitude: selectedDropPoint.latitude,
              longitude: selectedDropPoint.longitude,
            },
            'start-to-selected-drop'
          );
        }

        // Routes from start location to all drop points
        if (selectedLocation.dropPoints) {
          for (const dropPoint of selectedLocation.dropPoints) {
            if (dropPoint.latitude && dropPoint.longitude) {
              await fetchRoute(
                {
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                },
                {
                  latitude: dropPoint.latitude,
                  longitude: dropPoint.longitude,
                },
                `start-to-drop-${dropPoint.id}`
              );
            }
          }
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
      } finally {
        setLoadingRoutes(false);
      }
    };

    fetchAllRoutes();
  }, [selectedLocation, selectedDropPoint, location]);

  // Location permissions
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log('User location:', location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  // Auto-fit to show markers when we have locations
  useEffect(() => {
    if ((selectedLocation || selectedDropPoint) && mapRef.current) {
      console.log('Auto-fitting to markers...');
      setTimeout(() => {
        fitToMarkers();
      }, 1500);
    }
  }, [selectedLocation, selectedDropPoint]);

  const goToMyLocation = async () => {
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  // Fit map to show all markers
  const fitToMarkers = () => {
    if (mapRef.current) {
      const coordinates = [];
      
      console.log('Fitting to markers...');
      
      // Add user location if available
      if (location) {
        coordinates.push({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
      
      // Add selected location
      if (selectedLocation?.latitude && selectedLocation?.longitude) {
        coordinates.push({
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        });
      }
      
      // Add selected drop point
      if (selectedDropPoint?.latitude && selectedDropPoint?.longitude) {
        coordinates.push({
          latitude: selectedDropPoint.latitude,
          longitude: selectedDropPoint.longitude,
        });
      }
      
      // Add all drop points from selected location
      if (selectedLocation?.dropPoints) {
        selectedLocation.dropPoints.forEach(dropPoint => {
          if (dropPoint.latitude && dropPoint.longitude) {
            coordinates.push({
              latitude: dropPoint.latitude,
              longitude: dropPoint.longitude,
            });
          }
        });
      }

      console.log('Total coordinates to fit:', coordinates.length);
      
      if (coordinates.length > 0) {
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 100, right: 50, bottom: 100, left: 50 },
          animated: true,
        });
        console.log('Map fitted to coordinates');
      }
    }
  };

  // Get all markers to render (only bus stops - user location is handled by showsUserLocation)
  const getAllMarkers = () => {
    const markers = [];

    // Selected Start Location Marker (BLUE custom marker)
    if (selectedLocation?.latitude && selectedLocation?.longitude) {
      markers.push(
        <Marker
          key={`start-${selectedLocation.id}`}
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
          title={selectedLocation.name || "Start Location"}
          description={selectedLocation.description || "Your starting point"}
          anchor={{ x: 0.5, y: 1 }}
        >
          <CustomMarker locationName={selectedLocation.name || "Start"} />
        </Marker>
      );
    }

    // Selected Drop Point Marker (BLUE custom marker)
    if (selectedDropPoint?.latitude && selectedDropPoint?.longitude) {
      markers.push(
        <Marker
          key={`selected-drop-${selectedDropPoint.id}`}
          coordinate={{
            latitude: selectedDropPoint.latitude,
            longitude: selectedDropPoint.longitude,
          }}
          title={selectedDropPoint.name || "Drop Point"}
          description="Your selected drop-off point"
          anchor={{ x: 0.5, y: 1 }}
        >
          <CustomMarker locationName={selectedDropPoint.name || "Drop Point"} />
        </Marker>
      );
    }

    // All Drop Points from Selected Location (BLUE custom markers)
    if (selectedLocation?.dropPoints) {
      selectedLocation.dropPoints.forEach((dropPoint, index) => {
        if (dropPoint.latitude && dropPoint.longitude) {
          markers.push(
            <Marker
              key={dropPoint.id || `drop-${index}`}
              coordinate={{
                latitude: dropPoint.latitude,
                longitude: dropPoint.longitude,
              }}
              title={dropPoint.name || `Drop Point ${index + 1}`}
              description="Available drop point"
              anchor={{ x: 0.5, y: 1 }}
            >
              <CustomMarker locationName={dropPoint.name || `Drop ${index + 1}`} />
            </Marker>
          );
        }
      });
    }

    console.log('Rendering bus stop markers count:', markers.length);
    return markers;
  };

  // Render all route polylines
  const renderRoutes = () => {
    const polylines = [];

    // Route from user to start (green dashed line)
    if (routes['user-to-start']) {
      polylines.push(
        <Polyline
          key="user-to-start"
          coordinates={routes['user-to-start']}
          strokeColor="#34C759"
          strokeWidth={4}
          lineDashPattern={[10, 10]}
        />
      );
    }

    // Route from start to selected drop point (blue solid line - highlighted)
    if (routes['start-to-selected-drop'] && selectedDropPoint) {
      polylines.push(
        <Polyline
          key="start-to-selected-drop"
          coordinates={routes['start-to-selected-drop']}
          strokeColor="#007AFF"
          strokeWidth={5}
          zIndex={10}
        />
      );
    }

    // Routes from start to all other drop points (gray lines)
    if (selectedLocation?.dropPoints) {
      selectedLocation.dropPoints.forEach((dropPoint) => {
        const routeKey = `start-to-drop-${dropPoint.id}`;
        if (routes[routeKey] && dropPoint.id !== selectedDropPoint?.id) {
          polylines.push(
            <Polyline
              key={routeKey}
              coordinates={routes[routeKey]}
              strokeColor="#8E8E93"
              strokeWidth={3}
              strokeOpacity={0.6}
            />
          );
        }
      });
    }

    return polylines;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType={mapType}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={true}
        zoomEnabled={true}
        scrollEnabled={true}
        onMapReady={() => {
          console.log('Map is ready - KNUST area');
          setTimeout(fitToMarkers, 1000);
        }}
      >
        {renderRoutes()}
        {getAllMarkers()}
      </MapView>

      {/* Control Buttons */}
      <TouchableOpacity
        style={styles.customLocationButton}
        onPress={goToMyLocation}
      >
        <Icon name="my-location" size={24} color="#007AFF" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.customLocationButton, { top: 130 }]}
        onPress={fitToMarkers}
      >
        <Icon name="zoom-out-map" size={24} color="#007AFF" />
      </TouchableOpacity>

      {/* Loading indicator */}
      {loadingRoutes && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading routes...</Text>
        </View>
      )}

      {/* Error message */}
      {errorMsg && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}
    </View>
  );
};

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
  markerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4
  },
  markerLabel: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    maxWidth: 120,
    marginTop: 4,
  },
  markerLabelText: {
    fontSize: 10,
    color: '#000000',
    fontWeight: '600',
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 14,
  },
  errorContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default MapScreen;