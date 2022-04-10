import { ACTIONS } from "./actions/action";

function DigitButton({ dispatch, digit }) {
	return (
		<div>
			<button
				onClick={() =>
					dispatch({
						type: ACTIONS.ADD_DIGIT,
						payload: { digit },
					})
				}
			>
				{digit}
			</button>
		</div>
	);
}

export default DigitButton;
