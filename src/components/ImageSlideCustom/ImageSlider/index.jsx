import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { ReactSVG } from 'react-svg'
import NextArrow from '../../../svgs/Arrow-Line-24x24.svg'
import PrevArrow from '../../../svgs/Arrow-Line-24x24.svg'
import useWindowSize from '../../../hooks/useWindowSize'

import './styles.scss'

const CustomNextArrow = ({ className, onClick }) => {
  return (
    <div className={`${className || ''} custom-arrow custom-next-arrow`}>
      <Button
        type='primary'
        shape='circle'
        size='large'
        className='next-arrow-button'
        onClick={onClick}
      >
        <ReactSVG src={NextArrow} wrapper='span' className='next-icon' />
      </Button>
    </div>
  )
}

const CustomPrevArrow = ({ className, onClick }) => {
  return (
    <div className={`${className || ''} custom-arrow custom-prev-arrow`}>
      <Button
        type='primary'
        shape='circle'
        size='large'
        className='prev-arrow-button'
        onClick={onClick}
      >
        <ReactSVG src={PrevArrow} wrapper='span' className='prev-icon' />
      </Button>
    </div>
  )
}

const ImageSlider = forwardRef(
  ({ className, customViewWidth, children, clearBtn }, ref) => {
    const defaultStep = 130

    const [slickTrackClass, setSlickTrackClass] = useState()
    const [menuState, setMenuState] = useState({
      isDragging: false,
      curXPos: 0,
      left: true,
      right: false
    })

    const size = useWindowSize()
    const { width } = size || {}
    const viewWidth = customViewWidth || width
    const slickTrackRef = useRef()

    // add event listener on container scroll
    const listenContainerScroll = useCallback(() => {
      const tabScrollContainer = slickTrackRef.current
      if (!tabScrollContainer) return
      const scrolledWidth = tabScrollContainer.scrollLeft
      const leftWidth =
        tabScrollContainer.scrollWidth -
        (tabScrollContainer.offsetWidth + tabScrollContainer.scrollLeft)

      if (leftWidth < 5) {
        setMenuState((prevState) => ({
          ...prevState,
          left: false,
          right: true
        }))
      } else if (scrolledWidth < 5) {
        setMenuState((prevState) => ({
          ...prevState,
          left: true,
          right: false
        }))
      } else {
        setMenuState((prevState) => ({
          ...prevState,
          left: true,
          right: true
        }))
      }
    }, [])

    const updateSlickTrackClass = useCallback(() => {
      setTimeout(() => {
        let className
        if (
          slickTrackRef &&
          slickTrackRef.current &&
          slickTrackRef.current.scrollWidth > viewWidth
        ) {
          className = 'show-arrow'
        }
        setSlickTrackClass(className)
        listenContainerScroll()
      }, 500)
    }, [listenContainerScroll, viewWidth])

    useEffect(() => {
      const tabScrollContainer = slickTrackRef.current
      if (tabScrollContainer)
        tabScrollContainer.addEventListener(
          'scroll',
          listenContainerScroll,
          false
        )
      return () => {
        if (tabScrollContainer)
          tabScrollContainer.removeEventListener(
            'scroll',
            listenContainerScroll,
            false
          )
      }
    }, [listenContainerScroll])

    const scrollToNext = () => {
      const currentTrackElement = slickTrackRef.current
      if (currentTrackElement)
        currentTrackElement.scroll({
          top: 0,
          left: currentTrackElement.scrollLeft + defaultStep,
          behavior: 'smooth'
        })
    }

    const scrollToPrev = () => {
      const currentTrackElement = slickTrackRef.current
      if (currentTrackElement)
        currentTrackElement.scroll({
          top: 0,
          left: currentTrackElement.scrollLeft - defaultStep,
          behavior: 'smooth'
        })
    }

    const onMouseDown = useCallback(
      (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!slickTrackClass) return
        const { clientX, currentTarget } = e
        setMenuState((prevState) => ({
          ...prevState,
          isDragging: true,
          curXPos: clientX + currentTarget.scrollLeft
        }))
      },
      [slickTrackClass]
    )

    const onMouseMove = useCallback(
      (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!slickTrackClass || !menuState.isDragging) return
        const { clientX, currentTarget } = e
        slickTrackRef.current.scrollLeft +=
          menuState.curXPos - (clientX + currentTarget.scrollLeft)
      },
      [slickTrackClass, menuState.isDragging, menuState.curXPos]
    )

    const onMouseUp = useCallback(
      (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!slickTrackClass) return
        setMenuState((prevState) => ({
          ...prevState,
          isDragging: false
        }))
      },
      [slickTrackClass]
    )

    useImperativeHandle(ref, () => {
      return {
        updateSlickTrackClass
      }
    })
    const extraPadding = 10 // This padding is used for out-of slider
    return (
      <div
        className='slick-slider pps-image-slider slick-initialized'
        style={{ maxWidth: viewWidth ? viewWidth - extraPadding : 0 }}
      >
        <div className='slick-list'>
          {!clearBtn && (
            <CustomNextArrow
              className={
                slickTrackClass && menuState.left === true ? 'd-block' : ''
              }
              onClick={scrollToNext}
            />
          )}

          <div
            ref={slickTrackRef}
            style={{ maxWidth: viewWidth ? viewWidth - 20 - extraPadding : 0 }} // Subtract the padding
            className={`slick-track ${slickTrackClass || ''} ${
              className || ''
            }`}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {children}
          </div>
          {!clearBtn && (
            <CustomPrevArrow
              className={
                slickTrackClass && menuState.right === true ? 'd-block' : ''
              }
              onClick={scrollToPrev}
            />
          )}
        </div>
      </div>
    )
  }
)

const ImageSliderItem = ({ children }) => {
  return (
    <div className='slick-slide'>
      <div>{children}</div>
    </div>
  )
}

export { ImageSliderItem, CustomNextArrow, CustomPrevArrow }
export default React.memo(ImageSlider)

ImageSliderItem.propTypes = {
  children: PropTypes.any.isRequired
}

CustomNextArrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
}

CustomNextArrow.defaultProps = {
  className: '',
  onClick: () => {}
}

CustomPrevArrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
}

CustomPrevArrow.defaultProps = {
  className: '',
  onClick: () => {}
}

ImageSlider.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  customViewWidth: PropTypes.number
}

ImageSlider.defaultProps = {
  className: '',
  customViewWidth: 0
}
