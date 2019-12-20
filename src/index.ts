import fs from "fs";
import util from "util";
import { CLIEngine, Linter } from "eslint";

import { renderAsYAML, renderAsJSON } from "./render";
import { mapReportToOverrides } from "./overrides";

const writeFile = util.promisify(fs.writeFile);

export async function execute(
  files: Array<string>,
  {
    level,
    format = "yaml",
    path
  }: { level: Linter.RuleLevel; format: "yaml" | "json"; path?: string }
): Promise<string> {
  const cli = new CLIEngine({});

  const report = cli.executeOnFiles(files) as CLIEngine.LintReport;
  const config = { overrides: mapReportToOverrides(report, level) };

  const outputPath =
    path || `.eslintrc-todo.${format === "yaml" ? "yml" : "json"}`;

  await writeFile(
    outputPath,
    format === "yaml" ? renderAsYAML(config) : renderAsJSON(config),
    { encoding: "utf8" }
  );

  return outputPath;
}
