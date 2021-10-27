////////////////////////////////////////////////////////////////////////////////
// Component of objects                                                       //
////////////////////////////////////////////////////////////////////////////////

// ReactJS
import React, { useState, useEffect } from "https://cdn.skypack.dev/react@17.0.1";

// React implementation of Redux
import {
	useSelector,
	useDispatch,
} from "https://cdn.skypack.dev/react-redux@7.2.4";

// Reducers (Set state methods)
import { addObject, clearObjects } from "../utils/objectSlice";
import { showMainMenu, showSpeechDialog } from "../utils/systemSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Common method class for this project
import Methods from "../classes/Methods";

/**
 * Component of objects
 * @param object props Properties object
 */
export default function Objects(props) {
	// Properties
	const lang = props.lang;
	
	// ReactJS useState hooks
	const [laptopDialogShown, setLaptopDialogShown] = useState(false);
	const [filesDialogShown, setFilesDialogShown] = useState(false);
	
	// This is to get the state from Redux
	const assets = useSelector(state => state.assets);
	const system = useSelector(state => state.system);
	const object = useSelector(state => state.object);
	
	// This is like setState or something
	const dispatch = useDispatch();
	
	// Create an object (type) of an object
	// Place an object into the screen
	// Set all the values as the size of a block, not their actual size.
	const placeObject = (img, desc, w, h, x, y, z = null, opt = null) => {
		// If the option is null, turn it to an empty object
		opt = opt === null ? {} : opt;

		// Has a collision with the character
		let hasCollision =
			!(typeof opt.collision !== "undefined" && !opt.collision);

		if (z === null) {
			// If the "z" is not set, "z" will be just the same as "y" + 1

			if (hasCollision === false) {
				// If there is no collision with the object, value of "z" should be 0

				z = 0;
			}

			z = y + 1;
		}
		
		Methods.log(`Placed "${img}" at: { x: ${x}, y: ${y}}`);

		// Width and height on the object, times its size
		const width = system.screen.width * Definition.OBJECT_WIDTH * w;
		const height = system.screen.height * Definition.OBJECT_HEIGHT * h;
		
		dispatch(addObject({
			object: {
				name: img,
				img: `${assets.image[img]}`,
				desc: desc,
				x: x,
				y: y,
				width: width / (system.screen.width * Definition.OBJECT_WIDTH),
				height: height / (system.screen.height * Definition.OBJECT_HEIGHT),
				hasCollision: hasCollision,
				className: {
					object: true,
					hoverable: (typeof opt.hoverable !== "undefined" && opt.hoverable),
					"non-clickable":
						(typeof opt.nonClickable !== "undefined" && opt.nonClickable),
				},
				style: {
					"--width": `${width}px`,
					"--height": `${height}px`,
					"--x": `${x * system.screen.width * Definition.OBJECT_WIDTH}px`,
					"--y": `${y * system.screen.height * Definition.OBJECT_HEIGHT}px`,
					"--z": z,
				},
				click: (typeof opt.click === "function") ? opt.click : null,
			},
		}));
	};
	
	// Call placeObject function multiple times
	const placeObjects = () => {
		// Shorthand of the text object from assets
		const text = assets.text[lang];
		
		// Place all the objects on the screen (Decorations)
		placeObject("Clock", text.decoration, 0.5, 1, 7.5, 2.5);
		placeObject("Door", text.decoration, 1.5, 3, 7, 4);
		placeObject("Desk", text.decoration, 2, 1, 3, 11);
		placeObject("Drawer", text.decoration, 1, 1, 2, 11);
		placeObject("Plant", text.decoration, 1, 1, 4, 7);
		placeObject("Plant", text.decoration, 1, 1, 5, 11);
		placeObject("Shelf", text.decoration, 2, 1, 0, 7);
		placeObject("Shelf", text.decoration, 2, 1, 2, 7);
		placeObject("Shelf", text.decoration, 2, 1, 7, 12);
		placeObject("Window", text.decoration, 5, 5, 1, 1);
		
		// Place all the objects on the screen (Interactables)
		placeObject("Laptop", text.portfolio, 1, 2, 3.05, 9, 12, {
			collision: false,
			hoverable: true,
			click: () => {
				dispatch(showSpeechDialog({
					message: assets.text[lang].portfolio,
					confirm: {
						yes: () => {
							Methods.log("Opening blog...");
							Methods.log(`Portfolio: ${Definition.LINK_TO_BLOG}`);
							
							window.open(Definition.LINK_TO_BLOG, "_blank");
						},
					},
				}));
			},
		});
		placeObject("Files", text.resume, 1, 2, 4, 9.6, 12, {
			collision: false,
			hoverable: true,
			click: () => {
				dispatch(showSpeechDialog({
					message: assets.text[lang].resume,
					confirm: {
						yes: () => {
							Methods.log("Opening resume...");
							Methods.log(`Portfolio: ${Definition.LINK_TO_RESUME}`);
							
							window.open(Definition.LINK_TO_RESUME, "_blank");
						},
					},
				}));
			},
		});
		placeObject("MenuButton", text.menu, 0.5, 1, 9, 1, null, {
			collision: false,
			hoverable: true,
			click: () => {
				dispatch(showMainMenu());
			},
		});
		
		// Place all the objects on the screen (Non-clickables)
		placeObject("Carpet", text.decoration, 6, 6, 1.5, 8.5, 0, {
			collision: false,
			nonClickable: true,
		});
	};

	// ReactJS useEffect hook for initialization
	useEffect(() => {
		// Number of loaded assets
		const loadedAssetsCount = system.loadedAssetsCount;
		
		// Total number of assets
		const totalAssetsCount = Methods.getAllAssetsCount();
		
		if (loadedAssetsCount < totalAssetsCount) {
			return;
		}
		
		// Clear the objects
		dispatch(clearObjects());
		
		placeObjects();
	}, [assets, system.screen]);
	
	// Array for rendering
	let objects = [];
	
	for (const obj of object.objects) {
		if (obj.img === null) {
			continue;
		}
		
		objects = [...objects, (
			<figure
				className={Methods.toClassName(obj.className)}
				style={obj.style}
				onClick={evt => {
					evt.stopPropagation();
					
					if (obj.click !== null) {
						obj.click();
					}
				}}>
				<img src={obj.img} alt={obj.text} />
			</figure>
		)];
	}
	
	return objects;
}
