import fs from "fs";
import path from "path";
import { INode, parse, stringify } from "svgson";

const toPascalCase = (str: string): string =>
  str.replace(/(^\w|-\w)/g, (clear) => clear.replace("-", "").toUpperCase());

function transformAttr(
  key: string,
  value: string,
  escape: (str: string) => string
) {
  if (key === "stroke" && value !== "none") {
    value = "currentColor";
  }
  if (key === "fill" && value !== "none") {
    value = "currentColor";
  }

  return `${key}="${escape(value)}"`;
}

function getViewBox(attributes: any): string {
  if (attributes.viewBox) {
    return attributes.viewBox;
  }
  if (attributes.width && attributes.height) {
    return `0 0 ${attributes.width} ${attributes.height}`;
  }
  return "0 0 24 24";
}

async function generateIcon(
  iconName: string,
  filePath: string
): Promise<string> {
  const file = fs.readFileSync(filePath, "utf-8");
  const source = await parse(file);

  return `import * as React from 'react';

/**
 * @description ${iconName} icon component.
 *
 * @component
 * @example
 * \`\`\`jsx
 * import { ${iconName} } from '@plex-inc/icons'
 *
 * <${iconName} />
 * \`\`\`
 */
export const ${iconName} = React.forwardRef<SVGSVGElement, React.HTMLAttributes<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} viewBox="${getViewBox(
    source.attributes
  )}" fill="none" xmlns="${
    source.attributes.xmlns || "http://www.w3.org/2000/svg"
  }" {...props}>
    ${stringify(source.children as unknown as INode, { transformAttr })}
  </svg>
));`;
}

// Процесс генерации иконок из папок fill и stroke
const iconTypes = ["fill", "stroke"] as const;

async function generateIcons() {
  const distDir = path.join(__dirname, "../src/icons");

  fs.mkdirSync(distDir, { recursive: true });

  let exportStatements = "";

  for (const type of iconTypes) {
    const srcDir = path.join(__dirname, `../src/${type}`);

    // Читаем все SVG файлы в директории src/{type}
    const files = fs.readdirSync(srcDir);
    for (const file of files) {
      if (path.extname(file) === ".svg") {
        const iconName = `${toPascalCase(
          path.basename(file, ".svg")
        )}${toPascalCase(type)}`;
        const componentContent = await generateIcon(
          iconName,
          path.join(srcDir, file)
        );

        // Записываем сгенерированный компонент в файл
        const outputPath = path.join(distDir, `${iconName}.tsx`);
        fs.writeFileSync(outputPath, componentContent);

        // Добавляем экспорт для index.ts
        exportStatements += `export * from './${iconName}';\n`;
      }
    }
  }

  // Создаём файл index.ts с экспортами всех иконок
  fs.writeFileSync(path.join(distDir, "index.ts"), exportStatements);
}

generateIcons();
