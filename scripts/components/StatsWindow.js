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
import { hideStatsWindow } from "../utils/systemSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Components
import Text from "./Text";

/**
 * Where the pixel art of my portrait will be shown
 */
function StatsImage() {
	// This is to get the state from Redux
	const system = useSelector(state => state.system);
	const assets = useSelector(state => state.assets);
	
	const WIDTH = system.screen.width * Definition.STATS_IMG_WIDTH;
	const HEIGHT = system.screen.height * Definition.STATS_IMG_HEIGHT;
	const X = system.screen.width * Definition.STATS_IMG_X;
	const Y = system.screen.height * Definition.STATS_IMG_Y;
	
	return (
		<div
			className="stats-image"
			style={{
				"--background-image": `url(${assets.image.StatsImage})`,
				"--width": `${WIDTH}px`,
				"--height": `${HEIGHT}px`,
				"--x": `${X}px`,
				"--y": `${Y}px`,
			}}>
		</div>
	);
}

/**
 * Where my basic information will be shown
 * @param object props Parameters passed to a component
 */
function StatsTitle(props) {
	// Properties
	const lang = props.lang;
	
	// This is to get the state from Redux
	const system = useSelector(state => state.system);
	const assets = useSelector(state => state.assets);
	
	const WIDTH = system.screen.width * Definition.STATS_TITLE_WIDTH;
	const HEIGHT = system.screen.height * Definition.STATS_TITLE_HEIGHT;
	const X = system.screen.width * Definition.STATS_TITLE_X;
	const Y = system.screen.height * Definition.STATS_TITLE_Y;
	const PAD_X = system.screen.width * Definition.STATS_PAD_X;
	const PAD_Y = system.screen.height * Definition.STATS_PAD_Y;
	
	// Shorthand of the text object from assets
	const text = assets.text[lang];
	
	return (
		<div
			className="stats-title"
			style={{
				"--background-image": `url(${assets.image.StatsTitle})`,
				"--width": `${WIDTH}px`,
				"--height": `${HEIGHT}px`,
				"--padding": `${PAD_X}px ${PAD_Y}px`,
				"--x": `${X}px`,
				"--y": `${Y}px`,
			}}>
			<Text content={text.statsName} />
			<Text content={text.statsOccupation} />
			<Text content={text.statsHobby} />
			<Text content={text.statsHobby2} />
		</div>
	);
}

/**
 * Where the detailed explanation of my skills will be shown
 * @param object props Parameters passed to a component
 */
function StatsDescription(props) {
	// Properties
	const lang = props.lang;
	
	// This is to get the state from Redux
	const system = useSelector(state => state.system);
	const assets = useSelector(state => state.assets);
	
	const WIDTH = system.screen.width * Definition.STATS_DESC_WIDTH;
	const HEIGHT = system.screen.height * Definition.STATS_DESC_HEIGHT;
	const X = system.screen.width * Definition.STATS_DESC_X;
	const Y = system.screen.height * Definition.STATS_DESC_Y;
	const PAD_X = system.screen.width * Definition.STATS_PAD_X;
	const PAD_Y = system.screen.height * Definition.STATS_PAD_Y;
	
	// Shorthand of the text object from assets
	const text = assets.text[lang];
	
	// This is to be rendered
	let skillsList1 = [];
	let skillsList2 = [];
	
	for (let skill of assets.skills1) {
		skillsList1 = [...skillsList1, <Text content={skill} />];
	}
	
	for (let skill of assets.skills2) {
		skillsList2 = [...skillsList2, <Text content={skill} />];
	}
	
	return (
		<div
			className="stats-description"
			style={{
				"--background-image": `url(${assets.image.StatsDescription})`,
				"--width": `${WIDTH}px`,
				"--height": `${HEIGHT}px`,
				"--padding": `${PAD_X}px ${PAD_Y}px`,
				"--x": `${X}px`,
				"--y": `${Y}px`,
			}}>
			<div className="stats-description-details">
				{skillsList1}
			</div>
			<div className="stats-description-details">
				{skillsList2}
			</div>
		</div>
	);
}

/**
 * Statistics, skill level component
 * @param object props Parameters passed to a component
 */
export default function StatsWindow(props) {
	// Properties
	const lang = props.lang;
	
	// React useState hooks
	const [isFadeOut, setIsFadeOut] = useState(false);
	
	// This is to get the state from Redux
	const system = useSelector(state => state.system);
	const assets = useSelector(state => state.assets);
	
	// This is like setState or something
	const dispatch = useDispatch();
	
	if (!system.statsWindowShown) {
		return null;
	}
	
	// Class name to add while Fading-out
	const fadeOutClassName = "stats-window-fade-out";
	
	// Default class name
	let statsWindowClassName = "stats-window";
	
	if (isFadeOut) {
		statsWindowClassName += ` ${fadeOutClassName}`;
	}
	
	// const BACKGROUND_WIDTH =
	// 	system.screen.width * Definition.MENU_BACKGROUND_WIDTH;
	// const BACKGROUND_HEIGHT =
	// 	system.screen.height * Definition.MENU_BACKGROUND_HEIGHT;
	
	return (
		<div
			className={statsWindowClassName}
			style={{
				// FIXME: I'm still going to decide if I will put this or not.
				// "--background-image": `url(${assets.image.MenuBackground})`,
				// "--background-width": `${BACKGROUND_WIDTH}px`,
				// "--background-height": `${BACKGROUND_HEIGHT}px`,
			}}
			onClick={evt => {
				evt.stopPropagation();

				setIsFadeOut(true);
			}}
			onAnimationEnd={evt => {
				if (evt.animationName === fadeOutClassName) {
					dispatch(hideStatsWindow());
					
					setIsFadeOut(false);
				}
			}}>
			<StatsImage />
			<StatsTitle lang={lang} />
			<StatsDescription lang={lang} />
		</div>
	);
}
