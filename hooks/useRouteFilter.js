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

    // Your route filtering logic
    if (pickUp.name === 'Main Library' && dropOff.name === 'Brunei') {
      filteredDropPoints = filteredDropPoints.filter(
        (dropPoint) => !['', 'SRC Busstop', 'Hall 7', 'Commercial Area', 'Conti Busstop'].includes(dropPoint.name)
      );
    }
    
    if (pickUp.name === 'Main Library' && dropOff.name === 'KSB') {
      filteredDropPoints = filteredDropPoints.filter(
        (dropPoint) => !['Commercial Area', 'Conti Busstop', 'SRC Busstop', 'Hall 7'].includes(dropPoint.name)
      );
    }

    if (pickUp.name === 'Main Library' && dropOff.name === 'Pentecost Busstop') {
      filteredDropPoints = filteredDropPoints.filter(
        (dropPoint) => !['Brunei', 'Commercial Area', 'Conti Busstop', 'KSB', 'Hall 7'].includes(dropPoint.name)
      );
    }

    if (pickUp.name === 'Hall 7' && dropOff.name === 'KSB') {
      filteredDropPoints = filteredDropPoints.filter(
        (dropPoint) => !['Brunei', 'Conti Busstop', 'Main Library', 'Pentecost Busstop'].includes(dropPoint.name)
      );
    }

    // Add all your other route conditions here...
    // Continue with all the conditions from your original useEffect

    // Update route stops with filtered points
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