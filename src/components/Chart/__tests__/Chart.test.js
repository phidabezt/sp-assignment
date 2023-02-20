import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Chart } from '../index'
import { mockTideData, mockSunData } from '../__fixtures__/mockData'
import classes from '../Chart.module.scss'

describe('<Chart />', () => {
  it('should render the component', async () => {
    render(<Chart dataTide={mockTideData} dataSun={mockSunData} />)
    expect(screen.getByText('Tide')).toBeInTheDocument()
    expect(screen.getByText('Sunrise & Sunset')).toBeInTheDocument()
  })
})