import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
// import { WeatherCityUser } from '../components/WeatherCityUser';
import { ContextWeather } from '../context/ContextCurrentWeather';
import { ContextSearch } from '../context/ContextSearch';
import { ContextForecast } from '../context/ContextForecastWheather';
import { WeatherCityUser } from '../components/WeatherCityUser';
// import { WeatherTimeWeek } from '../components/WeatherTimeWeek';

// Mock de los contextos necesarios
const mockContextWeather = {
  stateCurrentWeather: {
    currentWeather: {
      dt: 1551545,
      temp: 255,
      temp_max: 245,
      temp_min: 278,
      humidity: 40,
      feels_like: 245,
      name: null,
      deg: 241,
      gust: 325,
      speed: 123,
      latitude: -24.21515,
      longitude: -15.214589,
      isLoading: true,
      icon: '01d',
      description: 'Nublado',
    },
  },
  setCoordinates: vi.fn(),
  setLoading: vi.fn(),
  setCurrentWeather: vi.fn(),
};

const mockContextSearch = {
  setField: vi.fn(),
  setErrors: vi.fn(),
  setButtonLoading: vi.fn(),
  handleChangeCity: vi.fn(),
  handleChangeLat: vi.fn(),
  handleChangeLon: vi.fn(),
  handleSubmit: vi.fn(),
  location: 'Test City',
  latManual: '',
  longManual: '',
  searchQuery: 'Test City',
  searchQueryLat: '',
  searchQueryLon: '',
  isVisible: true,
  isButtonLoading: false,
  url: '',
  errors: {},
};

const mockContextForecast = {
  stateForecastWeather: {
    forecast: [
      {
        date: '2025-03-16',
        dt: 1234567890,
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0,
        feels_like: 0,
        name: null,
        deg: 0,
        gust: 0,
        speed: 0,
        latitude: 0,
        longitude: 0,
        isLoading: true,
        icon: '',
        id: 12,
        description: '',
      },
    ],
  },
  setForecastWeather: vi.fn(),
};

// Simulación de geolocalización para pruebas
beforeEach(() => {
  vi.stubGlobal('navigator', {
    geolocation: {
      getCurrentPosition: vi.fn().mockImplementation((success) =>
        success({
          coords: {
            latitude: 40.7128,
            longitude: -74.0060,
          },
        })
      ),
    },
  });
});

describe('WeatherCityUser', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should render WeatherCityUser', async () => {
    render(
      <ContextWeather.Provider value={mockContextWeather}>
        <ContextSearch.Provider value={mockContextSearch}>
          <ContextForecast.Provider value={mockContextForecast}>
            <WeatherCityUser/>
          </ContextForecast.Provider>
        </ContextSearch.Provider>
      </ContextWeather.Provider>
    );

    // Verifica si el componente renderiza el nombre del día, en este caso se espera "Sunday"
    const nameDay = await waitFor(() => screen.getByText('Sunday'));
    expect(nameDay).toBeTruthy();
  });
});



