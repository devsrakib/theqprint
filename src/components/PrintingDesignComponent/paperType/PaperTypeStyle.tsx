import { StyleSheet } from 'react-native';
import { Color, Font } from '../../../constants/GlobalStyle';

export const paperTypeStyle = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Color.C_border,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: Font.Font_L,
    color: Color.C_black_eight,
    fontWeight: '500',
  },
  paperTypeCon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 13,
    marginTop: 20,
  },
  typeItem: {
    height: 40,
    borderRadius: 6,
    borderColor: Color.C_border,
    borderWidth: 1,
    // marginRight: 10,
  },
  actionLayer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  paperTypeText: {
    fontSize: Font.Font_M,
  },
  divider: {
    marginTop: 20,
    height: 1,
    color: Color.C_shadow,
  },
  printingModeTitle: {
    fontSize: Font.Font_L,
    fontWeight: '500',
    marginTop: 20,
  },
  PrintModeCon: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  mode: {
    // padding: 10,
    borderRadius: 5,
    borderColor: Color.C_border,
    borderWidth: 1,
    marginRight: 10,
    height: 40,
    marginTop: 10,
  },
  modeItemText: {
    fontSize: Font.Font_M,
  },
  attachmentText: {
    fontSize: Font.Font_L,
    fontWeight: '500',
    marginTop: 20,
  },
  uploadButton: {
    width: '100%',
    height: 50,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Color.C_border,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  uploadButtonText: {
    color: Color.C_main,
    fontSize: Font.Font_L,
    fontWeight: '500',
    marginLeft: 10,
  },
});
