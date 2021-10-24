import React, { ReactNode } from "react";
import { Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import { InferableComponentEnhancerWithProps } from "react-redux";

type ContextProps = {
	items: Array<{
		label: string;
		show?: () => (param: { close: () => void }) => ReactNode;
		action?: () => void;
	}>;
	redux?: InferableComponentEnhancerWithProps<{}, {}>;
};

function extract<T = any>(init?: T) {
	const x = React.useState<T>(init as T);
	return {
		get: x[0],
		set: x[1],
	};
}

export function withContext(config: ContextProps) {
	return function (WrappedComponent: any) {
		return function (props: any) {
			const [pos, setPos] = React.useState<{ top: number; left: number } | undefined>(undefined);
			const modal = {
				open: extract<boolean>(false),
				component: extract<ContextProps["items"][number]["show"]>(undefined),
			};

			const items = config.items.map(item => {
				let onClicks: (() => void)[] = [];

				if (item.action) {
					onClicks.push(item.action);
				}

				if (item.show) {
					onClicks.push(() => {
						modal.component.set(item.show);
						modal.open.set(true);
					});
				}

				onClicks.push(() => setPos(undefined));

				return (
					<MenuItem key={item.label} onClick={() => onClicks.forEach(f => f())}>
						{item.label}
					</MenuItem>
				);
			});

			let handleClose = () => modal.open.set(false);

			let onContextMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
				setPos({
					left: e.clientX,
					top: e.clientY,
				});
			};

			const memo = React.useMemo(() => {
				return React.createElement(config.redux ? config.redux(WrappedComponent) : WrappedComponent, props);
			}, []);

			return (
				<div onContextMenu={onContextMenu} style={{ height: "100%" }}>
					{memo}
					<Menu anchorReference="anchorPosition" anchorPosition={pos} keepMounted open={Boolean(pos?.left)} onClose={() => setPos(undefined)}>
						{items}
					</Menu>
					<Dialog open={modal.open.get}>
						{
							// @ts-ignore
							modal.component.get && modal.component.get({ close: handleClose })
						}
					</Dialog>
				</div>
			);
		};
	};
}
