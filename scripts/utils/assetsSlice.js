// createSlice method of Redux toolkit
import { createSlice } from "https://cdn.skypack.dev/@reduxjs/toolkit@1.6.1";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Common method class for this project
import Methods from "../classes/Methods";

// Create assets slice
export const assetsSlice = createSlice({
	name: "assets",
	initialState: {
		text: {},
		lang: Definition.DEFAULT_LANGUAGE,
		numeric: [],
		alphabet: [],
		symbol: [],
		hiragana: [],
		katakana: [],
		kanji: [],
		skills1: [],
		skills2: [],
		image: Methods.getAssetSpec(Definition.ASSET_TYPE.Image),
		audio: Methods.getAssetSpec(Definition.ASSET_TYPE.Audio),
	},
	reducers: {
		// Set the image asset
		setImageAsset: (state, action) => {
			const key = action.payload.key;
			
			state.image[key] = action.payload.value;
		},
		// Set the audio asset
		setAudioAsset: (state, action) => {
			const key = action.payload.key;
			
			state.audio[key] = action.payload.value;
		},
		// Set the JSON asset
		setJsonAsset: (state, action) => {
			const key = action.payload.key.toLowerCase();
			
			state[key] = action.payload.value;
		},
	},
});

// Export the available reducers (Set state methods) to use
export const {
	setImageAsset,
	setAudioAsset,
	setJsonAsset,
} = assetsSlice.actions;

// Export the reducers
export default assetsSlice.reducer;