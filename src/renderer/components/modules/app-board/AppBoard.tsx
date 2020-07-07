import React, {Component} from 'react';
import './AppBoard.scss'
import {StoreState} from "../../../store/reducer";
import {connect} from "react-redux";
import {
	ModuleDescription,
	setCurrent
} from "../../../store/module/components/action";
import Router from "../../router/Router";
import {Button} from "@material-ui/core";

interface StateProps {
	components: ModuleDescription[]
}

interface DispatchProps {
	setCurrent: (componentName: string) => void
}

const mapStateToProps = (state: StoreState) => ({});
const mapDispatchToProps = (dispatch: Function) => {
	return {
		setCurrent: (componentName: string) => {
			dispatch(setCurrent(componentName))
		}
	}
};

interface Props extends DispatchProps, StateProps {

}

interface State {

}

class AppBoard extends Component<Props, State> {
	render() {

		const apps = Object.keys(Router.componentMap).map(key => Router.componentMap[key]["info"])
		console.log(apps);
		return (
			<div className={"AppBoard"}>
				{apps.map(app =>
					<Button color={"primary"} size={"large"}
					        onClick={() => this.props.setCurrent(app.name)}
					        key={app.name}>{app.name}
					</Button>
				)}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBoard) as any;
