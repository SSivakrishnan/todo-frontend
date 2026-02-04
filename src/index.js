import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as ChakraProvide } from "./components/ui/provider";
import { Drawer } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./stores";
import './firebase.js'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvide>
        <Drawer.Root>
          <App />
        </Drawer.Root>
      </ChakraProvide>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
