import React from "react";
import { WeatherCityName } from "@apis/rest/backend/generated";
import { createAppSelector } from "@store/utils/utils.reducer";
import { useAppSelector } from "@store";
import { Divider, Stack, Typography } from "@mui/material";

type WeatherDetailProps = {
	city: WeatherCityName;
};

const weatherDetailSelector = (city: WeatherCityName) =>
	createAppSelector([(s) => s.weather], (weather) => {
		return {
			weather: weather.weather[city],
		};
	});

export function WeatherDetail({ city }: WeatherDetailProps) {
	const { weather } = useAppSelector(weatherDetailSelector(city));

	if (!weather) return;

	return (
		<Stack direction={"row"} spacing={4}>
			<Stack spacing={1.5}>
				<Stack alignItems={"center"}>
					<Typography variant={"overline"} fontSize={"medium"}>
						Temperature
					</Typography>
				</Stack>
				<Divider />
				<Stack spacing={1}>
					<Typography>Current {weather.current.temperature.current}°C</Typography>
					<Typography>Feel like {weather.current.temperature.feelsLike}°C</Typography>
				</Stack>
			</Stack>
			<Stack spacing={1.5}>
				<Stack alignItems={"center"}>
					<Typography variant={"overline"} fontSize={"medium"}>
						Weather
					</Typography>
				</Stack>
				<Divider />
				<Stack spacing={1}>
					<Typography>{weather.current.type}</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
}
