import {createMuiTheme} from "@material-ui/core/styles";
// @ts-ignore
import * as style from "../renderer/App.scss";
import {Logger} from "../main/util/logger";
const logger = Logger("Theme")

logger.info("style", style);


function createTheme() {
	return createMuiTheme({
		overrides: {
			MuiTooltip: {
				tooltip: {
					fontSize: "0.75em"
				}
			}
		},
		palette: {
			type: "dark",
			primary: {
				main: style.primary
			},
			secondary: {
				main: style.secondary
			},
			background: {
				default: style.background,
				paper: style.background
			}
		}
	});
}


export const theme = createTheme();
