import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import io from "socket.io-client";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import CreateRoom from "./CreateLobby";
import JoinLobby from "./JoinLobby";
import ARViewer from "./ARViewer";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "TradeGothic";
    font-style: normal;
    font-weight: 400;
    src: local(""), url("/fonts/TradeGothic.woff2") format("woff2"), url("/fonts/TradeGothic.woff") format("woff");
  }

  @font-face {
    font-family: "TradeGothic";
    font-style: normal;
    font-weight: bold;
    src: local(""), url("/fonts/TradeGothic-Bold.woff2") format("woff2"), url("/fonts/TradeGothic-Bold.woff") format("woff");
  }
    
  body {
    margin: 0;
    background: #66cccc;
    font-family: "TradeGothic";
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100vh;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
`;

const socket = io("/", { autoConnect: false });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GlobalStyle />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create-lobby" element={<CreateRoom socket={socket} />} />
      <Route path="/join-lobby" element={<JoinLobby socket={socket} />} />
      <Route path="/game" element={<ARViewer socket={socket} />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
