import { useMemo } from "react";
import { Button, Stack } from "@mui/material";
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
						<Button key={r.path} variant={"outlined"} onClick={() => navigate(r.path)} color={isInternal ? "primary" : "secondary"}>
							{r.name}
						</Button>
					);
				}),
		[navigate]
	);

	return (
		<Stack direction={"row"} flexWrap={"wrap"} spacing={2}>
			{links}
		</Stack>
	);
}
