import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loader from '../components/Loader';

describe('Loader component', () => {
    test('renders Loader component with spinner', () => {
      render(<Loader />);
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });