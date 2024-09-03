export interface WeatherData {
  datetime: string;
  temp: number;
  min_temp: number;
  max_temp: number;
  weather: {
    description: string;
    icon: string;
  };
}

export interface CacheData {
  current?: WeatherData;
  week?: WeatherData[];
}

export interface CustomSearchInputProps {
  city: string;
  setCity: (city: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

export interface WeatherIconProps {
  iconId: string;
}
