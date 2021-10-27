////////////////////////////////////////////////////////////////////////////////
// Methods to perform the logics and algorithms of the program                //
////////////////////////////////////////////////////////////////////////////////

// Definition class for this project
import * as Definition from "../classes/Definition";

export default class Methods {
	/**
	 * Write log on the console (Simply console.log) with debug flag
	 * @param string message Message to be shown on the log
	 */
	static log(message) {
		if (!Definition.IS_DEBUG) {
			return;
		}
		
		console.log(message);
	}
	
	/**
	 * Get class name from object type
	 */
	static toClassName(value) {
		if (typeof value === "object") {
			let className = [];
			
			for (let key in value) {
				if (value[key] !== true) {
					continue;
				}
				
				className = [...className, key];
			}
			
			value = className.join(" ");
		}
		
		return value;
	}
	
	/**
	 * Get the specification of the asset
	 * @param ASSET_TYPE type Type of an asset
	 */
	static getAssetSpec(type) {
		// For the return value
		let assetObject = {};
		
		// Temporary container of the asset object
		let tempObject = null;
		
		switch (type) {
			case Definition.ASSET_TYPE.Image:
				tempObject = Definition.IMAGES;
				break;
			case Definition.ASSET_TYPE.Audio:
				tempObject = Definition.AUDIO;
				break;
			case Definition.ASSET_TYPE.JSON:
				tempObject = Definition.JSON_MAP;
				break;
		}
		
		if (tempObject === null) {
			return null;
		}
		
		for (const key in tempObject) {
			assetObject[key] = null;
		}
		
		return assetObject;
	}
	
	/**
	 * Merge all the assets, and its type
	 */
	static getAllAssets() {
		let allAssets = [];
		
		for (const key in Definition.IMAGES) {
			allAssets = [...allAssets, {
				key: key,
				url: Definition.IMAGES[key],
				type: Definition.ASSET_TYPE.Image,
			}];
		}
		
		for (const key in Definition.AUDIOS) {
			allAssets = [...allAssets, {
				key: key,
				url: Definition.AUDIOS[key],
				type: Definition.ASSET_TYPE.Audio,
			}];
		}
		
		for (const key in Definition.JSON_MAP) {
			allAssets = [...allAssets, {
				key: key,
				url: Definition.JSON_MAP[key],
				type: Definition.ASSET_TYPE.JSON,
			}];
		}
		
		return allAssets;
	}
	
	/**
	 * Get all the counts of assets
	 */
	static getAllAssetsCount() {
		return this.getAllAssets().length;
	}
	
	/**
	 * Read blob data then return as Base64
	 * @param bit[] blob Blob data to be converted
	 */
	static readBlobData(blob) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.readAsDataURL(blob);

			reader.onload = () => {
				resolve(reader.result);
			};
		});
	}
	
	/**
	 * Load an image/audio file then return as Base64
	 * Used only in Promise
	 * @param string path Path of the file
	 * @param function resolve A function from loadAsset Promise
	 * @param function reject A function from loadAsset Promise
	 */
	static loadBlob(path) {
		return fetch(path).then(response => {
			if (!response.ok) {
				throw null;
			}
			
			return response.blob();
		}).then(async (blob) => {
			return await this.readBlobData(blob);
		}).catch(error => {
			console.error(`LoadAssetError: Failed to fetch data: ${path}`);
			
			return null;
		});
	}
	
	/**
	 * Load a JSON file then return as JSON object
	 * Used only in Promise
	 * @param string path Path of the file
	 */
	static loadJSON(path) {
		return fetch(path).then(
			response => response.text()
		).then(json => {
			try {
				return JSON.parse(json);
			}	catch (ex) {
				console.error(`LoadAssetError: Failed to parse JSON: ${json}`);
				
				return null;
			}
		}).catch(error => {
			console.error(`LoadAssetError: Failed to fetch data: ${error}`);
			
			return null;
		});
	}
	
	/**
	 * Load the asset (image/audio file) for rendering
	 * @param string filename File name of the asset
	 * @param string key Key of the asset
	 * @param ASSET_TYPE type Type of the asset
	 */
	static loadAsset(filename, key, type) {
		return new Promise(async (resolve, reject)=> {
			let asset = null;

			if (type === Definition.ASSET_TYPE.Image) {
				// Image type
				asset = await this.loadBlob(`${Definition.IMAGES_DIR}${filename}`);
			} else if (type === Definition.ASSET_TYPE.Audio) {
				// Audio type
				asset = await this.loadBlob(`${Definition.AUDIOS_DIR}${filename}`);
			} else if (type === Definition.ASSET_TYPE.JSON) {
				// JSON type
				asset = await this.loadJSON(`${Definition.JSON_DIR}${filename}`);
			}
			
			resolve({
				key: key,
				type: type,
				asset: asset,
			});
		});
	}
	
	/**
	 * Set the position of x and y depends on the size of the block
	 * @param HTMLElement elm HTML Element of the screen
	 * @param number x x-axis of the target point
	 * @param number y y-axis of the target point
	 */
	static setScreenPos(elm, x, y) {
		const width = elm.clientWidth - 1;
		const height = elm.clientHeight - 1;

		// Calculate the block position based on block size of the object
		const posX = Math.floor(x / (width / Definition.OBJECT_STEP_X));
		const posY = Math.floor(y / (height / Definition.OBJECT_STEP_Y));
		
		return {
			x: posX,
			y: posY,
		};
	}
	
	/**
	 * Find the clickable boundary for the character
	 * @param HTMLElement elm HTML Element of the screen
	 * @param number offsetX x-axis of the target point
	 * @param number offsetY y-axis of the target point
	 */
	static allowByClickBoundary(elm, offsetX, offsetY) {
		const { x, y } = this.setScreenPos(elm, offsetX, offsetY);
		
		if (
			// X axis
			x < Definition.CLICK_BOUNDARY.X1 || x > Definition.CLICK_BOUNDARY.X2
			||
			// Y axis
			y < Definition.CLICK_BOUNDARY.Y1 || y > Definition.CLICK_BOUNDARY.Y2
		) {
			return false;
		}

		return true;
	}
	
	/**
	 * Create style attribute used from MyProfile component
	 */
	static createMyProfileStyle(images) {
		let mainScreenStyle = {};
		
		// Main background image
		if (images.Background !== null) {
			mainScreenStyle["--background-image"] = `url("${images.Background}")`;
		}

		// Background image of the numeric
		if (images.Numeric !== null) {
			mainScreenStyle["--numeric-image"] = `url("${images.Numeric}")`;
		}

		// Background image of the alphabet
		if (images.Alphabet !== null) {
			mainScreenStyle["--alphabet-image"] = `url("${images.Alphabet}")`;
		}

		// Background image of the symbol
		if (images.Symbol !== null) {
			mainScreenStyle["--symbol-image"] = `url("${images.Symbol}")`;
		}


		// TODO
		// Background image of the hiragana
		// if (images.Hiragana !== null) {
		// 	mainScreenStyle["--hiragana-image"] = `url("${images.Hiragana}")`;
		// }

		// TODO
		// Background image of the katakana
		// if (images.Katakana !== null) {
		// 	mainScreenStyle["--katakana-image"] = `url("${images.Katakana}")`;
		// }

		// TODO
		// Background image of the kanji
		// if (images.Kanji !== null) {
		// 	mainScreenStyle["--kanji-image"] = `url("${images.Kanji}")`;
		// }
		
		return mainScreenStyle;
	}
}
