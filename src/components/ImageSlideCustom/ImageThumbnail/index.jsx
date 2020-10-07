import React from 'react';
import PropTypes from 'prop-types';

// import Image from '../../../../CleanComponents/Image';

const ImageThumbnail = ({
  isSelected,
  image,
  setSelectedImage,
  chooseColor,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSelected) return;
    setSelectedImage(image);
  };

  console.log('chooseColor ImageThumbnail', chooseColor);

  console.log('ImageThumbnail', chooseColor);

  return (
    <div
      data-favorite={chooseColor}
      className={`thumb-item facility-thumb ${isSelected ? 'focus' : ''} `}
      onClick={handleClick}
    >
      <img src={image.image} alt='slider_image' />
    </div>
  );
};

ImageThumbnail.propTypes = {
  isSelected: PropTypes.bool,
  image: PropTypes.object,
  setSelectedImage: PropTypes.func,
  chooseColor: PropTypes.string,
};

ImageThumbnail.defaultProps = {
  isSelected: false,
  image: {},
  setSelectedImage: () => {},
  chooseColor: '',
};

export default React.memo(ImageThumbnail);
