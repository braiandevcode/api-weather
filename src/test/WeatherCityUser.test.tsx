import { describe, it, expect, beforeEach } from 'vitest';
import {render, cleanup } from '@testing-library/react';
import { WeatherCityUser } from '../components/WeatherCityUser';

describe('WeatherCityUser', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should render WeatherCityUser', () => {
    render(<WeatherCityUser />);
    expect(true).toBeTruthy();
  });
});