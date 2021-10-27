// ReactJS
import React from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

// React-Redux provider component
import { Provider } from "https://cdn.skypack.dev/react-redux@7.2.4";

// Redux store of states
import store from "./utils/store";

// Main component of my personal profile
import MyProfile from "./components/MyProfile";

function App() {
	return (
		<Provider store={store}>
			<MyProfile lang={systemLanguage} />
		</Provider>
	);
}

ReactDOM.render(<App />, document.getElementById("app"));
