import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Info } from '../index'
import { mockInfoData } from '../__fixtures__/mockData'

describe('<Info />', () => { 
  it('should render the component', () => { 
    render(<Info data={mockInfoData} />)
    expect(screen.getByText('28')).toBeInTheDocument()
    expect(screen.getByText('°C')).toBeInTheDocument()
    expect(screen.getByText('Clouds')).toBeInTheDocument()
    expect(screen.getByAltText('weather icon')).toBeInTheDocument()
    expect(screen.getByText('61')).toBeInTheDocument()
    expect(screen.getByText('%')).toBeInTheDocument()
  })
})