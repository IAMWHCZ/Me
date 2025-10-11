import type React from "react";

const Button: React.FC<React.ComponentPropsWithRef<"button">> = (props) => {
	return (
		<button type="button" {...props}>
			Button1
		</button>
	);
};

export default Button;
