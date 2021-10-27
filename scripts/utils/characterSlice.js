// createSlice method of Redux toolkit
import { createSlice } from "https://cdn.skypack.dev/@reduxjs/toolkit@1.6.1";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Create character slice
export const characterSlice = createSlice({
	name: "character",
	initialState: {
		img: null,
		text: null,
		x: Definition.CHARACTER_INIT_X,
		y: Definition.CHARACTER_INIT_Y,
		class: {
			"character": true,
			"character-animating": false,
		},
		style: {
			"--width": 0,
			"--height": 0,
			"--x": null,
			"--y": null,
			"--z": null,
			"--move-time": `${Definition.CHARACTER_MOVE_TIME}ms`,
		},
		moveTo: null,
	},
	reducers: {
		// Set the source image link of the character
		setCharacterImg: (state, action) => {
			state.img = action.payload.img;
		},
		// Set the "alt" attribute text of the character
		setCharacterText: (state, action) => {
			state.text = action.payload.text;
		},
		// Set the X and Y position of the character
		setCharacterPosition: (state, action) => {
			state.x = action.payload.x;
			state.y = action.payload.y;
		},
		// Set the style attribute of the character
		setCharacterStyle: (state, action) => {
			const style = action.payload.style;
			
			for (const key in style) {
				state.style[key] = style[key];
			}
		},
		// Set the animating class of the character to true
		setCharacterAnimating: (state, action) => {
			state.class["character-animating"] = action.payload.characterAnimating;
		},
		// Start the movement of the character
		startCharacterMovement: (state, action) => {
			state.moveTo = action.payload.moveTo;
			state.class["character-animating"] = true;
		},
		// Stop the movement of the character
		stopCharacterMovement: state => {
			state.moveTo = null;
			state.class["character-animating"] = false;
		},
	},
});

// Export the available reducers (Set state methods) to use
export const {
	setCharacterImg,
	setCharacterText,
	setCharacterPosition,
	setCharacterStyle,
	setCharacterAnimating,
	startCharacterMovement,
	stopCharacterMovement,
} = characterSlice.actions;

// Export the reducers
export default characterSlice.reducer;
