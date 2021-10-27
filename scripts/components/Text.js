////////////////////////////////////////////////////////////////////////////////
// Component of text                                                          //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React from "https://cdn.skypack.dev/react@17.0.1";

// React implementation of Redux
import { useSelector } from "https://cdn.skypack.dev/react-redux@7.2.4";

// Definition class for this project
import * as Definition from "../classes/Definition";

/**
 * Get the information of the image based on the text
 * @param string text Text to be rendered
 * @param number width Width of the image
 * @param number height Height of the image
 * @param object assets Map of assets
 */
function getImagePosition(text, width, height, assets) {
	let index = null;

	text = text.toUpperCase();

	// Background image CSS styles
	let backgroundImage = "";
	let backgroundPosition = "";
	let backgroundSize = "";

	for (let characters of Definition.CHARACTERS) {
		// Set of characters from the asset image
		const charSet = assets[characters];
		
		if ((index = charSet.indexOf(text)) >= 0) {
			backgroundImage = `var(--${characters}-image)`;
			backgroundPosition = `${index * width * -1 }px 0px`;
			backgroundSize = `${charSet.length * width}px ${height}px`;
		}
	}
	
	return {
		backgroundImage: backgroundImage,
		backgroundPosition: backgroundPosition,
		backgroundSize: backgroundSize,
	};
}

/**
 * Component of text
 * @param object props Parameters passed to a component
 */
export default function Text(props) {
	// Properties
	const content = props.content;
	const click = props.click;
	
	// This is to get the state from Redux
	const system = useSelector(state => state.system);
	const assets = useSelector(state => state.assets);
	
	// Sizes
	const WIDTH = system.screen.width * Definition.TEXT_WIDTH;
	const HEIGHT = system.screen.height * Definition.TEXT_HEIGHT;
	
	// Array of element of text
	let textArray = [];
			
	for (const word of content.split(" ")) {
		// Separate the sentence by space
		
		// Array to contain characters into words
		let wordArray = [];
		
		for (const text of word) {
			const {
				backgroundImage,
				backgroundPosition,
				backgroundSize,
			} = getImagePosition(text, WIDTH, HEIGHT, assets);

			// Style of the text image
			const textStyle = {
				"--width": `${WIDTH}px`,
				"--height": `${HEIGHT}px`,
				"--background-image": backgroundImage,
				"--background-position": backgroundPosition,
				"--background-size": backgroundSize,
			};
			
			wordArray = [...wordArray, (
				<div className="text" style={textStyle}></div>
			)];
		}
		
		textArray = [...textArray, (
			<div
				className="word"
				style={{ "--space": `${WIDTH}px`, }}>
				{wordArray}
			</div>
		)];
	}
	
	if (click !== null && typeof click !== "undefined") {
		return (
			<button
				className="dialog-confirm-button"
				style={{
					"--width": `${WIDTH}px`,
					"--height": `${HEIGHT}px`,
					"--selector-background-image": `url(${assets.image.TextSelector})`,
				}}
				onClick={click}>
				{textArray}
			</button>
		);
	}
	
	return (<div className="sentence">{textArray}</div>);
}
