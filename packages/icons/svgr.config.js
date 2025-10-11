module.exports = {
	icon: true,
	replaceAttrValues: {
		"#063855": "currentColor", // 将 #063855 替换为 currentColor
	},
	typescript: true,
	template: (variables, { tpl }) => {
		return tpl`
      import React from 'react';
      import { SVGProps } from 'react';

      const ${variables.componentName} = (props: SVGProps<SVGSVGElement>) => (
        ${variables.jsx}
      );
      export default ${variables.componentName};
    `;
	},
	outDir: "dist",
	filenameCase: "kebab",
};
