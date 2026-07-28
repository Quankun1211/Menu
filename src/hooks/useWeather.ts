import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';

interface WeatherState {
  temperature: number;
  condition: string;
  loading: boolean;
  error: string | null;
  permissionStatus: Location.PermissionStatus | 'checking';
  canAskAgain: boolean;
}

const API_KEY = '6dac6e3742d03bfe2c3ba3fb2dce1dd8';

const DEFAULT_WEATHER = {
  temperature: 25,
  condition: 'Clear',
};

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherState>({
    ...DEFAULT_WEATHER,
    loading: false,
    error: null,
    permissionStatus: 'checking',
    canAskAgain: true,
  });

  const fetchWeather = useCallback(async () => {
    setWeatherData((current) => ({ ...current, loading: true, error: null }));

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = location.coords;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error(`Weather API returned ${response.status}`);

      const data = await response.json();
      const temperature = data?.main?.temp;
      const condition = data?.weather?.[0]?.main;

      if (typeof temperature !== 'number' || typeof condition !== 'string') {
        throw new Error('Invalid weather response');
      }

      setWeatherData((current) => ({
        ...current,
        temperature: Math.round(temperature),
        condition,
        loading: false,
        error: null,
        permissionStatus: Location.PermissionStatus.GRANTED,
      }));
    } catch {
      setWeatherData((current) => ({
        ...current,
        loading: false,
        error: 'Không thể cập nhật thời tiết lúc này.',
      }));
    }
  }, []);

  useEffect(() => {
    Location.getForegroundPermissionsAsync().then((permission) => {
      setWeatherData((current) => ({
        ...current,
        permissionStatus: permission.status,
        canAskAgain: permission.canAskAgain,
      }));

      // Returning users who already granted access are updated without a prompt.
      if (permission.status === Location.PermissionStatus.GRANTED) {
        fetchWeather();
      }
    });
  }, [fetchWeather]);

  const requestWeather = useCallback(async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    setWeatherData((current) => ({
      ...current,
      permissionStatus: permission.status,
      canAskAgain: permission.canAskAgain,
    }));

    if (permission.status === Location.PermissionStatus.GRANTED) {
      await fetchWeather();
    }
  }, [fetchWeather]);

  return { ...weatherData, requestWeather };
};
