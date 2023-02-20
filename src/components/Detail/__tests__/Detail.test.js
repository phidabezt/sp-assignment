import React from 'react';
import { render, screen } from '@testing-library/react';
import { Detail } from '../index';
import { mockDetailData } from '../__fixtures__/mockData';

describe('<Detail />', () => { 
  it('should render the component', () => {
    render(<Detail data={mockDetailData} />);
    expect(screen.getByText('PSI')).toBeInTheDocument();
    expect(screen.getByText('14.69')).toBeInTheDocument();
    expect(screen.getByText('RAIN')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('DENGUE')).toBeInTheDocument();
    expect(screen.getByText('51')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByAltText('add button')).toBeInTheDocument();
  })
})