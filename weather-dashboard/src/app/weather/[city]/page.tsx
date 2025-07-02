'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchWeatherData, toggleTemperatureUnit } from '@/lib/features/weatherSlice';
import { 
  ArrowLeft, 
  Droplets, 
  Wind, 
  Eye, 
  ToggleLeft, 
  ToggleRight,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap
} from 'lucide-react';

export default function WeatherPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { current, loading, error, temperatureUnit } = useAppSelector((state) => state.weather);

  const cityName = decodeURIComponent(params.city as string);

  useEffect(() => {
    if (cityName && !current) {
      dispatch(fetchWeatherData(cityName));
    }
  }, [cityName, current, dispatch]);

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: React.ReactElement } = {
      '01d': <Sun className="w-16 h-16 text-yellow-500" />,
      '01n': <Sun className="w-16 h-16 text-yellow-300" />,
      '02d': <Cloud className="w-16 h-16 text-gray-400" />,
      '02n': <Cloud className="w-16 h-16 text-gray-500" />,
      '03d': <Cloud className="w-16 h-16 text-gray-500" />,
      '03n': <Cloud className="w-16 h-16 text-gray-600" />,
      '04d': <Cloud className="w-16 h-16 text-gray-600" />,
      '04n': <Cloud className="w-16 h-16 text-gray-700" />,
      '09d': <CloudRain className="w-16 h-16 text-blue-500" />,
      '09n': <CloudRain className="w-16 h-16 text-blue-600" />,
      '10d': <CloudRain className="w-16 h-16 text-blue-500" />,
      '10n': <CloudRain className="w-16 h-16 text-blue-600" />,
      '11d': <Zap className="w-16 h-16 text-yellow-600" />,
      '11n': <Zap className="w-16 h-16 text-yellow-700" />,
      '13d': <CloudSnow className="w-16 h-16 text-blue-200" />,
      '13n': <CloudSnow className="w-16 h-16 text-blue-300" />,
      '50d': <Cloud className="w-16 h-16 text-gray-400" />,
      '50n': <Cloud className="w-16 h-16 text-gray-500" />,
    };
    return iconMap[iconCode] || <Cloud className="w-16 h-16 text-gray-500" />;
  };

  const convertTemperature = (temp: number) => {
    if (temperatureUnit === 'imperial') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const getTemperatureUnit = () => {
    return temperatureUnit === 'metric' ? '°C' : '°F';
  };

  const convertWindSpeed = (speed: number) => {
    if (temperatureUnit === 'imperial') {
      return Math.round(speed * 2.237); // Convert m/s to mph
    }
    return Math.round(speed * 3.6); // Convert m/s to km/h
  };

  const getWindSpeedUnit = () => {
    return temperatureUnit === 'metric' ? 'km/h' : 'mph';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-6 py-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-2">Error</h2>
            <p>{error}</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">No weather data available</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </button>
          
          {/* Temperature Unit Toggle */}
          <button
            onClick={() => dispatch(toggleTemperatureUnit())}
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg border"
          >
            <span className={temperatureUnit === 'metric' ? 'font-semibold' : 'text-gray-500'}>°C</span>
            {temperatureUnit === 'metric' ? (
              <ToggleLeft className="w-6 h-6 text-blue-600" />
            ) : (
              <ToggleRight className="w-6 h-6 text-blue-600" />
            )}
            <span className={temperatureUnit === 'imperial' ? 'font-semibold' : 'text-gray-500'}>°F</span>
          </button>
        </div>

        {/* Main Weather Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {current.name}, {current.sys.country}
            </h1>
            <div className="flex items-center justify-center mb-4">
              <div className="mr-4">
                {getWeatherIcon(current.weather[0].icon)}
              </div>
              <div>
                <div className="text-6xl font-bold text-gray-900 dark:text-white">
                  {convertTemperature(current.main.temp)}{getTemperatureUnit()}
                </div>
                <div className="text-xl text-gray-600 dark:text-gray-300 capitalize">
                  {current.weather[0].description}
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Feels like {convertTemperature(current.main.feels_like)}{getTemperatureUnit()}
            </p>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Humidity */}
            <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-6 text-center">
              <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Humidity</h3>
              <p className="text-2xl font-bold text-blue-600">{current.main.humidity}%</p>
            </div>

            {/* Wind Speed */}
            <div className="bg-green-50 dark:bg-green-900 rounded-xl p-6 text-center">
              <Wind className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Wind Speed</h3>
              <p className="text-2xl font-bold text-green-600">
                {convertWindSpeed(current.wind.speed)} {getWindSpeedUnit()}
              </p>
            </div>

            {/* Weather Condition */}
            <div className="bg-orange-50 dark:bg-orange-900 rounded-xl p-6 text-center">
              <Eye className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Conditions</h3>
              <p className="text-lg font-bold text-orange-600 capitalize">
                {current.weather[0].main}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Weather ID:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{current.weather[0].id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">City ID:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{current.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}