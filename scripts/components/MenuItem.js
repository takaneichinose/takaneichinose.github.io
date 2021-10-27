////////////////////////////////////////////////////////////////////////////////
// Button on the menu screen. These are interactables by click                //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, {
	useState,
	useEffect,
} from "https://cdn.skypack.dev/react@17.0.1";

// React implementation of Redux
import { useSelector } from "https://cdn.skypack.dev/react-redux@7.2.4";

// Definition class for this project
import * as Definition from "../classes/Definition";

/**
 * Button on the menu screen. These are interactables by click
 */
export default function MenuItem(props) {
	const img = props.img;
	const text = props.text;
	const x = props.x;
	const y = props.y;
	const callback = props.callback;
	const link = props.link;
	
	// This is to get the state from Redux
	const system = useSelector(state => state.system);
	
	const width = system.screen.width * Definition.MENU_BUTTON_WIDTH;
	const height = system.screen.height * Definition.MENU_BUTTON_HEIGHT;
	const styleX = x * system.screen.width * Definition.SPACE_SIZE_X;
	const styleY = y * system.screen.height * Definition.SPACE_SIZE_Y;
	
	// Target attribute for the link
	let target = null;
	
	return (
		<a
			href={(link !== null && typeof link !== "undefined") ? link : null}
			target={(link !== null && typeof link !== "undefined") ? "_blank" : null}
			className="menu-button hoverable"
			style={{
				"--width": `${width}px`,
				"--height": `${height}px`,
				"--x": `${styleX}px`,
				"--y": `${styleY}px`,
			}}
			onClick={evt => {
				if (callback !== null && typeof callback !== "undefined") {
					callback(evt);
				}
			}}>
			<img src={img} alt={text} />
		</a>
	);
}