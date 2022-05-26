import fs from "fs";
import util from "util";
import { ESLint, Linter } from "eslint";

import { renderAsYAML, renderAsJSON } from "./render";
import { mapReportToOverrides } from "./overrides";

const writeFile = util.promisify(fs.writeFile);

interface Options {
  format: "yaml" | "json";
  level: Linter.RuleLevel;
  path?: string;
}

export const execute = async (
  files: string[],
  { level, format = "yaml", path }: Options
): Promise<string> => {
  const cli = new ESLint({});
  const results = await cli.lintFiles(files);
  const config = { overrides: mapReportToOverrides(results, level) };

  const outputPath =
    path || `.eslintrc-todo.${format === "yaml" ? "yml" : "json"}`;

  await writeFile(
    outputPath,
    format === "yaml" ? renderAsYAML(config) : renderAsJSON(config),
    { encoding: "utf8" }
  );

  return outputPath;
};
