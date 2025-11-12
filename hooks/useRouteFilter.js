// hooks/useRouteFilter.js
import { useMemo } from 'react';

const useRouteFilter = (locations, selectedLocation, selectedDropPoint) => {
  const filteredRouteData = useMemo(() => {
    if (!selectedLocation || !selectedDropPoint) {
      return {
        filteredLocation: selectedLocation,
        filteredDropPoints: selectedLocation?.dropPoints || [],
        routeStops: []
      };
    }

    const pickUp = selectedLocation;
    const dropOff = selectedDropPoint;

    let filteredDropPoints = [...(selectedLocation.dropPoints || [])];
    let routeStops = [selectedLocation, ...filteredDropPoints];

    // 🚏 All filtering rules in one structured object
    const routeRules = {
      'Main Library->Brunei': ['SRC Busstop', 'Hall 7', 'Commercial Area', 'Conti Busstop'],
      'Main Library->KSB': ['Commercial Area', 'Conti Busstop', 'SRC Busstop', 'Hall 7'],
      'Main Library->Pentecost Busstop': ['Brunei', 'Commercial Area', 'Conti Busstop', 'KSB', 'Hall 7'],
      'Hall 7->KSB': ['Brunei', 'Conti Busstop', 'Main Library', 'Pentecost Busstop'],
      'Hall 7->Pentecost Busstop': ['Brunei', 'SRC Busstop', 'Main Library'],
      'Pentecost Busstop->KSB': ['Conti Busstop', 'SRC Busstop', 'Main Library', 'Brunei'],
      'Brunei->KSB': ['Conti Busstop', 'SRC Busstop', 'Main Library', 'Hall 7', 'Commercial Area'],
      'Brunei->Pentecost Busstop': ['KSB', 'Conti Busstop', 'Commercial Area', 'SRC Busstop', 'Hall 7'],
      'SRC Busstop->Main Library': ['Bomso Busstop', 'Conti Busstop', 'Pentecost Busstop'],
      'Main Library->SRC Busstop': ['Brunei', 'Bomso Busstop', 'Conti Busstop', 'KSB', 'Pentecost Busstop'],
      'SRC Busstop->KSB': ['Brunei', 'Bomso Busstop', 'Conti Busstop', 'Main Library', 'Pentecost Busstop', 'Hall 7'],
      'Brunei->Main Library': ['Bomso Busstop', 'Commercial Area', 'SRC Busstop', 'Hall 7'],
      'SRC Busstop->Brunei': ['Bomso Busstop', 'Conti Busstop', 'KSB', 'Pentecost Busstop'],
      'Commercial Area->KSB': ['Main Library', 'Bomso Busstop', 'Conti Busstop', 'Brunei'],
      'Commercial Area->Pentecost Busstop': ['Main Library', 'Conti Busstop', 'Brunei'],
      'Commercial Area->Hall 7': ['Main Library', 'Conti Busstop', 'Brunei'],
      'Conti Busstop->Commercial Area': ['KSB', 'Pentecost Busstop', 'SRC Busstop', 'Hall 7'],
      'SRC Busstop->Hall 7': ['Brunei', 'Conti Busstop', 'Pentecost Busstop'],
      'KSB->Brunei': [, 'Conti Busstop', 'Commercial Area', 'Hall 7',],
    };

    // 🧩 Build route key like "Main Library->Brunei"
    const routeKey = `${pickUp?.name?.trim()}->${dropOff?.name?.trim()}`;
    const excludedStops = routeRules[routeKey] || [];

    // 🚫 Filter out unwanted stops
    filteredDropPoints = filteredDropPoints.filter(
      (dropPoint) => !excludedStops.includes(dropPoint.name)
    );

    // 🚌 Build route stops (start + remaining)
    routeStops = [selectedLocation, ...filteredDropPoints];

    return {
      filteredLocation: {
        ...selectedLocation,
        dropPoints: filteredDropPoints
      },
      filteredDropPoints,
      routeStops
    };
  }, [locations, selectedLocation, selectedDropPoint]);

  return filteredRouteData;
};

export default useRouteFilter;
