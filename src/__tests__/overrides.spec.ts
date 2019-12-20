import { CLIEngine } from "eslint";

import {
  stripEmptyFiles,
  stripNullRuleIds,
  mapReportToOverrides
} from "../overrides";

function generateLintResult(ruleIds: string[] = []): CLIEngine.LintResult {
  return {
    filePath: "foo",
    messages: ruleIds.map(ruleId => ({
      column: 0,
      line: 0,
      ruleId,
      message: "",
      nodeType: "",
      severity: 0,
      source: ""
    })),
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0
  };
}

function generateReport(
  results: CLIEngine.LintResult[] = []
): CLIEngine.LintReport {
  return {
    results,
    errorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0
  };
}

describe("stripEmptyFiles", () => {
  test("removes results with no messages", () => {
    const results = [
      generateLintResult(),
      generateLintResult(["foo", "bar"]),
      generateLintResult()
    ];

    expect(stripEmptyFiles(results)).toEqual([results[1]]);
  });
});

describe("stripNullRuleIds", () => {
  test("removes null rule IDs", () => {
    const ruleIds = ["foo", null, "bar", null, "baz"];

    expect(stripNullRuleIds(ruleIds)).toEqual(["foo", "bar", "baz"]);
  });
});

describe("mapReportToOverrides", () => {
  test("creates a list of overrides from a report", () => {
    const report = generateReport([generateLintResult(["foo", "bar"])]);

    expect(mapReportToOverrides(report, "warn")).toEqual([
      {
        files: ["foo"],
        rules: {
          foo: "warn",
          bar: "warn"
        }
      }
    ]);
  });

  test("sets the level of the rules", () => {
    const report = generateReport([generateLintResult(["foo", "bar"])]);

    expect(mapReportToOverrides(report, "warn")).toEqual([
      {
        files: ["foo"],
        rules: {
          foo: "warn",
          bar: "warn"
        }
      }
    ]);

    expect(mapReportToOverrides(report, "off")).toEqual([
      {
        files: ["foo"],
        rules: {
          foo: "off",
          bar: "off"
        }
      }
    ]);
  });

  test("combines duplicate rule violations", () => {
    const report = generateReport([generateLintResult(["foo", "foo", "bar"])]);

    expect(mapReportToOverrides(report, "warn")).toEqual([
      {
        files: ["foo"],
        rules: {
          foo: "warn",
          bar: "warn"
        }
      }
    ]);
  });
});
