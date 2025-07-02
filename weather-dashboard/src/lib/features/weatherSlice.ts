import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface WeatherData {
  id: number;
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

interface WeatherState {
  current: WeatherData | null;
  cache: Record<string, WeatherData>;
  loading: boolean;
  error: string | null;
  temperatureUnit: 'metric' | 'imperial';
}

const initialState: WeatherState = {
  current: null,
  cache: {},
  loading: false,
  error: null,
  temperatureUnit: 'metric',
};

const API_KEY = 'abd4c35f6ccbb95792fef39e22c46049';

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the city name and try again.');
        }
        throw new Error('Failed to fetch weather data. Please try again later.');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    toggleTemperatureUnit: (state) => {
      state.temperatureUnit = state.temperatureUnit === 'metric' ? 'imperial' : 'metric';
    },
    loadFromCache: (state, action: PayloadAction<string>) => {
      const cityKey = action.payload.toLowerCase();
      if (state.cache[cityKey]) {
        state.current = state.cache[cityKey];
        state.error = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
        state.error = null;
        // Cache the result
        const cityKey = action.payload.name.toLowerCase();
        state.cache[cityKey] = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, toggleTemperatureUnit, loadFromCache } = weatherSlice.actions;
export default weatherSlice.reducer;