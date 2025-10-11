import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(
	document.getElementById("root") ?? document.createElement("div"),
).render(<StrictMode></StrictMode>);
