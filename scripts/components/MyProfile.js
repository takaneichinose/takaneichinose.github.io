////////////////////////////////////////////////////////////////////////////////
// Main component of my personal profile                                      //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, {
	useState,
	useEffect,
	useRef,
} from "https://cdn.skypack.dev/react@17.0.1";

// React implementation of Redux
import {
	useSelector,
	useDispatch,
} from "https://cdn.skypack.dev/react-redux@7.2.4";

// Reducers (Set state methods)
import { startCharacterMovement } from "../utils/characterSlice";
import { showMainMenu, setScreenSize } from "../utils/systemSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Method class for this project
import Methods from "../classes/Methods";

// Components
import LoadingScreen from "./LoadingScreen";
import Instructions from "./Instructions";
import SpeechDialog from "./SpeechDialog";
import MainMenu from "./MainMenu";
import Character from "./Character";
import Objects from "./Objects";
import StatsWindow from "./StatsWindow";
import Acknowledgement from "./Acknowledgement";

/**
 * Main component of my profile
 * @param object props Parameters passed to a component
 */
export default function MyProfile(props) {
	// ReactJS useState hooks
	const [lang, setLang] = useState(Definition.DEFAULT_LANGUAGE);
	
	// This is to get the state from Redux
	const character = useSelector(state => state.character);
	const object = useSelector(state => state.object);
	const assets = useSelector(state => state.assets);
	
	// This is like setState or something
	const dispatch = useDispatch();
	
	// ReactJS useRef hooks
	const mainScreenRef = useRef();
	
	// Event fired when clicked on the screen
	const screenClickEvent = evt => {
		if (character.moveTo !== null) {
			// Do not allow movement if the character is still moving
			// Although I may allow this depends on my mood? 😅

			return;
		}
		
		const x = evt.nativeEvent.offsetX;
		const y = evt.nativeEvent.offsetY;
		
		if (!Methods.allowByClickBoundary(mainScreenRef.current, x, y)) {
			// If the clicked area is not allowed by boundary

			return;
		}
		
		const screenPos = Methods.setScreenPos(mainScreenRef.current, x, y);
		
		dispatch(startCharacterMovement({ moveTo: screenPos, }));
	};
	
	// Run when the window screen resizes
	const screenResize = () => {
		const width = mainScreenRef.current.clientWidth;
		const height = mainScreenRef.current.clientHeight;
		
		dispatch(setScreenSize({
			width: width,
			height: height,
		}));
		
		Methods.log(`Set screen size: { width: ${width}, height: ${height}}`);
	};
	
	// ReactJS useEffect hook when language is updated
	useEffect(() => {
		if (typeof props.lang !== "undefined") {
			setLang(props.lang);
		}
		
		Methods.log(`Current language settings: ${lang}`);
	}, [lang]);
	
	// ReactJS useEffect hook when the window screen resizes
	useEffect(() => {
		window.addEventListener("resize", screenResize);
		
		screenResize();
		
		return function cleanup() {
			window.removeEventListener("resize", screenResize);
		};
	}, []);
	
	// CSS Style of the main screen
	const mainScreenStyle = Methods.createMyProfileStyle(assets.image);
	
	return (
		<main
			className="main-screen"
			style={mainScreenStyle}
			onClick={screenClickEvent}
			ref={mainScreenRef}>
			<Character lang={lang} />
			<Objects lang={lang} />
			<MainMenu lang={lang} />
			<Instructions lang={lang} />
			<StatsWindow lang={lang} />
			<Acknowledgement lang={lang} />
			<SpeechDialog lang={lang} />
			<LoadingScreen />
		</main>
	);
}
