import path from "path";
import { ESLint, Linter } from "eslint";

export function stripEmptyFiles(
  results: ESLint.LintResult[]
): ESLint.LintResult[] {
  return results.filter((result) => !!result.messages.length);
}

export function stripNullRuleIds(ruleIds: (string | null)[]): string[] {
  return ruleIds.filter((ruleId): ruleId is string => ruleId !== null);
}

export function mapReportToOverrides(
  results: ESLint.LintResult[],
  level: Linter.RuleLevel
): Linter.ConfigOverride[] {
  return stripEmptyFiles(results).map((result: ESLint.LintResult) => {
    const uniqueRuleIds = Array.from(
      new Set(result.messages.map((message) => message.ruleId))
    );

    const rules: Linter.RulesRecord = {};
    stripNullRuleIds(uniqueRuleIds).forEach((ruleId) => {
      rules[ruleId] = level;
    });

    return {
      files: [path.relative(process.cwd(), result.filePath)],
      rules,
    };
  });
}
