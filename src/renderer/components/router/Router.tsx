import React, {PureComponent} from 'react';
import {StoreState} from "../../store/reducer";
import {connect} from "react-redux";
import {Renamer} from "../modules/renamer/Renamer";
import AppBoard from "../modules/appBoard/AppBoard";
import Module from "../modules/Module";
import {Encoder} from "../modules/encoder/Encoder";
import {Light} from "../modules/lights/Light";

interface StateProps {
	current?: string
}

interface DispatchProps {

}

const mapStateToProps = (state: StoreState) => {
	console.log("mapStateToProps", state);
	return {
		current: state.components.selected
	}
};
const mapDispatchToProps = (dispatch: Function) => {
	return {}
};

interface Props extends StateProps, DispatchProps {

}

interface State {
	selectedComponent?: string
}

class Router extends PureComponent<Props, State> {

	public static componentMap = {
		[Renamer.info.name]: Renamer,
		[Encoder.info.name]: Encoder,
		[Light.info.name]: Light
	}

	state = {
		selectedComponent: undefined
	}


	render() {
		const comp = Router.componentMap[this.props.current ?? ""];
		if (comp !== undefined) {
			return <Module info={comp.info}  >
				{React.createElement(comp, {})}
			</Module>
		} else {
			return <AppBoard/>
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);
