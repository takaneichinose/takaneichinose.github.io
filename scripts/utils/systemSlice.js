// createSlice method of Redux toolkit
import { createSlice } from "https://cdn.skypack.dev/@reduxjs/toolkit@1.6.1";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Create system slice
export const systemSlice = createSlice({
	name: "system",
	initialState: {
		mainMenuShown: false,
		speechDialogShown: false,
		speechDialogMessage: null,
		speechDialogCallback: null,
		speechDialogConfirm: null,
		statsWindowShown: false,
		acknowledgementShown: false,
		screen: {
			width: 0,
			height: 0,
		},
		loadedAssetsCount: 0,
	},
	reducers: {
		// Show the main menu window
		showMainMenu: state => {
			state.mainMenuShown = true;
		},
		// Hide the main menu window
		hideMainMenu: state => {
			state.mainMenuShown = false;
		},
		// Show the speech dialog window
		showSpeechDialog: (state, action) => {
			state.speechDialogShown = true;
			state.speechDialogMessage = action.payload.message;
			state.speechDialogCallback = action.payload.callback;
			state.speechDialogConfirm = action.payload.confirm;
		},
		// Hide the speech dialog window
		hideSpeechDialog: state => {
			state.speechDialogShown = false;
			state.speechDialogMessage = null;
			state.speechDialogCallback = null;
			state.speechDialogConfirm = null;
		},
		// Set the width and height of the screen
		setScreenSize: (state, action) => {
			state.screen.width = action.payload.width;
			state.screen.height = action.payload.height;
		},
		// Number of already loaded assets during preload
		setLoadedAssetsCount: (state, action) => {
			state.loadedAssetsCount = action.payload.count;
		},
		// Show the stats window
		showStatsWindow: state => {
			state.statsWindowShown = true;
		},
		// Hide the stats window
		hideStatsWindow: state => {
			state.statsWindowShown = false;
		},
		// Show the acknowledgement
		showAcknowledgement: state => {
			state.acknowledgementShown = true;
		},
		// Hide the acknowledgement
		hideAcknowledgement: state => {
			state.acknowledgementShown = false;
		},
	},
});

// Export the available reducers (Set state methods) to use
export const {
	showMainMenu,
	hideMainMenu,
	showSpeechDialog,
	hideSpeechDialog,
	setScreenSize,
	setLoadedAssetsCount,
	showStatsWindow,
	hideStatsWindow,
	showAcknowledgement,
	hideAcknowledgement,
} = systemSlice.actions;

// Export the reducers
export default systemSlice.reducer;
