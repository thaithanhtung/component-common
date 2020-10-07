import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './styles.scss'
import ImageThumbnail from './ImageThumbnail'
import ImageSlider, { ImageSliderItem } from './ImageSlider'
import useWindowSize from '../../hooks/useWindowSize'

const dataItem = [
  {
    id: 1,
    image:
      'https://nguyendangtam.com/wp-content/uploads/2019/08/anh-gai-xinh-ky-le-hieu-1.jpg'
  },
  {
    id: 2,
    image:
      'https://img.thuthuat123.com/uploads/2019/10/17/anh-nen-gai-xinh-viet-nam-dep-nhat_110152854.jpg'
  },
  {
    id: 3,
    image:
      'https://1.bp.blogspot.com/-wkJ6XCQrBwY/XlpeqAamQNI/AAAAAAAAWUA/rgZN1alVCS4iM4NtvrEGPnAe3C0DNapUACLcBGAsYHQ/s1600/Anh-gai-xinh-deo-kinh%2B%252875%2529.jpg'
  },
  {
    id: 4,
    image:
      'https://img2.thuthuatphanmem.vn/uploads/2019/01/04/hinh-co-gai-xinh-dep-de-thuong_025104709.jpg'
  },
  {
    id: 5,
    image:
      'https://kenh14cdn.com/thumb_w/660/2019/2/24/3561716420480213454575853861059020806684672n-15510057259571546306615.jpg'
  },
  {
    id: 6,
    image:
      'https://vnn-imgs-f.vgcloud.vn/2019/05/03/11/co-gai-khien-hot-girl-tram-anh-bi-lu-mo-vi-qua-xinh-dep-3.jpg'
  },
  {
    id: 7,
    image:
      'https://kenh14cdn.com/thumb_w/660/2019/6/2/a3-1559455128259448461272.jpg'
  },
  {
    id: 8,
    image:
      'https://nguyendangtam.com/wp-content/uploads/2019/08/anh-gai-xinh-ky-le-hieu-1.jpg'
  },
  {
    id: 9,
    image:
      'https://img.thuthuat123.com/uploads/2019/10/17/anh-nen-gai-xinh-viet-nam-dep-nhat_110152854.jpg'
  },
  {
    id: 10,
    image:
      'https://1.bp.blogspot.com/-wkJ6XCQrBwY/XlpeqAamQNI/AAAAAAAAWUA/rgZN1alVCS4iM4NtvrEGPnAe3C0DNapUACLcBGAsYHQ/s1600/Anh-gai-xinh-deo-kinh%2B%252875%2529.jpg'
  },
  {
    id: 11,
    image:
      'https://img2.thuthuatphanmem.vn/uploads/2019/01/04/hinh-co-gai-xinh-dep-de-thuong_025104709.jpg'
  },
  {
    id: 12,
    image:
      'https://kenh14cdn.com/thumb_w/660/2019/2/24/3561716420480213454575853861059020806684672n-15510057259571546306615.jpg'
  },
  {
    id: 13,
    image:
      'https://vnn-imgs-f.vgcloud.vn/2019/05/03/11/co-gai-khien-hot-girl-tram-anh-bi-lu-mo-vi-qua-xinh-dep-3.jpg'
  },
  {
    id: 14,
    image:
      'https://kenh14cdn.com/thumb_w/660/2019/6/2/a3-1559455128259448461272.jpg'
  }
]

const ImageSlideCustom = ({
  images,
  setShowData,
  customViewWidth,
  clearBtn,
  chooseColor
}) => {
  const imageSliderRef = useRef()
  const [selectedImage, setSelectedImage] = useState()
  const size = useWindowSize()
  const { width: viewWidth } = size || {}

  useEffect(() => {
    const showImage = selectedImage ?? images[0]
    setShowData(showImage)
  }, [images, selectedImage, setShowData])

  useEffect(() => {
    if (
      imageSliderRef &&
      imageSliderRef.current &&
      imageSliderRef.current.updateSlickTrackClass
    )
      imageSliderRef.current.updateSlickTrackClass()
  }, [viewWidth])

  if (images.length === 0) return <div />

  return (
    <div className='cpr-custom-image-slider'>
      <ImageSlider
        ref={imageSliderRef}
        clearBtn={clearBtn}
        customViewWidth={customViewWidth}
      >
        {images.map((image, index) => {
          const isSelected = selectedImage
            ? selectedImage.id === image.id
            : index === 0
          return (
            <ImageSliderItem key={index}>
              <ImageThumbnail
                key={index}
                image={image}
                isSelected={isSelected}
                chooseColor={chooseColor}
                {...{ setSelectedImage }}
              />
            </ImageSliderItem>
          )
        })}
      </ImageSlider>
    </div>
  )
}

ImageSlideCustom.propTypes = {
  /**
   Danh sách những hình ảnh trong slide. Phần tử trong mãng có cấu trúc như sau [{id: 'số bất kì, image: 'link dẫn đến hình ảnh' }]
  */
  images: PropTypes.array.isRequired,

  /**
  Ẩn hiện 2 button trở về và  tiếp theo
  */

  clearBtn: PropTypes.bool,

  /**
  Click  chọn 1 hình ảnh 
  */
  setShowData: PropTypes.func,
  /**
   Độ dài của slide mặc định là độ dài của màn hình
  */
  customViewWidth: PropTypes.number,
  /**
   Màu sắc của image đang được chọn nha
  */
  chooseColor: PropTypes.oneOf(['red', 'blue', 'green', 'transparent'])
}

ImageSlideCustom.defaultProps = {
  images: dataItem,
  setShowData: () => {},
  clearBtn: false,
  customViewWidth: undefined,
  chooseColor: 'blue'
}

export default ImageSlideCustom
