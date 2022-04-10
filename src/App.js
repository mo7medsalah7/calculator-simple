import { useReducer } from "react";
import { ACTIONS } from "./actions/action";
import OperationButton from "./OperationButton";
import DigitButton from "./DigitButton";
import "./styles.css";

function reducer(state, { type, payload }) {
	switch (type) {
		case ACTIONS.ADD_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					currentOperand: payload.digit,
					overwrite: false,
				};
			}
			if (state.currentOperand === "0" && payload.digit === "0")
				return state;
			if (state.currentOperand === "." && payload.digit === ".")
				return state;
			return {
				...state,
				currentOperand: `${state.currentOperand || ""}${payload.digit}`,
			};
		case ACTIONS.CHOOSE_OPERATION:
			if (state.currentOperand == null && state.previousOperand == null) {
				return state;
			}
			if (state.previousOperand == null) {
				return {
					...state,
					operation: payload.operation,
					previousOperand: state.currentOperand,
					currentOperand: null,
				};
			}
			return {
				...state,
				operation: payload.operation,
				previousOperand: evaluate(state),
				currentOperand: null,
			};
		case ACTIONS.CLEAR:
			return {};
		case ACTIONS.DELETE_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					overwrite: false,
					currentOperand: null,
				};
			}
			if (state.currentOperand == null) return state;
			if (state.currentOperand.length === 1) {
				return {
					...state,
					currentOperand: null,
				};
			}
			return {
				...state,
				currentOperand: state.currentOperand.slice(0, -1),
			};
		case ACTIONS.EVALUATE:
			if (
				state.operation == null ||
				state.currentOperand == null ||
				state.previousOperand == null
			) {
				return state;
			}

			return {
				...state,
				previousOperand: null,
				operation: null,
				currentOperand: evaluate(state),
				overwrite: true,
			};
		default:
			return { ...state };
	}
}

const INTEGERfORMATTER = Intl.NumberFormat("en-US", {
	maximumFractionDigits: 0,
});

function formatOperand(operand) {
	if (operand == null) return;
	const [integer, decimal] = operand.split(".");
	if (decimal == null) return INTEGERfORMATTER.format(integer);
	return `${INTEGERfORMATTER.format(integer)}.${decimal}`;
}

function evaluate({ previousOperand, currentOperand, operation }) {
	const prev = parseFloat(previousOperand);
	const current = parseFloat(currentOperand);
	if (isNaN(prev) || isNaN(current)) return "";
	let computation = "";
	switch (operation) {
		case "+":
			computation = prev + current;
			break;
		case "-":
			computation = prev - current;
			break;
		case "*":
			computation = prev * current;
			break;
		case "/":
			computation = prev / current;
			break;
	}

	return computation.toString();
}

function App() {
	const [{ currentOperand, previousOperand, operation }, dispatch] =
		useReducer(reducer, {});

	return (
		<div className="calculator-grid">
			<div className="output">
				<div className="previous-operand">
					{formatOperand(previousOperand)} {operation}
				</div>
				<div className="current-operand">
					{formatOperand(currentOperand)}
				</div>
			</div>
			<button
				className="span-two"
				onClick={() => dispatch({ type: ACTIONS.CLEAR })}
			>
				AC
			</button>
			<button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
				DEL
			</button>
			<OperationButton operation={"/"} dispatch={dispatch} />
			<DigitButton digit="1" dispatch={dispatch} />
			<DigitButton digit="2" dispatch={dispatch} />
			<DigitButton digit="3" dispatch={dispatch} />

			<OperationButton operation={"*"} dispatch={dispatch} />

			<DigitButton digit="4" dispatch={dispatch} />
			<DigitButton digit="5" dispatch={dispatch} />
			<DigitButton digit="6" dispatch={dispatch} />

			<OperationButton operation={"+"} dispatch={dispatch} />

			<DigitButton digit="7" dispatch={dispatch} />
			<DigitButton digit="8" dispatch={dispatch} />
			<DigitButton digit="9" dispatch={dispatch} />

			<OperationButton operation={"-"} dispatch={dispatch} />

			<DigitButton digit="." dispatch={dispatch} />
			<DigitButton digit="0" dispatch={dispatch} />

			<button
				className="span-two"
				onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
			>
				=
			</button>
		</div>
	);
}

export default App;