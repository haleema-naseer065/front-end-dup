// import React from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';

// const { width, height } = Dimensions.get('window');

// interface HeaderComponentProps {
//   onProfilePress?: () => void;
//   onVolumePress?: () => void;
// }

// const HeaderComponent: React.FC<HeaderComponentProps> = ({ onProfilePress, onVolumePress }) => {
//   return (
//     <View style={styles.headerContainer}>
//       {/* Profile Icon */}
//       <MaterialIcons
//         name="person"
//         size={width * 0.08}
//         color="#20432E"
//         style={styles.profileIcon}
//         onPress={onProfilePress}
//       />
//       {/* Volume Icon */}
//       <MaterialIcons
//         name="volume-up"
//         size={width * 0.08}
//         color="#20432E"
//         style={styles.volumeIcon}
//         onPress={onVolumePress}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     width: '100%',
//     height: height * 0.11, // Adjust height for the white area
//     backgroundColor: '#FFFFFF',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: width * 0.05,
//     borderBottomLeftRadius: 0,
//     borderBottomRightRadius: 0,
//     elevation: 2,
//     zIndex:1,
//   },
//   profileIcon: {
//     // Adjust placement if needed
//   },
//   volumeIcon: {
//     // Adjust placement if needed
//   },
// });

// export default HeaderComponent;





import React from 'react';
import { View, StyleSheet, Dimensions, GestureResponderEvent } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { store } from '../redux/store';
import { logout } from '../redux/slice/userSlice';

const { width, height } = Dimensions.get('window');

// Type for the allowed MaterialIcons names
type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

interface IconProps {
  name: MaterialIconName; // Use the valid MaterialIcons names
  onPress?: (event: GestureResponderEvent) => void; // Event handler
  style?: object; // Custom styles for the icon
}

interface HeaderComponentProps {
  leftIcons?: IconProps[]; // Array of icons for the left side
  rightIcons?: IconProps[]; // Array of icons for the right side
  containerStyle?: object; // Custom styles for the header container
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  leftIcons = [],
  rightIcons = [],
  containerStyle,
}) => {
  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <View style={styles.iconGroup}>
        {leftIcons.map((icon, index) => (
          <MaterialIcons
            key={`left-icon-${index}`}
            name={icon.name}
            size={width * 0.08}
            color="#20432E"
            style={[styles.icon, icon.style]}
            onPress={icon.onPress}
          />
        ))}
      </View>

      <View style={styles.iconGroup}>
      {rightIcons.map((icon, index) => {
  const handleIconPress = (event: GestureResponderEvent) => {
    if (icon.name === "exit-to-app") {
      console.log("Logging out...");
      store.dispatch(logout())
    }


    icon.onPress?.(event);
  };

  return (
    <MaterialIcons
      key={`right-icon-${index}`}
      name={icon.name}
      size={width * 0.08}
      color="#20432E"
      style={[styles.icon, icon.style]}
      onPress={handleIconPress}
    />
  );
})}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: height * 0.095,
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    top: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.006,
    elevation: 3,
    zIndex:1,
    position: 'absolute',
  },
  iconGroup: {
    flexDirection: 'row', // Align icons horizontally
    alignItems: 'center',
  },
  icon: {
    marginBottom: height * -0.05,
    marginHorizontal: width * 0.009, // Spacing between icons
  },
});

export default HeaderComponent;





