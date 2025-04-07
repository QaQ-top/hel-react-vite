import { createRoot } from "react-dom/client";
import App from "./App";
import { createElement } from "react";

const app = createRoot(document.querySelector("#root")!);

app.render(createElement(App));
