import {
  primaryColor,
  dangerColor,
  successColor,
  grayColor,
  defaultFont
} from '../../material-dashboard-react';

import { createStyles } from '@material-ui/core';

const customInputStyle = createStyles({
  disabled: {
    '&:before': {
      backgroundColor: 'transparent !important'
    }
  },
  underline: {
    '&:hover:not($disabled):before,&:before': {
      borderColor: grayColor[4] + ' !important',
      borderWidth: '1px !important'
    },
    '&:after': {
      borderColor: primaryColor[0]
    }
  },
  underlineError: {
    '&:after': {
      borderColor: dangerColor[0]
    }
  },
  underlineSuccess: {
    '&:after': {
      borderColor: successColor[0]
    }
  },
  labelRoot: {
    ...defaultFont,
    color: grayColor[3] + ' !important',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '1.42857'
  },
  labelRootError: {
    color: dangerColor[0]
  },
  labelRootSuccess: {
    color: successColor[0]
  },
  feedback: {
    position: 'absolute',
    top: '18px',
    right: '0',
    zIndex: 2,
    display: 'block',
    width: '24px',
    height: '24px',
    textAlign: 'center',
    pointerEvents: 'none'
  },
  marginTop: {
    marginTop: '16px',
    width:'100%'
  },
  formControl: {
    margin: '27px 0 10px 0',
    position: 'relative',
    verticalAlign: 'unset'
  },
  dragNDropArea:{
    position:'relative',
    zIndex:10,
    backgroundColor:'rgba(0,0,0,0.1)',
    border:'2px dashed rgba(0,0,0,0.2)',
    bottom:0,
    left:0
  }
});

export default customInputStyle;
