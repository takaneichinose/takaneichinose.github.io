////////////////////////////////////////////////////////////////////////////////
// Component of speech dialog                                                 //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, {
	useState,
	useEffect,
} from "https://cdn.skypack.dev/react@17.0.1";

// React implementation of Redux
import {
	useSelector,
	useDispatch,
} from "https://cdn.skypack.dev/react-redux@7.2.4";

// Reducers (Set state methods)
import { hideSpeechDialog, } from "../utils/systemSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Common method class for this project
import Methods from "../classes/Methods";

// Components
import Text from "./Text";
import Spacer from "./Spacer";

/**
 * Buttons for confirmation box
 * @param object props Properties object
 */
function ConfirmButtons(props) {
	// Properties
	const lang = props.lang;
	const confirm = props.confirm;
	
	// This is to get the state from Redux
	const assets = useSelector(state => state.assets);
	
	if (confirm === null || confirm === undefined) {
		return null;
	}
	
	return (
		<div className="dialog-confirm">
			<Text
				content={assets.text[lang].no}
				click={() => {
					if (confirm.no !== null && typeof confirm.no !== "undefined") {
						confirm.no();
					}
				}}
			/>
			<Spacer />
			<Spacer />
			<Text
				content={assets.text[lang].yes}
				click={() => {
					if (confirm.yes !== null && typeof confirm.yes !== "undefined") {
						confirm.yes();
					}
				}}
			/>
		</div>
	);
}

/**
 * Component of speech dialog
 * @param object props Properties object
 */
export default function SpeechDialog(props) {
	// Properties
	const lang = props.lang;
	
	// ReactJS useState
	const [isFadeOut, setIsFadeOut] = useState(false);
	
	// This is to get the state from Redux
	const system = useSelector(state => state.system);
	const assets = useSelector(state => state.assets);
	
	// This is like setState or something
	const dispatch = useDispatch();
	
	// States for the speech dialog
	const content = system.speechDialogMessage;
	const callback = system.speechDialogCallback;
	const confirm = system.speechDialogConfirm;

	if (!system.speechDialogShown || content === null) {
		return null;
	}

	// Class name to add while Fading-out
	const fadeOutClassName = "speech-dialog-fade-out";

	// Default class name
	let speechDialogClassName = "speech-dialog";

	if (isFadeOut) {
		speechDialogClassName += ` ${fadeOutClassName}`;
	}
	
	// Number of loaded assets
	const loadedAssetsCount = system.loadedAssetsCount;

	// Total number of assets
	const totalAssetsCount = Methods.getAllAssetsCount();
	
	if (loadedAssetsCount < totalAssetsCount) {
		return null;
	}
	
	const speechDialogStyle = {
		"--background-image": `url("${assets.image.SpeechDialog}")`
	};
	
	// Padding of the speech dialog
	const paddingX = system.screen.width * Definition.SPEECH_DIALOG_PAD_X;
	const paddingY = system.screen.height * Definition.SPEECH_DIALOG_PAD_Y;
	
	return (
		<article
			className={speechDialogClassName}
			style={speechDialogStyle}
			onClick={evt => {
				evt.stopPropagation();

				setIsFadeOut(true);
			}}
			onAnimationEnd={evt => {
				if (evt.animationName === fadeOutClassName) {
					dispatch(hideSpeechDialog());
					
					setIsFadeOut(false);
					
					if (callback !== null && typeof callback !== "undefined") {
						callback();
					}
				}
			}}>
			<section
				className="speech-dialog-box"
				style={{
					"--padding": `${paddingY}px ${paddingX}px`,
				}}>
				<Text content={content} />
				<ConfirmButtons lang={lang} confirm={confirm} />
			</section>
		</article>
	);
}
