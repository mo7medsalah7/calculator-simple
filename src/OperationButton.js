import { ACTIONS } from "./actions/action";

function OperationButton({ dispatch, operation }) {
	return (
		<div>
			<button
				onClick={() =>
					dispatch({
						type: ACTIONS.CHOOSE_OPERATION,
						payload: { operation },
					})
				}
			>
				{operation}
			</button>
		</div>
	);
}

export default OperationButton;
