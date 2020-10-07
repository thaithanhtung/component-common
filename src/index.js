import React from 'react'
import styles from './styles.module.css'
import ImageSlide from './components/ImageSlideCustom'

export const ImageSlideCustom = (props) => {
  return <ImageSlide {...props} />
}

export const ExampleComponent = ({ text }) => {
  return (
    <div className={styles.test}>Example Component: haoodaddadadad{text}</div>
  )
}
