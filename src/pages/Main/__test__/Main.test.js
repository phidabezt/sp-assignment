import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Main } from '../index'
import axiosClient from '../../../api/axiosClient'
import { VN_LAT_LNG } from '../../../constant/common'
import { mockWeatherData } from '../__fixtures__/mockData'

const mockApiController = {
  getWeather: jest.fn(() => axiosClient.get('onecall')),
}

const fetchWeather = async () => {
  const response = await mockApiController.getWeather('onecall', {
    lat: VN_LAT_LNG.lat,
    lon: VN_LAT_LNG.lon,
    units: 'metric'
  })
  return response
}

describe('<Main />', () => {
  it('should render Main component', () => {
    const { container } = render(<Main />)
    expect(container.querySelector('.main')).toBeInTheDocument()
    expect(container.querySelector('.main__upper')).toBeInTheDocument()
    expect(container.querySelector('.main__lower')).toBeInTheDocument()
  })

  it('should render Main component with weather data', async () => {
    mockApiController.getWeather.mockImplementationOnce(() => Promise.resolve(mockWeatherData))
    const { container } = render(<Main />)

    const result = await fetchWeather()

    await waitFor(() => {
      expect(result).toEqual(mockWeatherData)
      expect(mockApiController.getWeather).toHaveBeenCalledTimes(1)
    })
  })
})