import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import Shuttle from './screens/Shuttle';
import Orders from './screens/Orders';
import Profile from './screens/Profile';
import Svg, { Path, Mask, G } from 'react-native-svg';

export default function Index() {
  const [activeTab, setActiveTab] = useState('shuttle');

  const renderScreen = () => {
    switch (activeTab) {
      case 'shuttle':
        return <Shuttle />;
      case 'orders':
        return <Orders />;
      case 'profile':
        return <Profile />;
      default:
        return <Profile />;
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('shuttle')}
        >
          <Svg  width="20" height="24" viewBox="0 0 14 14" fill="none">
            <Path d="M13.1994 3.19986C13.1889 3.07998 13.1058 2.98198 13.0156 2.98198C12.9255 2.98198 12.8516 2.90761 12.8516 2.81792C12.8516 2.72823 12.7544 2.67092 12.6359 2.69105L11.9919 2.80042C11.8624 2.01598 11.6681 1.52555 11.375 1.23242C10.5 0.357422 3.5 0.357422 2.625 1.23242C2.33188 1.52555 2.13763 2.01555 2.00813 2.79998L1.36413 2.69061C1.246 2.67048 1.14844 2.7278 1.14844 2.81748C1.14844 2.90717 1.07406 2.98198 0.984376 2.98198C0.894688 2.98198 0.811126 3.08042 0.800626 3.19986L0.595001 5.41623C0.591813 5.44395 0.59459 5.47202 0.603148 5.49858C0.611706 5.52513 0.625845 5.54954 0.644617 5.57018C0.663389 5.59082 0.686358 5.6072 0.711984 5.61822C0.737609 5.62925 0.765297 5.63467 0.793188 5.63411H1.25781C1.37813 5.63411 1.48531 5.53611 1.49669 5.41623L1.66906 3.56473C1.67136 3.53677 1.67949 3.5096 1.69291 3.48496C1.70633 3.46032 1.72476 3.43876 1.747 3.42166C1.76925 3.40457 1.79483 3.39231 1.82209 3.38568C1.84935 3.37905 1.8777 3.3782 1.90531 3.38317L1.92894 3.38755C1.7535 4.9853 1.75 12.9859 1.75 12.9859C1.75 13.2282 1.81125 13.4234 1.88694 13.4234H3.00781C3.0835 13.4234 3.14475 13.2282 3.14475 12.9859V12.1581C5.17606 12.4644 8.82438 12.4644 10.8557 12.1581V12.985C10.8557 13.2269 10.9169 13.4225 10.9922 13.4225H12.1131C12.1883 13.4225 12.2496 13.2269 12.2496 12.985C12.2496 12.985 12.2461 4.98617 12.0711 3.38755L12.0947 3.38317C12.1223 3.3782 12.1507 3.37906 12.178 3.38572C12.2053 3.39237 12.2309 3.40467 12.2531 3.42181C12.2754 3.43896 12.2938 3.46057 12.3072 3.48526C12.3206 3.50995 12.3287 3.53717 12.3309 3.56517L12.5029 5.4158C12.5134 5.53611 12.621 5.63455 12.7413 5.63455H13.2059C13.2339 5.63497 13.2616 5.62943 13.2872 5.61831C13.3129 5.60719 13.3359 5.59073 13.3547 5.57004C13.3735 5.54935 13.3876 5.52489 13.3962 5.49829C13.4048 5.4717 13.4077 5.44358 13.4046 5.4158L13.1989 3.19942L13.1994 3.19986ZM3.11763 10.2244C3.01142 10.2279 2.90558 10.2101 2.8064 10.172C2.70723 10.1338 2.61673 10.0761 2.54032 10.0023C2.4639 9.92844 2.40311 9.83999 2.36158 9.74218C2.32005 9.64437 2.29861 9.5392 2.29855 9.43294C2.29849 9.32667 2.31981 9.22148 2.36124 9.12363C2.40266 9.02577 2.46335 8.93725 2.53969 8.86332C2.61602 8.7894 2.70645 8.73159 2.80559 8.69333C2.90472 8.65507 3.01054 8.63714 3.11675 8.64061C3.32114 8.64882 3.51443 8.73576 3.65618 8.88323C3.79793 9.03071 3.87715 9.22729 3.87726 9.43185C3.87738 9.6364 3.79837 9.83307 3.65679 9.9807C3.5152 10.1283 3.322 10.2155 3.11763 10.2239V10.2244ZM2.20631 6.98992C2.25006 3.73711 2.40319 2.0733 2.93475 1.5413C3.14781 1.32867 4.58719 1.01323 7.00044 1.01323C9.41369 1.01323 10.8531 1.32823 11.0661 1.5413C11.5986 2.0733 11.7504 3.73755 11.7946 6.99036C11.2805 7.1973 9.64906 7.4388 7.00044 7.4388C4.35356 7.4388 2.72256 7.19817 2.20631 6.98992ZM10.0901 9.43205C10.0968 9.22635 10.1833 9.03135 10.3312 8.88822C10.4791 8.74508 10.6768 8.66504 10.8826 8.66498C11.0884 8.66492 11.2862 8.74486 11.4341 8.88791C11.5821 9.03096 11.6687 9.22592 11.6756 9.43161C11.6756 9.64186 11.592 9.8435 11.4434 9.99217C11.2947 10.1408 11.0931 10.2244 10.8828 10.2244C10.6726 10.2244 10.4709 10.1408 10.3223 9.99217C10.1736 9.8435 10.0901 9.6423 10.0901 9.43205Z"  fill={activeTab === 'shuttle' ? '#34A853' : '#666'}/>
          </Svg>
          <Text style={[styles.navLabel, activeTab === 'shuttle' && styles.activeNavLabel]}>
            Shuttle
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('orders')}
        >
          <Text style={[styles.navIcon, activeTab === 'orders' && styles.activeNavIcon]}>
            📦
          </Text>
          <Text style={[styles.navLabel, activeTab === 'orders' && styles.activeNavLabel]}>
            Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[styles.navIcon, activeTab === 'profile' && styles.activeNavIcon]}>
            👤
          </Text>
          <Text style={[styles.navLabel, activeTab === 'profile' && styles.activeNavLabel]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: 20,
    paddingTop: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 18,
    marginBottom: 4,
    opacity: 0.5,
  },
  activeNavIcon: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 12,
    color: '#666',
  },
  activeNavLabel: {
    color: '#34A853',
    fontWeight: '600',
  },
});