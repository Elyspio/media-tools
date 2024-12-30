import { createSlice } from "@reduxjs/toolkit";
import { setWeather } from "./weather.action";
import { WeatherState } from "@modules/weather/weather.types";
import { getWeatherCities } from "@modules/weather/weather.async.actions";

const defaultState: WeatherState = {
	cities: [],
	weather: {},
};

const slice = createSlice({
	initialState: defaultState,
	name: "weather",
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(setWeather, (state, action) => {
			state.weather[action.payload.city] = action.payload.data;
		});
		addCase(getWeatherCities.fulfilled, (state, action) => {
			state.cities = action.payload;
		});
	},
});

export const { reducer } = slice;
