// createSlice method of Redux toolkit
import { createSlice } from "https://cdn.skypack.dev/@reduxjs/toolkit@1.6.1";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Create object slice
export const objectSlice = createSlice({
	name: "object",
	initialState: {
		objects: [],
	},
	reducers: {
		// Add an object to the object list
		addObject: (state, action) => {
			state.objects = [...state.objects, action.payload.object];
		},
		// Clear the objects
		clearObjects: (state, action) => {
			state.objects = [];
		},
	},
});

// Export the available reducers (Set state methods) to use
export const {
	addObject,
	clearObjects,
} = objectSlice.actions;

// Export the reducers
export default objectSlice.reducer;
