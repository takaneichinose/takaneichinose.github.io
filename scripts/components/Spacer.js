////////////////////////////////////////////////////////////////////////////////
// Component of spacer                                                        //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React from "https://cdn.skypack.dev/react@17.0.1";

// React implementation of Redux
import { useSelector } from "https://cdn.skypack.dev/react-redux@7.2.4";

// Definition class for this project
import * as Definition from "../classes/Definition";

/**
 * Component of spacer
 */
export default function Spacer() {
	// This is to get the state from Redux
	const system = useSelector(state => state.system);
	
	// Sizes
	const WIDTH = system.screen.width * Definition.TEXT_WIDTH;
	const HEIGHT = system.screen.height * Definition.TEXT_HEIGHT;
	
	return (
		<div
			className="spacer"
			style={{
				"--width": `${WIDTH}px`,
				"--height": `${HEIGHT}px`,
			}}></div>
	);
}
