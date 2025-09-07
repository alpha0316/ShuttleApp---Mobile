import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Svg, { G, Path, Rect } from 'react-native-svg';

type DropPoint = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

type Location = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  dropPoints: DropPoint[];
};

interface LocationListProps {
  searchQuery?: string;
  dropOffSearchQuery?: string;
  selectedLocation?: Location | null;
  selectedDropPoint?: DropPoint | null;
  locations: Location[];
  isSelectingDropOff: boolean;
  handleDropOffPointClick: (dropPoint: DropPoint) => void;
  handleStartPointClick: (location: Location) => void;
  isMobile: boolean;
}

const LocationList: React.FC<LocationListProps> = ({
   searchQuery = '',
  dropOffSearchQuery = '',
  selectedLocation,
  selectedDropPoint,
  locations,
  isSelectingDropOff,
  handleDropOffPointClick,
  handleStartPointClick,
  isMobile,
}) => {

  console.log('Selected Location:', selectedLocation);
  console.log('Search Query:', searchQuery);
  console.log('Drop Off Search Query:', dropOffSearchQuery);
  console.log('Selected Drop Point:', selectedDropPoint);
  const filteredItems = isSelectingDropOff
    ? dropOffSearchQuery
      ? (selectedLocation?.dropPoints || []).filter((dropPoint) =>
          dropPoint.name.toLowerCase().includes(dropOffSearchQuery.toLowerCase())
        )
      : selectedLocation?.dropPoints || []
    : searchQuery
      ? locations.filter((location) =>
          location.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : locations;

  console.log('Filtered Items:', filteredItems);



  return (
    <ScrollView style={[styles.container, isMobile && styles.mobileContainer]}>
      {filteredItems.length === 0 ? (
        <Text style={styles.noResults}>
          No Bus stop found. Select closest bus stop
        </Text>
      ) : (
        filteredItems.map((item) => (
          <TouchableOpacity
            key={item.id || item.name} // Use name for dropPoints
            style={[
              styles.locationItem,
              {
                borderColor:
                  (selectedLocation?.id === item.id || selectedLocation?.name === item.name)
                    ? 'rgba(0,0,0,0.5)'
                    : 'rgba(0,0,0,0.1)',
                backgroundColor:
                  (selectedLocation?.id === item.id || selectedLocation?.name === item.name)
                    ? '#F0F8FF'
                    : '#ffffff',
              },
            ]}
            onPress={() =>
              isSelectingDropOff
                ? handleDropOffPointClick(item as DropPoint)
                : handleStartPointClick(item as Location)
            }
          >
            <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <G clip-path="url(#clip0_1161_5155)">
                <Path d="M31 8H23V10H31V31H23V33H33V10C33 9.46957 32.7893 8.96086 32.4142 8.58579C32.0391 8.21071 31.5304 8 31 8Z" fill="black" fill-opacity="0.6"/>
                <Path d="M19.88 3H6.12C5.55774 3 5.01851 3.22336 4.62093 3.62093C4.22336 4.01851 4 4.55774 4 5.12V33H22V5.12C22 4.55774 21.7766 4.01851 21.3791 3.62093C20.9815 3.22336 20.4423 3 19.88 3ZM20 31H17V28H9V31H6V5.12C6 5.10424 6.0031 5.08864 6.00913 5.07408C6.01516 5.05952 6.024 5.04629 6.03515 5.03515C6.04629 5.024 6.05952 5.01516 6.07408 5.00913C6.08864 5.0031 6.10424 5 6.12 5H19.88C19.8958 5 19.9114 5.0031 19.9259 5.00913C19.9405 5.01516 19.9537 5.024 19.9649 5.03515C19.976 5.04629 19.9848 5.05952 19.9909 5.07408C19.9969 5.08864 20 5.10424 20 5.12V31Z" fill="black" fill-opacity="0.6"/>
                <Path d="M8 8H10V10H8V8Z" fill="black" fill-opacity="0.6"/>
                <Path d="M12 8H14V10H12V8Z" fill="black" fill-opacity="0.6"/>
                <Path d="M16 8H18V10H16V8Z" fill="black" fill-opacity="0.6"/>
                <Path d="M8 13H10V15H8V13Z" fill="black" fill-opacity="0.6"/>
                <Path d="M12 13H14V15H12V13Z" fill="black" fill-opacity="0.6"/>
                <Path d="M16 13H18V15H16V13Z" fill="black" fill-opacity="0.6"/>
                <Path d="M8 18H10V20H8V18Z" fill="black" fill-opacity="0.6"/>
                <Path d="M12 18H14V20H12V18Z" fill="black" fill-opacity="0.6"/>
                <Path d="M16 18H18V20H16V18Z" fill="black" fill-opacity="0.6"/>
                <Path d="M8 23H10V25H8V23Z" fill="black" fill-opacity="0.6"/>
                <Path d="M12 23H14V25H12V23Z" fill="black" fill-opacity="0.6"/>
                <Path d="M16 23H18V25H16V23Z" fill="black" fill-opacity="0.6"/>
                <Path d="M23 13H25V15H23V13Z" fill="black" fill-opacity="0.6"/>
                <Path d="M27 13H29V15H27V13Z" fill="black" fill-opacity="0.6"/>
                <Path d="M23 18H25V20H23V18Z" fill="black" fill-opacity="0.6"/>
                <Path d="M27 18H29V20H27V18Z" fill="black" fill-opacity="0.6"/>
                <Path d="M23 23H25V25H23V23Z" fill="black" fill-opacity="0.6"/>
                <Path d="M27 23H29V25H27V23Z" fill="black" fill-opacity="0.6"/>
            </G>
            </Svg>
            <View style={styles.textContainer}>
              <Text style={styles.locationName}>{item.name}</Text>
              <Text style={styles.locationDescription}>
                {(item as Location).description || item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 12,
    display: 'flex',
    gap: 24,
    maxHeight: '40%',
    width: 360,
  },
  mobileContainer: {
    width: '100%', // Adjust for mobile
    maxHeight: 300, // Adjust height for mobile
    display: 'flex',
    gap: 16,
  },
  noResults: {
    fontSize: 14,
    color: 'black',
  },
  locationItem: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    width: '100%',
    // justifyContent: 'flex-start',
    marginBottom: 8
  },
  textContainer: {
    flexDirection: 'column',
    gap: 2,
  },
  locationName: {
    fontSize: 14,
    margin: 0,
  },
  locationDescription: {
    fontSize: 12,
    margin: 0,
    color: 'rgba(0,0,0,0.6)',
  },
});

export default LocationList;