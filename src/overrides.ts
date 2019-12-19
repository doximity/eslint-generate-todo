import path from "path";
import { CLIEngine, Linter } from "eslint";

function stripEmptyFiles(
  results: CLIEngine.LintResult[]
): CLIEngine.LintResult[] {
  return results.filter(result => !!result.messages.length);
}

function stripNullRuleIds(ruleIds: (string | null)[]): string[] {
  return ruleIds.filter((ruleId): ruleId is string => ruleId !== null);
}

export function mapReportToOverrides(
  report: CLIEngine.LintReport,
  level: Linter.RuleLevel
): Linter.RuleOverride[] {
  return stripEmptyFiles(report.results).map((result: CLIEngine.LintResult) => {
    const uniqueRuleIds = Array.from(
      new Set(result.messages.map(message => message.ruleId))
    );

    const rules: Linter.RulesRecord = {};
    stripNullRuleIds(uniqueRuleIds).forEach(ruleId => {
      rules[ruleId] = level;
    });

    return {
      files: [path.relative(process.cwd(), result.filePath)],
      rules
    };
  });
}
