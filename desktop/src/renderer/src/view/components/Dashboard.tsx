import { useMemo } from "react";
import { Box, Button, Stack } from "@mui/material";
import { routes } from "@/config/routes.config";
import { useNavigate } from "react-router";

export function Dashboard() {
	const navigate = useNavigate();

	const links = useMemo(
		() =>
			Object.values(routes)
				.filter((r) => r.show.appboard)
				.map((r) => {
					const isInternal = r.path.startsWith("/internal");

					return (
						<Box key={r.path}>
							<Button
								variant={"outlined"}
								onClick={() => {
									void navigate(r.path);
								}}
								color={isInternal ? "primary" : "secondary"}
							>
								{r.name}
							</Button>
						</Box>
					);
				}),
		[navigate]
	);

	return (
		<Stack direction={"row"} flexWrap={"wrap"} alignItems={"center"} justifyContent={"center"} spacing={2}>
			{links}
		</Stack>
	);
}
