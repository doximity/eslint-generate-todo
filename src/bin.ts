import program from "caporal";
import { execute } from "./index";
import { version } from "../package.json";

program
  .version(version)
  .description("Generates a list of disabled eslint rules.")
  .argument("[files...]", "Files to validate", program.LIST, ".")
  .option(
    "-f --format <format>",
    "Set the output format of the todo list <yaml | json>",
    ["yaml", "json"],
    "yaml"
  )
  .option(
    "-o --off",
    "Set todo list items to 'off' instead of 'warning'",
    program.BOOL,
    false
  )
  .option(
    "-p --path <path>",
    "Set the location of the generated todo list overrides file"
  )
  .action(async (args, options, logger) => {
    const level = options.off ? "off" : "warn";

    const configFile = await execute(args.files, {
      level,
      format: options.format,
      path: options.path,
    });

    logger.info(`ESLint todo config written to ${configFile}`);
    logger.info("You may now extend this config in your ESLint config file.");
  });

export const parse = (args: string[]) => {
  program.parse(args);
};
