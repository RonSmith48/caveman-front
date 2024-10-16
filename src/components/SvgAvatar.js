import React from 'react';

// Avatar component to handle SVG avatars from the public folder
const SvgAvatar = ({ src, alt, size }) => {
  const avatarSrc = src ? src : 'default.svg';

  return <img src={`/assets/images/users/${avatarSrc}`} alt={alt} width={size} height={size} style={{ borderRadius: '50%' }} />;
};

export default SvgAvatar;
