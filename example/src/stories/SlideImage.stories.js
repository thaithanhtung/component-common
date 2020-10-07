import React from 'react'
import { action } from '@storybook/addon-actions'

import { ImageSlideCustom } from 'component-common'

// import ImageSlide from '../../src/components/ImageSlideCustom';

export default {
  title: 'Example/SlideImage',
  component: ImageSlideCustom,
  argTypes: {
    customViewWidth: { type: 'number' }
  },
  parameters: {
    docs: {
      description: {
        component: 'Tài liệu '
      }
    }
  }
}

const Template = (args) => {
  return <ImageSlideCustom {...args} />
}

export const Simple = Template.bind({})
Simple.args = {
  // images: [],
  chooseColor: 'blue',
  clearBtn: false,
  setShowData: action('clicked')
}
