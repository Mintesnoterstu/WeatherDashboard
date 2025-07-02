'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchWeatherData, clearError, loadFromCache } from '@/lib/features/weatherSlice';
import { Search, Cloud, Sun, CloudRain } from 'lucide-react';

export default function Home() {
  const [cityName, setCityName] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, cache } = useAppSelector((state) => state.weather);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityName.trim()) return;

    // Clear any previous errors
    dispatch(clearError());

    // Check if we have cached data
    const cityKey = cityName.toLowerCase();
    if (cache[cityKey]) {
      dispatch(loadFromCache(cityKey));
      router.push(`/weather/${encodeURIComponent(cityName)}`);
      return;
    }

    // Fetch new data
    try {
      const result = await dispatch(fetchWeatherData(cityName));
      if (fetchWeatherData.fulfilled.match(result)) {
        router.push(`/weather/${encodeURIComponent(cityName)}`);
      }
    } catch {
      // Error is handled by the reducer
    }
  };

  const cachedCities = Object.keys(cache);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Sun className="w-16 h-16 text-yellow-500 absolute -top-2 -left-2" />
              <Cloud className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Weather Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Get real-time weather information for any city
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="Enter city name (e.g., London, New York)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !cityName.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Searching...
              </div>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Get Weather
              </>
            )}
          </button>
        </form>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Recent Searches */}
        {cachedCities.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Recent Searches
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {cachedCities.slice(0, 6).map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setCityName(city);
                    dispatch(loadFromCache(city));
                    router.push(`/weather/${encodeURIComponent(city)}`);
                  }}
                  className="text-left p-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded capitalize transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Weather Icons Animation */}
        <div className="flex justify-center space-x-4 opacity-50">
          <Sun className="w-6 h-6 text-yellow-500 animate-pulse" />
          <Cloud className="w-6 h-6 text-gray-500" />
          <CloudRain className="w-6 h-6 text-blue-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
