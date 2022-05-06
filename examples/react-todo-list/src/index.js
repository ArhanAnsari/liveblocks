import React from "react";
import ReactDOM from "react-dom";
import { createClient } from "@liveblocks/client";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react";
import App from "./App";
import "./index.css";

const query = new URLSearchParams(window?.location?.search);

/**
 * Replace by your public key from https://liveblocks.io/dashboard/apikeys.
 */
let PUBLIC_KEY = "pk_YOUR_PUBLIC_KEY";

/**
 * Used for coordinating public API keys from outside (e.g. https://liveblocks.io/examples).
 *
 * http://localhost:3000/?token=pk_live_1234
 */
const token = query.get("token");

if (token) {
  PUBLIC_KEY = token;
}

if (!/^pk_(live|test)/.test(PUBLIC_KEY)) {
  console.warn(
    `Replace "${PUBLIC_KEY}" by your public key from https://liveblocks.io/dashboard/apikeys.\n` +
      `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/react-todo-list#getting-started.`
  );
}

const client = createClient({
  publicApiKey: PUBLIC_KEY,
});

const defaultRoomId = "react-todo-list";

const roomSuffix = query.get("room");
let roomId = defaultRoomId;

/**
 * Add a suffix to the room ID using a query parameter.
 * Used for coordinating rooms from outside (e.g. https://liveblocks.io/examples).
 *
 * http://localhost:3000/?room=1234 → react-todo-list-1234
 */
if (roomSuffix) {
  roomId = `${defaultRoomId}-${roomSuffix}`;
}

function Page() {
  return (
    <RoomProvider id={roomId}>
      <App />
    </RoomProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <LiveblocksProvider client={client}>
      <Page />
    </LiveblocksProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
