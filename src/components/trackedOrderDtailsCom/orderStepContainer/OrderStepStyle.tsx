import { StyleSheet } from 'react-native';
import { Color, Font, shadows } from '../../../constants/GlobalStyle';

export const orderStepContainerStyle = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Color.C_white,
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  indicatorCon: {
    alignItems: 'center',
  },
  indicatorBox: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  relatedDivider: {
    width: 1,
    backgroundColor: 'red',
    height: 63,
  },
  stepDetailsCon: {
    flex: 1,
    marginLeft: 10,
  },
  stepDetails: {
    height: 110,
  },
  dateCon: {
    flexDirection: 'row',
  },
  dateText: {
    fontSize: Font.Font_M,
    color: Color.C_H_black,
    marginLeft: 10,
  },
  state: {
    fontSize: Font.Font_L,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 5,
  },
  subState: {
    fontSize: Font.Font_M,
    color: Color.C_H_black,
    lineHeight: 20,
  },
});
