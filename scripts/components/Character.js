////////////////////////////////////////////////////////////////////////////////
// Component of the character                                                 //
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
import {
	setCharacterImg,
	setCharacterText,
	setCharacterPosition,
	setCharacterStyle,
	setCharacterAnimating,
	stopCharacterMovement,
} from "../utils/characterSlice";

// Definition class for this project
import * as Definition from "../classes/Definition";

// Common method class for this project
import Methods from "../classes/Methods";

/**
 * Component of the character
 * @param object props Properties object
 */
export default function Character(props) {
	// Properties
	const lang = props.lang;
	
	// ReactJS useState hooks
	const [
		directionState,
		setDirectionState
	] = useState(Definition.DIRECTION.Front);
	const [moveTryDirection, setMoveTryDirection] = useState(null);
	const [moveHistory, setMoveHistory] = useState([]);
	
	// This is to get the state from Redux
	const assets = useSelector(state => state.assets);
	const system = useSelector(state => state.system);
	const character = useSelector(state => state.character);
	const object = useSelector(state => state.object);
	
	// This is like setState or something
	const dispatch = useDispatch();
	
	// Update the X and Y position of the character
	const updateCharacterPosition = (x, y, z) => {
		Methods.log(`Current position: { x: ${x}, y: ${y} }`);
		
		if (x !== 0) {
			x = system.screen.width * Definition.OBJECT_WIDTH * x;
		}

		if (y !== 0) {
			y = system.screen.height * Definition.OBJECT_HEIGHT * y;
		}
		
		dispatch(setCharacterStyle({
			style: {
				"--width": `${system.screen.width * Definition.OBJECT_WIDTH}px`,
				"--height": `${system.screen.height * Definition.OBJECT_HEIGHT}px`,
				"--x": `${x}px`,
				"--y": `${y}px`,
				"--z": z,
			}
		}));
	};
	
	// Animate the character
	const animateCharacter = () => {
		let indexName = "Character";
		
		switch (directionState) {
			case Definition.DIRECTION.Front:
				indexName += "Front";
				break;
			case Definition.DIRECTION.Rear:
				indexName += "Rear";
				break;
			case Definition.DIRECTION.Left:
				indexName += "Left";
				break;
			case Definition.DIRECTION.Right:
				indexName += "Right";
				break;
		}

		if (character.moveTo !== null) {
			indexName += "Move";
		}
		
		if (assets.image[indexName] === null) {
			return;
		}
		
		dispatch(
			setCharacterImg({ img: `${assets.image[indexName]}` }));
	};
	
	// Determine if the specific x and y point is in history
	const inHistory = (x, y) => {
		return moveHistory.indexOf(JSON.stringify({ x: x, y: y })) >= 0;
	};
	
	// Get the collision and change the direction of the movement
	const getCollision = (x, y, adjX, adjY, x2, y2, dir) => {
		for (const obj of object.objects) {
			// Loop through the objects on the screen
			
			if (!obj.hasCollision) {
				// We can pass through the object without collision
				
				continue;
			}
			
			if (
				// Condition for x axis
				(x + adjX >= obj.x && x + adjX <= obj.x + obj.width - 1)
				&&
				// Condition for y axis
				(y + adjY >= obj.y && y + adjY <= obj.y + obj.height - 1)
			) {
				setMoveHistory([...moveHistory, JSON.stringify({ x: x, y: y })]);
				
				switch (dir) {
					case Definition.DIRECTION.Front:
					case Definition.DIRECTION.Rear:
						// Checking of collision in x axis
						
						if (x > x2 || inHistory(x + 1, y)) {
							return getCollision(x, y, -1, 0, x2, y2,
																	Definition.DIRECTION.Left);
						} else if (x <= x2 || inHistory(x - 1, y)) {
							return getCollision(x, y, 1, 0, x2, y2,
																	Definition.DIRECTION.Right);
						}
						
						return;
					case Definition.DIRECTION.Left:
					case Definition.DIRECTION.Right:
						// Checking of collision in y axis
						
						if (y > y2 || inHistory(x, y + 1)) {
							return getCollision(x, y, 0, -1, x2, y2,
																	Definition.DIRECTION.Rear);
						} else if (y <= y2 || inHistory(x, y - 1)) {
							return getCollision(x, y, 0, 1, x2, y2,
																	Definition.DIRECTION.Front);
						}
						
						return;
				}
			}
		}
		
		return {
			x: x + adjX,
			y: y + adjY,
			characterDirection: dir
		};
	};
	
	// Determine which coordinate the character will move
	// If there is a collision, try to change direction
	const moveCharacterDirection = (direction, x1, x2, y1, y2) => {
		let x, y, collision, dir;
		
		if (direction === Definition.DIRECTION.X && x1 > x2) {
			// Direction to left
		
			collision =
				getCollision(x1, y1, -1, 0, x2, y2, Definition.DIRECTION.Left);
		} else if (direction === Definition.DIRECTION.X && x1 <= x2) {
			// Direction to right
		
			collision =
				getCollision(x1, y1, 1, 0, x2, y2, Definition.DIRECTION.Right);
		} else if (direction === Definition.DIRECTION.Y && y1 > y2) {
			// Direction to top

			collision =
				getCollision(x1, y1, 0, -1, x2, y2, Definition.DIRECTION.Rear);
		} else if (direction === Definition.DIRECTION.Y && y1 <= y2) {
			// Direction to bottom
		
			collision =
				getCollision(x1, y1, 0, 1, x2, y2, Definition.DIRECTION.Front);
		}
		
		x = collision.x;
		y = collision.y;
		
		setDirectionState(collision.characterDirection);
		
		// Destination point where the character should go next
		const destinationPoint = {
			x: x,
			y: y,
		};
		
		return destinationPoint;
	};
	
	// Relocate the position of the character from 1 point to another
	const moveCharacter = () => {
		if (character.moveTo === null) {
			return;
		}
		
		// Current point of the character and the clicked point
		const x1 = character.x;
		const x2 = character.moveTo.x;
		const y1 = character.y;
		const y2 = character.moveTo.y;
		
		// Distance between the clicked point and the position of the character
		const distanceX = Math.abs(x1 - x2);
		const distanceY = Math.abs(y1 - y2);
		
		// If the point of the character and the clicked point is the same,...
		if (x1 === x2 && y1 === y2) {
			// ...the chracter will stop moving.
			
			dispatch(stopCharacterMovement());

			return;
		}
		
		// Prioritize the x axis in walking
		let direction = Definition.DIRECTION.X;
		
		if (
			// If the x axis of location and the x axis of destination is the same
			x1 === x2
			||
			// If moving right won't do anything
			inHistory(x1 + 1, y1)
			||
			// If moving left won't do anything
			inHistory(x1 - 1, y1)
		) {
			direction = Definition.DIRECTION.Y;
		}
		
		try {
			// The direction where the character should move
			const { x, y } = moveCharacterDirection(direction, x1, x2, y1, y2);
			
			dispatch(
				setCharacterPosition({
					x: x,
					y: y,
				}));
		} catch (ex) {
			// Maybe, the movement returned null value.
		}
	};
	
	// ReactJS useEffect hook for setting the text 
	useEffect(() => {
		if (assets.text[lang] === undefined) {
			return;
		}
		
		dispatch(setCharacterText({text: assets.text[lang].character}));
	}, [assets.text]);
	
	// ReactJS useEffect hook when the direction of the character changes
	useEffect(() => {
		animateCharacter();
	}, [assets.image, directionState, character.moveTo]);
	
	// ReactJS useEffect hook when the position of the character changes
	useEffect(() => {
		updateCharacterPosition(
			character.x,
			character.y,
			character.y + 1
		);
	}, [character.x, character.y, system.screen]);
	
	// ReactJS useEffect hook when the movement position changes
	useEffect(() => {
		if (character.moveTo === null) {
			return;
		}
		
		Methods.log(
			`Relocate position: { x: ${character.moveTo.x}, y: ${character.moveTo.y}}`
		);
		
		setMoveTryDirection(null);
		setMoveHistory([]);
		
		moveCharacter();
	}, [character.moveTo]);
	
	return (
		<figure
			className={Methods.toClassName(character.class)}
			style={character.style}
			onClick={evt => {
				evt.stopPropagation();
			}}
			onTransitionEnd={evt => {
				if (evt.propertyName === "left" || evt.propertyName === "top") {
					moveCharacter();
				}
			}}>
			<img src={character.img} alt={character.text} />
		</figure>
	);
}
