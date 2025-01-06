import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, Dimensions, TextStyle } from 'react-native';
import { Text } from 'react-native'; // Ensure proper import of Text

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface CardProps {
  height?: number | string;
  width?: number | string;
  backgroundColorTop?: string;
  backgroundColorBottom?: string;
  borderRadius?: number;
  style?: ViewStyle;
  children?: ReactNode;
  topText?: string;
  topTextStyle?: TextStyle;
  topIcon?: ReactNode;
}

const Card: React.FC<CardProps> = ({
  height = '40%', // Default height as percentage
  width = '70%', // Default width as percentage
  backgroundColorTop = '#3A5F47',
  backgroundColorBottom = '#FFFFFF',
  borderRadius = 10,
  style,
  children,
  topText = 'اپنا فون نمبر درج کریں',
  topTextStyle,
  topIcon,
}) => {
  // Convert percentage values to numbers
  const resolvedHeight =
    typeof height === 'string' && height.endsWith('%')
      ? (parseFloat(height) / 100) * screenHeight
      : height;

  const resolvedWidth =
    typeof width === 'string' && width.endsWith('%')
      ? (parseFloat(width) / 100) * screenWidth
      : width;

  return (
    <View style={[styles.container, { height: resolvedHeight as number, width: resolvedWidth as number, borderRadius }, style]}>
      {/* Top Section */}
      <View
        style={[
          styles.topSection,
          {
            backgroundColor: backgroundColorTop,
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
          },
        ]}
      >
        {/* Render topIcon or topText */}
        {topIcon || (topText && <Text style={[styles.topText, topTextStyle]}>{topText}</Text>)}
      </View>

      {/* Bottom Section */}
      <View
        style={[
          styles.bottomSection,
          {
            backgroundColor: backgroundColorBottom,
            borderBottomLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  topSection: {
    height: '28%', // Top section occupies 30% of the height
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomSection: {
    flex: 1, // Remaining space for the bottom section
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Card;
