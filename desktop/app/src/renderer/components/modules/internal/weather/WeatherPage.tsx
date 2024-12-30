import { useAppDispatch, useAppSelector } from "@store";
import React, { useEffect } from "react";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { register } from "@/renderer/decorators/Module";
import { getWeather, getWeatherCities } from "@modules/weather/weather.async.actions";
import { createAppSelector } from "@store/utils/utils.reducer";
import { WeatherCityName } from "@apis/rest/backend/generated";
import { WeatherDetail } from "@components/internal/weather/WeatherDetail";

const weatherPageSelector = createAppSelector([(s) => s.weather], (weather) => {
	return {
		cities: weather.cities,
	};
});

const WeatherPage = () => {
	const dispatch = useAppDispatch();

	const { cities } = useAppSelector(weatherPageSelector);

	const [selectedCity, setSelectedCity] = React.useState<WeatherCityName>();

	useEffect(() => {
		dispatch(getWeatherCities());
	}, [dispatch]);

	useEffect(() => {
		if (selectedCity) {
			dispatch(getWeather(selectedCity));
		}
	}, [dispatch, selectedCity]);

	return (
		<Stack spacing={8} p={4} direction={"row"}>
			<Autocomplete
				value={selectedCity}
				disableClearable
				sx={{ width: 200 }}
				onChange={(e, v) => setSelectedCity(v)}
				renderInput={(params) => <TextField {...params} variant={"standard"} label={"City"} />}
				options={cities}
			/>

			{selectedCity && <WeatherDetail city={selectedCity} />}
		</Stack>
	);
};

register(WeatherPage, { name: "Weather", path: "/weather" });
