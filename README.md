# eslint-generate-todo
Tool for generating eslint todo files

# Installation

```bash
yarn add --dev eslint-generate-todo
```

# Usage

Generate a `.eslintrc-todo` file using the `eslint-generate-todo` CLI:

```bash
eslint-generate-todo
```

You may then extend the resulting `.eslintrc-todo` file in your eslint config:

```yaml
extends:
  - .eslintrc-todo.yml
```

## CLI

Run `eslint-generate-todo` through the CLI with this script. Run it with `--help` to see the options. Files use glob syntax and may be specified multiple times.

```bash
eslint-generate-todo [files...]
```

### `--format`

If you want to specify the file format of the output `.eslintrc-todo` file, you can run `eslint-generate-todo` with the `--format` flag (or `-f`), followed by either `yaml` or `json`. By default `eslint-generate-todo` outputs to `yaml`.

```bash
eslint-generate-todo --format json
```

### `--off`

To set rule overrides in the generated `.eslintrc-todo` file to `"off"` instead of `"warn"`, you can run `eslint-generate-todo` with the `--off` (or `-o`) flag.

```bash
eslint-generate-todo --off
```

### `--path`

To change the output path of the generated `.eslintrc-todo` file, you can run `eslint-generate-todo` with the `--path` (or `p`) flag, followed by the project root-relative path.

```bash
eslint-generate-todo --path config/eslint-overrides.yml
```
