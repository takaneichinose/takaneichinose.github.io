////////////////////////////////////////////////////////////////////////////////
// Component of loading screen                                                //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, {
	useState,
	useEffect,
} from "https://cdn.skypack.dev/react@17.0.1";

// React implementation of Redux
import {
	useDispatch,
	useSelector,
} from "https://cdn.skypack.dev/react-redux@7.2.4";

// Assets reducers (Set state methods)
import {
	setImageAsset,
	setAudioAsset,
	setJsonAsset,
} from "../utils/assetsSlice";

// Reducers (Set state methods)
import { setLoadedAssetsCount } from "../utils/systemSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Method class for this project
import Methods from "../classes/Methods";

/**
 * Component of loading screen
 */
export default function LoadingScreen() {
	// Constant declarations
	const allAssets = Methods.getAllAssets();
	const totalAssetsCount = Methods.getAllAssetsCount();
	
	// ReactJS useState hooks
	const [loadingScreenShown, setLoadingScreenShown] = useState(true);
	const [loadAsset, setLoadAsset] = useState(null);
	
	// This is to get the state from Redux
	const system = useSelector(state => state.system);
	
	// This is like setState or something
	const dispatch = useDispatch();
	
	// Number of loaded assets
	const loadedAssetsCount = system.loadedAssetsCount;
	
	// Load the assets
	const loadAllAssets = () => {
		for (let i = 0; i < totalAssetsCount; i++) {
			const key = allAssets[i].key;
			const url = allAssets[i].url;
			const type = allAssets[i].type;
			const asset = Methods.loadAsset(url, key, type);
			
			asset.then(result => {
				if (result === null) {
					return result;
				}
				
				setLoadAsset(result);
			});
		}
	};
	
	// Process the preloaded data
	const processPreload = result => {
		if (result === null) {
			return;
		}
		
		const { key, type, asset } = result;
		
		if (type === Definition.ASSET_TYPE.Image) {
			dispatch(setImageAsset({ key: key, value: asset }));
		} else if (type === Definition.ASSET_TYPE.Audio) {
			dispatch(setAudioAsset({ key: key, value: asset }));
		} else if (type === Definition.ASSET_TYPE.JSON) {
			dispatch(setJsonAsset({ key: key, value: asset }));
		}

		dispatch(setLoadedAssetsCount({ count: loadedAssetsCount + 1 }));
	};
	
	// ReactJS useEffect hook for initialization
	useEffect(() => {
		Methods.log("GAME INITIALIZED");
		Methods.log(`Number of assets to load: ${totalAssetsCount}`);
		Methods.log(`Image files: ${Object.keys(Definition.IMAGES).length}`);
		Methods.log(`Audio files: ${Object.keys(Definition.AUDIOS).length}`);
		Methods.log(`JSON files: ${Object.keys(Definition.JSON_MAP).length}`);
		
		loadAllAssets();
	}, []);
	
	useEffect(() => {
		processPreload(loadAsset);
	}, [loadAsset]);
	
	if (!loadingScreenShown) {
		// Do not show if load is complete
		
		return null;
	}
	
	// Percentage of loaded assets (Used for progress bar)
	const loadPercentage =
		Math.floor(loadedAssetsCount / totalAssetsCount * 100);

	// Class name to add while Fading-out
	const fadeOutClassName = "loading-screen-fade-out"
	
	// Default class name
	let loadingScreenClassName = "loading-screen";
	
	if (loadedAssetsCount >= totalAssetsCount) {
		loadingScreenClassName += ` ${fadeOutClassName}`;
	}
	
	// Render
	return (
		<div
			className={loadingScreenClassName}
			style={{
				"--value": `${loadPercentage}%`
			}}
			onClick={evt => {
				evt.stopPropagation();
			}}
			onAnimationEnd={evt => {
				if (evt.animationName === fadeOutClassName) {
					setLoadingScreenShown(false);
				}
			}}>
			<div className="progress"></div>
		</div>
	);
}
