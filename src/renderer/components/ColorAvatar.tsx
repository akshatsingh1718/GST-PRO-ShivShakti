import React from 'react';
import { stringAvatar } from 'renderer/utils/common.utils';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';

function ColorAvatar({ text, props }) {
  return <Avatar {...props} {...stringAvatar(text)} alt={text} />;
}

ColorAvatar.propTypes = {
  text: PropTypes.string,
};

export default ColorAvatar;
