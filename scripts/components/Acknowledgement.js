////////////////////////////////////////////////////////////////////////////////
// Component of Statistics, skill level component                             //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, { useState } from "https://cdn.skypack.dev/react@17.0.1";

// React implementation of Redux
import {
	useSelector,
	useDispatch,
} from "https://cdn.skypack.dev/react-redux@7.2.4";

// Reducers (Set state methods)
import { hideAcknowledgement } from "../utils/systemSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Components
import Text from "./Text";

/**
 * Acknowledgement, my message to the people
 * @param object props Parameters passed to a component
 */
export default function Acknowledgement(props) {
	// Properties
	const lang = props.lang;
	
	// React useState hooks
	const [isFadeOut, setIsFadeOut] = useState(false);
	
	// This is to get the state from Redux
	const system = useSelector(state => state.system);
	const assets = useSelector(state => state.assets);

	// This is like setState or something
	const dispatch = useDispatch();
	
	if (!system.acknowledgementShown) {
		return null;
	}
	
	// Class name to add while Fading-out
	const fadeOutClassName = "acknowledgement-fade-out";
	
	// Default class name
	let acknowledgementClassName = "acknowledgement";
	
	if (isFadeOut) {
		acknowledgementClassName += ` ${fadeOutClassName}`;
	}
	
	// Shorthand of the text object from assets
	const text = assets.text[lang];
	
	const WIDTH = system.screen.width * Definition.ACKNOWLEDGEMENT_WIDTH;
	const HEIGHT = system.screen.height * Definition.ACKNOWLEDGEMENT_HEIGHT;
	const PAD_X = system.screen.width * Definition.ACKNOWLEDGEMENT_PAD_X;
	const PAD_Y = system.screen.height * Definition.ACKNOWLEDGEMENT_PAD_Y;
	
	return (
		<div
			className={acknowledgementClassName}
			onClick={evt => {
				evt.stopPropagation();

				setIsFadeOut(true);
			}}
			onAnimationEnd={evt => {
				if (evt.animationName === fadeOutClassName) {
					dispatch(hideAcknowledgement());
					
					setIsFadeOut(false);
				}
			}}>
			<div
				className="acknowledgement-dialog"
				style={{
					"--background-image": `url(${assets.image.Acknowledgement})`,
					"--width": `${WIDTH}px`,
					"--height": `${HEIGHT}px`,
					"--padding": `${PAD_X}px ${PAD_Y}px`,
				}}>
				<Text content={text.acknowledgementTitle} />
				<Text content={text.acknowledgementDescription} />
			</div>
		</div>
	);
}
