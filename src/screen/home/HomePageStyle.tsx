import { StyleSheet } from 'react-native';
import { Color, Font, shadows } from '../../constants/GlobalStyle';

export const homePageStyle = StyleSheet.create({
  bodyContainer: {},
  // search and threeline containre
  searchAndthreelineCon: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: shadows.shadow_color,
    elevation: shadows.elevation_1,
    shadowOffset: {
      width: shadows.offsetWidth_1,
      height: shadows.offsetHeight_1,
    },
    shadowRadius: shadows.radius_1,
    shadowOpacity: shadows.opacity_1,
    flex: 1,
    backgroundColor: Color.C_white,
    marginVertical: 20,
  },

  searchText: {
    color: Color.C_H_black,
    fontSize: Font.Font_M,
    marginLeft: 5,
  },
  cordContainer: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 0.5, // Make each item take half of the available width (for 2 columns)
    padding: 8,
  },
});
