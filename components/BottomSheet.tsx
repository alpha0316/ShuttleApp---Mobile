import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Image } from 'react-native';
import Svg, { Path, Mask, G } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import OpenMap from '../components/OpenMap';
import LocationList from '../components/LocationList';
import { locations } from '../app/data/location';


type DropPoint = {
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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedDropPoint, setSelectedDropPoint] = useState<DropPoint | null>(null);
  const [isSelectingDropOff, setIsSelectingDropOff] = useState(false);
  const [isMobile, setIsMobile] = useState(Dimensions.get('window').width <= 600);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [dropOffSearchQuery, setDropOffSearchQuery] = useState('');
  const [dropOffSelected, setDropOffSelected] = useState<Location | null>(null);
  const [showTracker, setShowTracker] = useState(false);
  const [showGeneral, SetShowGeneral] = useState(true);
  const [showBusStop, SetShowBusStop] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const textInputRef = useRef(null);

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

  // Define the BottomSheetRef type if not imported from a library
  type BottomSheetRef = {
    scrollTo: (position: number) => void;
    isActive?: () => boolean;
  };
  
    const ref = useRef<BottomSheetRef>(null);

  const BusIcon = ({
    width = 84,
    height = 27,
    color = "#34A853",
    ...props
  }) => {
    return (
      <Svg width={width} height={height} viewBox="0 0 84 27" fill="none" {...props}>
        <Mask id="mask0_933_1781" maskUnits="userSpaceOnUse" x="0" y="0" width="84" height="27">
          <Path d="M83.2118 0.595215H0.460938V26.5118H83.2118V0.595215Z" fill="white" />
        </Mask>
        <G mask="url(#mask0_933_1781)">
          <Path d="M57.5742 5.56278C57.5046 5.70528 57.4365 5.84777 57.3654 5.99472C49.387 6.06596 41.4071 6.13722 33.1859 6.20995C33.1859 10.985 33.1859 15.7614 33.1859 20.6804C33.6613 20.9268 33.9382 20.9283 34.467 20.9372C34.6447 20.9417 34.8224 20.9446 35.0061 20.9491C35.1986 20.9506 35.3911 20.9535 35.5896 20.958C35.7866 20.961 35.985 20.9654 36.1879 20.9699C36.8203 20.9818 37.4528 20.9936 38.0852 21.004C38.916 21.0189 39.7484 21.0352 40.5792 21.0515C40.7718 21.0545 40.9643 21.0574 41.1628 21.0604C41.3405 21.0649 41.5197 21.0678 41.7033 21.0723C41.8603 21.0738 42.0173 21.0767 42.1788 21.0797C42.5668 21.1124 42.5668 21.1124 42.983 21.3291C42.983 21.4716 42.983 21.614 42.983 21.761C30.6014 21.761 18.2199 21.761 5.46372 21.761C5.39559 21.476 5.32597 21.1895 5.25488 20.8971C5.53036 20.8971 5.80584 20.8971 6.08872 20.8971C6.08872 16.4784 6.08872 12.0596 6.08872 7.50573C8.08368 7.50573 10.0786 7.50573 12.1343 7.50573C12.1343 6.86451 12.1343 6.2233 12.1343 5.56278C17.9667 5.52865 23.799 5.49747 29.6314 5.4663C32.3387 5.45294 35.0461 5.43809 37.7549 5.42325C40.1142 5.4084 42.4735 5.39655 44.8328 5.38468C46.0828 5.37874 47.3328 5.37131 48.5828 5.36388C49.7587 5.35646 50.9347 5.35052 52.1091 5.34459C52.5416 5.3431 52.9741 5.34013 53.4065 5.33716C53.9945 5.33419 54.584 5.33123 55.1719 5.32826C55.3452 5.32677 55.517 5.3253 55.6948 5.32382C56.3775 5.32233 56.9225 5.33717 57.5742 5.56278Z" fill={color} />
        </G>
      </Svg>
    );
  };

  const BackArrow = ({ onPress, width = 7, height = 14, strokeColor = 'black', strokeOpacity = 0.6, strokeWidth = 1.5, ...props }) => {
    const handlePress = typeof onPress === 'function' ? onPress : () => console.warn('onPress is not a function');
    return (
      <TouchableOpacity onPress={handlePress} {...props}>
        <Svg width={width} height={height} viewBox="0 0 7 14" fill="none">
          <Path
            d="M6.00022 12.2802L1.65355 7.93355C1.14022 7.42021 1.14022 6.58021 1.65355 6.06688L6.00022 1.72021"
            stroke={strokeColor}
            strokeOpacity={strokeOpacity}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
    );
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  useEffect(() => {
    if (selectedDropPoint) {
      setShowTracker(true);
      // Open the bottom sheet when tracker is shown
      ref?.current?.scrollTo(-SCREEN_HEIGHT * 0.6);
    }
  }, [selectedDropPoint]);

  const navback = () => {
    setShowTracker(false);
    setSelectedDropPoint(null);
    ref?.current?.scrollTo(0);
  };

  const handleShowBusStop = () => {
    SetShowBusStop(true);
    SetShowGeneral(false);
  };

  const handleGeneral = () => {
    SetShowBusStop(false);
    SetShowGeneral(true);
  };

  useEffect(() => {
    const updateDeviceType = () => {
      const { width } = Dimensions.get('window');
      setScreenWidth(width);
      setIsMobile(width <= 600);
    };

    updateDeviceType();
    const subscription = Dimensions.addEventListener('change', updateDeviceType);
    return () => subscription?.remove();
  }, []);

  const handleStartPointClick = (location: Location) => {
    setSelectedLocation(location);
    setSearchQuery(location.name);
    setDropOffSearchQuery('');
    setIsSelectingDropOff(true);
    setSelectedDropPoint(null);
  };

  const dropOffPoint = (location: Location) => {
    setDropOffSelected(location);
  };

  const handleDropOffPointClick = (dropPoint: DropPoint) => {
    setSelectedDropPoint(dropPoint);
    setDropOffSearchQuery('');
  };

  const clearStartingPoint = () => {
    setSelectedLocation(null);
    setSearchQuery('');
    setDropOffSearchQuery('');
    setIsSelectingDropOff(false);
    setSelectedDropPoint(null);
  };

  const clearDropOffPoint = () => {
    setSelectedDropPoint(null);
  };

  const onPressButton = () => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-SCREEN_HEIGHT * 0.4);
    }
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {/* Map as background */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <OpenMap />
      </View>

      {/* Bottom Sheet with tracker content */}
      <BottomSheet ref={ref}>
        <ScrollView style={{ width: '100%', maxHeight: SCREEN_HEIGHT * 0.8 }} showsVerticalScrollIndicator={false}>
          {showTracker ? (
            <View style={{ width: '100%' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 12 }}>
                <BackArrow onPress={navback} />
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center', color: 'rgba(0,0,0,0.6)' }}>
                    Bus will arrive in 10 minutes
                  </Text>
                </View>
              </View>

              <View style={styles.tabContainer}>
                <TouchableOpacity onPress={handleGeneral} style={styles.tab}>
                  <Text style={[styles.tabText, showGeneral && styles.activeTabText]}>General</Text>
                  <View style={[styles.tabIndicator, !showGeneral && styles.hiddenIndicator]} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleShowBusStop} style={styles.tab}>
                  <Text style={[styles.tabText, showBusStop && styles.activeTabText]}>Bus Stop</Text>
                  <View style={[styles.tabIndicator, !showBusStop && styles.hiddenIndicator]} />
                </TouchableOpacity>
              </View>

              {/* General Tab Content */}
              {showGeneral && (
                <View style={{ gap: 12, marginTop: 16 }}>
                  <View style={styles.card}>
                    <View style={{ alignItems: 'center', gap: 2 }}>
                      <Text>Commercial</Text>
                      <Text style={styles.badge}>Start</Text>
                      <Text style={styles.timeText}>11:48 AM</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                      <View style={styles.progressBar} />
                      <BusIcon width={84} height={27} color="#34A853" />
                      <View style={styles.progressBarGray} />
                      
                      <View style={{ alignItems: 'center', gap: 2 }}>
                        <Text>KSB</Text>
                        <Text style={styles.badge}>Arriving</Text>
                        <Text style={styles.timeText}>11:58 AM</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.card}>
                    <Text style={styles.cardTitle}>Bus Stops</Text>
                    <View style={styles.busStopsContainer}>
                      <View style={styles.busStopItem}>
                        <View style={[styles.busStopIcon, { backgroundColor: '#34A853' }]}>
                          <Svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                            <Path d="M14.1667 2.6665V8.6665C14.1667 9.13984 13.9133 9.57317 13.5 9.81317V10.8332C13.5 11.1065 13.2733 11.3332 13 11.3332H12.6667C12.3933 11.3332 12.1667 11.1065 12.1667 10.8332V9.99984H7.5V10.8332C7.5 11.1065 7.27334 11.3332 7 11.3332H6.66667C6.39334 11.3332 6.16667 11.1065 6.16667 10.8332V9.81317C5.76 9.57317 5.5 9.13984 5.5 8.6665V2.6665C5.5 0.666504 7.5 0.666504 9.83334 0.666504C12.1667 0.666504 14.1667 0.666504 14.1667 2.6665Z" fill="white" />
                          </Svg>
                        </View>
                        <Text style={styles.busStopLabel}>Commercial Area</Text>
                      </View>

                      <View style={styles.connector} />

                      <View style={styles.busStopItem}>
                        <View style={[styles.busStopIcon, { backgroundColor: '#fafafa' }]}>
                          <Svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                            <Path d="M14.1667 2.6665V8.6665C14.1667 9.13984 13.9133 9.57317 13.5 9.81317V10.8332C13.5 11.1065 13.2733 11.3332 13 11.3332H12.6667C12.3933 11.3332 12.1667 11.1065 12.1667 10.8332V9.99984H7.5V10.8332C7.5 11.1065 7.27334 11.3332 7 11.3332H6.66667C6.39334 11.3332 6.16667 11.1065 6.16667 10.8332V9.81317C5.76 9.57317 5.5 9.13984 5.5 8.6665V2.6665C5.5 0.666504 7.5 0.666504 9.83334 0.666504C12.1667 0.666504 14.1667 0.666504 14.1667 2.6665Z" fill="black" fillOpacity="0.5" />
                          </Svg>
                        </View>
                        <Text style={styles.busStopLabel}>Hall 7</Text>
                      </View>

                      <View style={styles.connectorGray} />

                      <View style={styles.busStopItem}>
                        <View style={[styles.busStopIcon, { backgroundColor: '#fafafa' }]}>
                          <Svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                            <Path d="M14.1667 2.6665V8.6665C14.1667 9.13984 13.9133 9.57317 13.5 9.81317V10.8332C13.5 11.1065 13.2733 11.3332 13 11.3332H12.6667C12.3933 11.3332 12.1667 11.1065 12.1667 10.8332V9.99984H7.5V10.8332C7.5 11.1065 7.27334 11.3332 7 11.3332H6.66667C6.39334 11.3332 6.16667 11.1065 6.16667 10.8332V9.81317C5.76 9.57317 5.5 9.13984 5.5 8.6665V2.6665C5.5 0.666504 7.5 0.666504 9.83334 0.666504C12.1667 0.666504 14.1667 0.666504 14.1667 2.6665Z" fill="black" fillOpacity="0.5" />
                          </Svg>
                        </View>
                        <Text style={styles.busStopLabel}>Pentecost</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.card}>
                    <Text style={styles.cardTitle}>Passengers</Text>
                    <View style={{ gap: 12 }}>
                      {['Brunei', 'Main Library', 'SRC Busstop', 'KSB'].map((location, index) => (
                        <React.Fragment key={location}>
                          <View style={styles.passengerRow}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                              <View style={[styles.locationDot, { 
                                backgroundColor: index === 0 ? 'rgba(52, 168, 83, 0.30)' : 
                                                index === 1 ? '#FFFAEA' : 
                                                'rgba(234, 67, 53, 0.10)' 
                              }]}>
                                <View style={[styles.locationDotInner, { 
                                  backgroundColor: index === 0 ? '#34A853' : 
                                                  index === 1 ? '#FFCE31' : 
                                                  '#EA4335' 
                                }]} />
                              </View>
                              <Text>{location}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                              <View style={{ flexDirection: 'row' }}>
                                <Image source={require('./../assets/images/Avatar Image.png')} />
                                <Image source={require('./../assets/images/user2.png')} style={{ marginLeft: -8 }} />
                                <Image source={require('./../assets/images/user3.png')} style={{ marginLeft: -8 }} />
                              </View>
                              <Text style={styles.waitingText}>10+ waiting</Text>
                            </View>
                          </View>
                          {index < 3 && <View style={styles.separator} />}
                        </React.Fragment>
                      ))}
                    </View>
                  </View>
                </View>
              )}

              {/* Bus Stop Tab Content */}
              {showBusStop && (
                <View style={{ marginTop: 16 }}>
                  <Text style={{ color: 'rgba(0,0,0,0.6)', marginBottom: 12 }}>
                    <Text style={{ color: 'black' }}>2 Buses</Text> are approaching <Text style={{ color: 'black' }}>Brunei</Text>
                  </Text>

                  {[1, 2, 3].map((bus, index) => (
                    <View key={bus} style={{ marginBottom: 16 }}>
                      <View style={styles.busRouteContainer}>
                        <View style={{ alignItems: 'center', gap: 4 }}>
                          <Text>{index === 2 ? 'Casley Hayford' : 'Main Library'}</Text>
                          <View style={{ flexDirection: 'row', gap: 8 }}>
                            <Text style={styles.smallText}>Start</Text>
                            <Text style={styles.smallTextBold}>11:48 AM</Text>
                          </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                          <View style={[styles.progressBar, { width: index === 2 ? '10%' : '20%' }]} />
                          
                          <View style={{ alignItems: 'center', gap: 4, marginBottom: 20 }}>
                            <Text style={[styles.busStatusBadge, index === 2 && styles.moderateBadge]}>
                              {index === 2 ? '🟠 Moderate' : '🚫 Full'}
                            </Text>
                            <BusIcon width={84} height={27} color="#34A853" />
                          </View>

                          <View style={styles.progressBarGray} />

                          <View style={{ alignItems: 'center', gap: 4 }}>
                            <Text>{index === 0 ? 'KSB' : index === 1 ? 'Brunei' : 'Brunei'}</Text>
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                              <Text style={styles.smallText}>Arriving</Text>
                              <Text style={styles.smallTextBold}>11:57 AM</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View style={{ width: '100%' }}>
              <Text style={styles.welcomeText}>
                <Text style={styles.boldText}>Welcome To </Text>
                <Text style={styles.shuttleText}>Shuttle</Text>
                <Text style={styles.appText}>App</Text>
              </Text>

              <View style={styles.pointSelectionContainer}>
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { fontSize: isMobile ? wp(3.5) : wp(4) }]}>
                    Starting Point
                  </Text>
                  <View style={styles.inputRow}>
                    <View style={styles.iconContainer}>
                      <Svg width={wp(3)} height={wp(3.5)} viewBox="0 0 12 14" fill="none">
                        <Path
                          d="M11.7467 4.63317C11.0467 1.55317 8.36006 0.166504 6.00006 0.166504C6.00006 0.166504 6.00006 0.166504 5.9934 0.166504C3.64006 0.166504 0.94673 1.5465 0.24673 4.6265C-0.53327 8.0665 1.5734 10.9798 3.48006 12.8132C4.18673 13.4932 5.0934 13.8332 6.00006 13.8332C6.90673 13.8332 7.8134 13.4932 8.5134 12.8132C10.4201 10.9798 12.5267 8.07317 11.7467 4.63317ZM6.00006 7.97317C4.84006 7.97317 3.90006 7.03317 3.90006 5.87317C3.90006 4.71317 4.84006 3.77317 6.00006 3.77317C7.16006 3.77317 8.10006 4.71317 8.10006 5.87317C8.10006 7.03317 7.16006 7.97317 6.00006 7.97317Z"
                          fill="black"
                          fillOpacity={0.4}
                        />
                      </Svg>
                    </View>
                    <View style={styles.textInputContainer}>
                      <Svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                        <Path d="M11.3542 12.36C11.6609 12.6667 12.1342 12.1934 11.8276 11.8934L9.32755 9.38671C10.2045 8.41638 10.6893 7.1546 10.6876 5.84671C10.6876 2.92004 8.30755 0.540039 5.38089 0.540039C2.45422 0.540039 0.0742188 2.92004 0.0742188 5.84671C0.0742188 8.77337 2.45422 11.1534 5.38089 11.1534C6.70089 11.1534 7.92089 10.6667 8.85422 9.86004L11.3542 12.36ZM0.740219 5.84671C0.740219 3.28671 2.82688 1.20671 5.38022 1.20671C7.94022 1.20671 10.0202 3.28671 10.0202 5.84671C10.0202 8.40671 7.94022 10.4867 5.38022 10.4867C2.82688 10.4867 0.740219 8.40671 0.740219 5.84671Z" fill="black" fillOpacity="0.6" />
                      </Svg>
                      <TextInput
                        placeholder="Enter starting point"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={[styles.textInput, { fontSize: isMobile ? wp(3.5) : wp(4) }]}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        ref={textInputRef}
                      />
                      {(searchQuery || selectedLocation) && (
                        <TouchableOpacity onPress={clearStartingPoint}>
                          <Svg width={wp(3.25)} height={wp(3)} viewBox="0 0 13 12" fill="none">
                            <Path
                              d="M3.7 9.5L3 8.8L5.8 6L3 3.2L3.7 2.5L6.5 5.3L9.3 2.5L10 3.2L7.2 6L10 8.8L9.3 9.5L6.5 6.7L3.7 9.5Z"
                              fill="black"
                              fillOpacity={0.3}
                            />
                          </Svg>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>

                {isSelectingDropOff && <View style={styles.separator} />}

                {isSelectingDropOff && (
                  <View style={styles.inputContainer}>
                    <Text style={[styles.label, { fontSize: isMobile ? wp(3.5) : wp(4) }]}>
                      Drop-Off Point
                    </Text>
                    <View style={styles.inputRow}>
                      <View style={styles.iconContainer}>
                        <Svg width={wp(4)} height={wp(4.25)} viewBox="0 0 16 17" fill="none">
                          <Path
                            d="M13.3542 14.36C13.6609 14.6667 14.1342 14.1934 13.8276 13.8934L11.3276 11.3867C12.2045 10.4164 12.6893 9.1546 12.6876 7.84671C12.6876 4.92004 10.3076 2.54004 7.38089 2.54004C4.45422 2.54004 2.07422 4.92004 2.07422 7.84671C2.07422 10.7734 4.45422 13.1534 7.38089 13.1534C8.70089 13.1534 9.92089 12.6667 10.8542 11.86L13.3542 14.36ZM2.74022 7.84671C2.74022 5.28671 4.82688 3.20671 7.38022 3.20671C9.94022 3.20671 12.0202 5.28671 12.0202 7.84671C12.0202 10.4067 9.94022 12.4867 7.38022 12.4867C4.82688 12.4867 2.74022 10.4067 2.74022 7.84671Z"
                            fill="black"
                            fillOpacity={0.4}
                          />
                        </Svg>
                      </View>
                      <View style={styles.textInputContainer}>
                        <TextInput
                          placeholder="Enter drop-off point"
                          value={selectedDropPoint?.name || ''}
                          style={[styles.textInput, { fontSize: isMobile ? wp(3.5) : wp(4) }]}
                          editable={false}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>

              <LocationList
                searchQuery={searchQuery}
                selectedLocation={selectedLocation}
                locations={locations}
                isSelectingDropOff={isSelectingDropOff}
                handleDropOffPointClick={handleDropOffPointClick}
                handleStartPointClick={handleStartPointClick}
                isMobile={isMobile}
              />
            </View>
          )}
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    textAlign: 'left',
    width: '100%',
    marginBottom: 12,
  },
  boldText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
    shuttleText: {
      color: '#059669',
      fontSize: 20,
      fontWeight: 'bold',
    },
     welcomeText: {
    textAlign: 'left',
    width: '100%',
  },
  boldText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  shuttleText: {
    color: '#059669',
    fontSize: 20,
    fontWeight: 'bold',
  },
  appText: {
    color: '#f59e0b',
    fontSize: 20,
    fontWeight: 'normal',
  },
  pointSelectionContainer: {
    backgroundColor: '#fafafa',
    width: '100%',
    borderRadius: 12,
  },
  inputContainer: {
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
  },
  label: {
    color: 'gray',
    fontSize: 14,
  },
  inputRow: {
    alignItems: 'center',
    gap: 8,
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'center',
    padding: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 24,
    borderStyle: 'dashed',
  },
  textInputContainer: {
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 12,
    flexDirection: 'row',
    flex: 1,
  },
  textInput: {
    fontSize: 14,
    color: 'black',
    flex: 1,
  },
  separator: {
    marginHorizontal: 26,
    borderWidth: 1,
    height: 20,
    width: 1,
  },
   handle: {
    width: 58,
    height: 6,
    backgroundColor: '#D1D5DB',
    borderRadius: 3,
    alignSelf: 'center',
    // marginTop: 12,
    marginBottom: 4,
  },
  })