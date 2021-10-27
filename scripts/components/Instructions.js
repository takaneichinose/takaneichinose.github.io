////////////////////////////////////////////////////////////////////////////////
// Component of the instructions                                              //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, {
	useState,
	useEffect,
} from "https://cdn.skypack.dev/react@17.0.1";

// React implementation of Redux
import {
	useSelector,
	useDispatch,
} from "https://cdn.skypack.dev/react-redux@7.2.4";

// Reducers (Set state methods)
import { showSpeechDialog, hideSpeechDialog } from "../utils/systemSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

/**
 * Component of the instructions
 * @param object props Parameters passed to a component
 */
export default function Instructions(props) {
	// Properties
	const lang = props.lang;
	
	// React useState hooks
	const [isShown, setIsShown] = useState(true);
	const [message, setMessage] = useState(Definition.INSTRUCTION_MESSAGE.Main);
	
	// This is like setState or something
	const dispatch = useDispatch();
	
	// This is to get the state from Redux
	const assets = useSelector(state => state.assets);
	
	if (!isShown) {
		return null;
	}
	
	// Shorthand of the text object from assets
	const text = assets.text[lang];
	
	// Key
	let textKey = `instructions${Definition.INSTRUCTION_MESSAGE[message]}`;
	
	if (text === undefined || textKey === null) {
		return null;
	}
	
	// Show instruction speech dialog
	const showInstruction = () => {
		dispatch(showSpeechDialog({
			message: text[textKey],
			callback: evt => {
				if (message + 1 >= Object.keys(Definition.INSTRUCTION_MESSAGE).length / 2) {
					setIsShown(false);
					
					return;
				}
				
				// Add one step to the shown instruction
				setMessage(message + 1);
				
				showInstruction();
			}
		}));
	};
	
	showInstruction();
	
	return (
		<div
			className="instructions"
			onClick={evt => {
				evt.stopPropagation();
			}}>
		</div>
	);
}
