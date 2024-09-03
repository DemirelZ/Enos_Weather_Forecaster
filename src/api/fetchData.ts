import axios from "axios";

export const getDataForCurrentDay = async (city: string) => {
  const apiKey = process.env.REACT_APP_API_KEY;

  try {
    const response = await axios.get(
      "http://api.weatherbit.io/v2.0/forecast/daily",
      {
        params: {
          city: city,
          key: apiKey,
          days: 1,
        },
      }
    );
    //console.log("response", response.data.city_name);
    const apiCityName = response.data.city_name;
    if (apiCityName.toLowerCase() !== city.toLowerCase()) {
      throw new Error("City name mismatch");
    }
    const data = response.data.data[0] || {};
    return data;
  } catch (error) {
    console.error("API isteği başarısız:", error);
    throw error;
  }
};

export const getDataForAWeek = async (city: string) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  try {
    const response = await axios.get(
      "http://api.weatherbit.io/v2.0/forecast/daily",
      {
        params: {
          city: city,
          key: apiKey,
          days: 7,
        },
      }
    );
    const apiCityName = response.data.city_name;
    if (apiCityName.toLowerCase() !== city.toLowerCase()) {
      throw new Error("City name mismatch");
    }
    const data = response.data.data || [];
    return data;
  } catch (error) {
    console.error("API isteği başarısız:", error);
    throw error;
  }
};
