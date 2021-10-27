////////////////////////////////////////////////////////////////////////////////
// Definition of the constant variables                                       //
////////////////////////////////////////////////////////////////////////////////

// Debug flag for console logging
export const IS_DEBUG = true;

// Default language if not set
export const DEFAULT_LANGUAGE = "en";

// Value is in vmin unit. This is the main basis.
export const SCREEN_WIDTH = 100;
// 4:3 aspect ratio
export const SCREEN_HEIGHT = SCREEN_WIDTH * 3 / 4;

// Original size of screen based on the image size
export const ORIG_SCREEN_WIDTH = 320;
export const ORIG_SCREEN_HEIGHT = 240;
export const ORIG_SPACE_SIZE = 1;

// Original size of objects based on the image size
export const ORIG_OBJECT_WIDTH = 32;
export const ORIG_OBJECT_HEIGHT = 16;

// Original size of texts based on the image size
export const ORIG_TEXT_WIDTH = 10;
export const ORIG_TEXT_HEIGHT = 12;

// Original size of speech dialog based on the image size
export const ORIG_SPEECH_DIALOG_PAD = 32;

// Original size of menu based on the image size
export const ORIG_MENU_BACKGROUND_SIZE = 16;
export const ORIG_MENU_WIDTH = 208;
export const ORIG_MENU_HEIGHT = 208;
export const ORIG_MENU_BUTTON_SIZE = 38;

// Orignial size of basic details container in status
export const ORIG_STATS_IMG_WIDTH = 64;
export const ORIG_STATS_IMG_HEIGHT = 80;
export const ORIG_STATS_IMG_X = 16;
export const ORIG_STATS_IMG_Y = 16;
export const ORIG_STATS_TITLE_WIDTH = 208;
export const ORIG_STATS_TITLE_HEIGHT = 80;
export const ORIG_STATS_TITLE_X = 96;
export const ORIG_STATS_TITLE_Y = 16;
export const ORIG_STATS_DESC_WIDTH = 288;
export const ORIG_STATS_DESC_HEIGHT = 112;
export const ORIG_STATS_DESC_X = 16;
export const ORIG_STATS_DESC_Y = 112;
export const ORIG_STATS_PAD = 16;

// Original size of acknowledge based on the image size
export const ORIG_ACKNOWLEDGEMENT_WIDTH = 288;
export const ORIG_ACKNOWLEDGEMENT_HEIGHT = 208;
export const ORIG_ACKNOWLEDGEMENT_PAD = 16;

// Size of objects based on percentage of the screen size
export const OBJECT_WIDTH = ORIG_OBJECT_WIDTH / ORIG_SCREEN_WIDTH;
export const OBJECT_HEIGHT = ORIG_OBJECT_HEIGHT / ORIG_SCREEN_HEIGHT;
export const OBJECT_STEP_X = ORIG_SCREEN_WIDTH / ORIG_OBJECT_WIDTH;
export const OBJECT_STEP_Y = ORIG_SCREEN_HEIGHT / ORIG_OBJECT_HEIGHT;
export const SPACE_SIZE_X = ORIG_SPACE_SIZE / ORIG_SCREEN_WIDTH;
export const SPACE_SIZE_Y = ORIG_SPACE_SIZE / ORIG_SCREEN_HEIGHT;

// Constants for the character
export const CHARACTER_INIT_X = 7;
export const CHARACTER_INIT_Y = 7;
export const CHARACTER_MOVE_TIME = 512;

// Size of texts based on percentage of the screen size
export const TEXT_WIDTH = ORIG_TEXT_WIDTH / ORIG_SCREEN_WIDTH;
export const TEXT_HEIGHT = ORIG_TEXT_HEIGHT / ORIG_SCREEN_HEIGHT;

// Size of speech dialog based on percentage of the screen size
export const SPEECH_DIALOG_PAD_X = ORIG_SPEECH_DIALOG_PAD / ORIG_SCREEN_WIDTH;
export const SPEECH_DIALOG_PAD_Y = ORIG_SPEECH_DIALOG_PAD / ORIG_SCREEN_HEIGHT;

// Size of menu based on the image size
export const MENU_BACKGROUND_WIDTH = ORIG_MENU_BACKGROUND_SIZE / ORIG_SCREEN_WIDTH;
export const MENU_BACKGROUND_HEIGHT = ORIG_MENU_BACKGROUND_SIZE / ORIG_SCREEN_HEIGHT;
export const MENU_WIDTH = ORIG_MENU_WIDTH / ORIG_SCREEN_WIDTH;
export const MENU_HEIGHT = ORIG_MENU_HEIGHT / ORIG_SCREEN_HEIGHT;
export const MENU_BUTTON_WIDTH = ORIG_MENU_BUTTON_SIZE / ORIG_SCREEN_WIDTH;
export const MENU_BUTTON_HEIGHT = ORIG_MENU_BUTTON_SIZE / ORIG_SCREEN_HEIGHT;

// Size of basic details container in status
export const STATS_IMG_WIDTH = ORIG_STATS_IMG_WIDTH / ORIG_SCREEN_WIDTH;
export const STATS_IMG_HEIGHT = ORIG_STATS_IMG_HEIGHT / ORIG_SCREEN_HEIGHT;
export const STATS_IMG_X = ORIG_STATS_IMG_X / ORIG_SCREEN_WIDTH;
export const STATS_IMG_Y = ORIG_STATS_IMG_Y / ORIG_SCREEN_HEIGHT;
export const STATS_TITLE_WIDTH = ORIG_STATS_TITLE_WIDTH / ORIG_SCREEN_WIDTH;
export const STATS_TITLE_HEIGHT = ORIG_STATS_TITLE_HEIGHT / ORIG_SCREEN_HEIGHT;
export const STATS_TITLE_X = ORIG_STATS_TITLE_X / ORIG_SCREEN_WIDTH;
export const STATS_TITLE_Y = ORIG_STATS_TITLE_Y / ORIG_SCREEN_HEIGHT;
export const STATS_DESC_WIDTH = ORIG_STATS_DESC_WIDTH / ORIG_SCREEN_WIDTH;
export const STATS_DESC_HEIGHT = ORIG_STATS_DESC_HEIGHT / ORIG_SCREEN_HEIGHT;
export const STATS_DESC_X = ORIG_STATS_DESC_X / ORIG_SCREEN_WIDTH;
export const STATS_DESC_Y = ORIG_STATS_DESC_Y / ORIG_SCREEN_HEIGHT;
export const STATS_PAD_X = ORIG_STATS_PAD / ORIG_SCREEN_WIDTH;
export const STATS_PAD_Y = ORIG_STATS_PAD / ORIG_SCREEN_HEIGHT;

// Size of acknowledgement based on the image size
export const ACKNOWLEDGEMENT_WIDTH = ORIG_ACKNOWLEDGEMENT_WIDTH / ORIG_SCREEN_WIDTH;
export const ACKNOWLEDGEMENT_HEIGHT = ORIG_ACKNOWLEDGEMENT_HEIGHT / ORIG_SCREEN_HEIGHT;
export const ACKNOWLEDGEMENT_PAD_X = ORIG_ACKNOWLEDGEMENT_PAD / ORIG_SCREEN_WIDTH;
export const ACKNOWLEDGEMENT_PAD_Y = ORIG_ACKNOWLEDGEMENT_PAD / ORIG_SCREEN_HEIGHT;

// Maximum number of tries to relocate the character
export const MAX_TRY_COUNT = 3;

// Direction of the character
export const DIRECTION = {
	Top: 0,
	Bottom: 1,
	Left: 2,
	Right: 3,
	Front: 4,
	Rear: 5,
	X: 8,
	Y: 9,
};

// Allowed clickable area
export const CLICK_BOUNDARY = {
	X1: 0,
	X2: 9,
	Y1: 7,
	Y2: 14,
};

// Root directory of assets
export const ASSETS_PATH = "https://assets.codepen.io/430361/";

// Types of assets for this application
export const ASSET_TYPE = {
	Image: 0,
	Audio: 1,
	JSON: 2,
};

// Instructions to be shown
export const INSTRUCTION_MESSAGE = {
	// Enum
	Main: 0,
	Profile: 1,
	Others: 2,
	// Mapping
	0: "Main",
	1: "Profile",
	2: "Others",
};

// Available set of characters for the text
export const CHARACTERS = [
	"alphabet",
	"numeric",
	"symbol",
	"hiragana",
	"katakana",
	"kanji",
];

// URL of my portfolio
export const LINK_TO_CODEPEN = "https://codepen.io/takaneichinose";
export const LINK_TO_GITHUB = "https://github.com/takaneichinose";
export const LINK_TO_TWITTER = "https://twitter.com/takane_ichi";
export const LINK_TO_BLOG = "https://dev.to/takaneichinose";
export const LINK_TO_RESUME = "https://assets.codepen.io/430361/Resume+%282021_10_23%29.pdf";
export const LINK_TO_EMAIL = "mailto:ichinose.takane@gmail.com";

// For image files
export const IMAGES_DIR = `${ASSETS_PATH}`;
export const IMAGES = {
	CharacterFront: "profile-character-front.png",
	CharacterFrontMove: "profile-character-front-move.gif",
	CharacterRear: "profile-character-rear.png",
	CharacterRearMove: "profile-character-rear-move.gif",
	CharacterLeft: "profile-character-left.png",
	CharacterLeftMove: "profile-character-left-move.gif",
	CharacterRight: "profile-character-right.png",
	CharacterRightMove: "profile-character-right-move.gif",
	Background: "profile-background.png",
	Carpet: "profile-carpet.png",
	Clock: "profile-clock.png",
	Door: "profile-door.png",
	Desk: "profile-desk.png",
	Drawer: "profile-drawer.png",
	Files: "profile-files.png",
	Laptop: "profile-laptop.png",
	Plant: "profile-plant.png",
	Shelf: "profile-shelf.png",
	Window: "profile-window.png",
	Alphabet: "profile-alphabet.png",
	SpeechDialog: "profile-speech-dialog.png",
	MenuButton: "profile-menu-button.png",
	Numeric: "profile-numeric.png",
	TextSelector: "profile-text-selector.png",
	MenuBackground: "profile-menu-background.png",
	MainMenu: "profile-main-menu.png",
	ProfileIcon: "profile-profile-icon.png",
	GithubIcon: "profile-github-icon.png",
	TwitterIcon: "profile-twitter-icon.png",
	CodepenIcon: "profile-codepen-icon.png",
	LaptopIcon: "profile-laptop-icon.png",
	FilesIcon: "profile-files-icon.png",
	MessageIcon: "profile-message-icon.png",
	AcknowledgementIcon: "profile-acknowledgement-icon.png",
	StatsImage: "profile-stats-image.png",
	StatsTitle: "profile-stats-title.png",
	StatsDescription: "profile-stats-description.png",
	Symbol: "profile-symbol.png",
	Acknowledgement: "profile-acknowledgement.png",
};

// For audio files
export const AUDIOS_DIR = `${ASSETS_PATH}`;
export const AUDIOS = {
	Background: "White+Christmas.mpga",
};

// For JSON files
export const JSON_DIR = `${ASSETS_PATH}`;
export const JSON_MAP = {
	Text: "profile-internationalization.json",
	Alphabet: "profile-alphabet.json",
	Numeric: "profile-numeric.json",
	Symbol: "profile-symbol.json",
	Hiragana: "profile-hiragana.json",
	Katakana: "profile-katakana.json",
	Kanji: "profile-kanji.json",
	Skills1: "profile-skills-1.json",
	Skills2: "profile-skills-2.json",
};
