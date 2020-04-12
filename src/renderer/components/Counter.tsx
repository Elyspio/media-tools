import * as React from 'react';
import {RootState} from "../store/reducer";
import {Dispatch} from "redux";
import {decrement, increment} from "../store/module/counter/counterActions";
import {connect} from "react-redux";

export interface Props {
	value: number;
	incrementValue: () => any;
	decrementValue: () => any;
}

class Counter extends React.Component<Props> {
	render() {
		let {value} = this.props;
		return (
			<div className="counter">
				<p id="counter-value">Current value: {value}</p>
				<p>
					<button id="increment" onClick={this.props.incrementValue}>
						Increment
					</button>
					<button id="decrement" onClick={this.props.decrementValue}>
						Decrement
					</button>
				</p>
			</div>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	value: state.counter.value
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	incrementValue: () => dispatch(increment(1)),
	decrementValue: () => dispatch(decrement(1))
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter) as any;


