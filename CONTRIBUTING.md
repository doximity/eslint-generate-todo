# Contributing

Thank you for wanting to contribute back to the eslint-generate-todo repository. Please submit an [issue to the repository](https://github.com/doximity/eslint-generate-todo/issues) if you notice a requirement that is missing from this document.

Before contributing code to `eslint-generate-todo`, please read and sign the [Contributor License Agreement](CONTRIBUTOR_LICENSE_AGREEMENT.md).

## Guidelines

We ask that you keep the following guidelines in mind when planning your contribution:

- Whether your contribution is for a bug fix or a feature request, **create an [Issue](https://github.com/doximity/eslint-generate-todo/issues)** to let us know what you are thinking before you fix it. It helps us give a LGTM much faster (with fewer cases of saying no to a PR)
- **For bugs**, if you have already found a fix, feel free to submit a Pull Request referencing the Issue you created. Include the `Fixes #` syntax to link it to the issue you're addressing.
- **For feature requests**, we want to improve upon the library incrementally which means small changes at a time. In order to ensure your PR can be reviewed in a timely manner, please keep PRs small. If you think this is unrealistic, then mention that within the issue and we can discuss it.

## Workflow

Once you're ready to contribute code back to this repo, ensure you setup your environment to be prepared for upstream contributions.

### 1) Fork on GitHub

Fork the appropriate repository by clicking the Fork button (top right) on GitHub.

### 2) Create a Local Fork

From whatever directory you want to have this code, clone this repository and setup some sane defaults:

```
$ git clone https://github.com/doximity/eslint-generate-todo/
# or: git clone git@github.com:doximity/eslint-generate-todo.git

$ cd eslint-generate-todo

$ git remote add upstream https://github.com/doximity/eslint-generate-todo.git
# or: git remote add upstream git@github.com:doximity/eslint-generate-todo.git

# Never allow a push to upstream master
$ git remote set-url --push upstream no_push

# Confirm that your remotes make sense:
$ git remote -v
```

### 3) Create a Branch for Your Contribution

Begin by updating your local fork of the plugin:

```
$ git fetch upstream
$ git checkout master
$ git rebase upstream/master
```

Create a new, descriptively named branch to contain your change:

```
$ git checkout -b feature/myfeature
```

Now hack away at your awesome feature on the `feature/myfeature` branch.

### 4) Testing Your Code

We use [Jest](https://jestjs.io) to test eslint-generate-todo. Please ensure your code is properly tested.

### 5) Committing Code

Commit your changes with a thoughtful commit message.

```
$ git commit -am "Add a check for Foo

Foo is a particularly helpful status when working with Bar. Designed to gather XYZ from the foobar interface."
```

Repeat the commit process as often as you need and then edit/test/repeat. Minor edits can be added to your last commit quite easily:

```
$ git add -u
$ git commit --amend
```

### 6) Pushing to GitHub

When ready to review (or just to establish an offsite backup or your work), push your branch to your fork on GitHub:

```
$ git push origin feature/myfeature
```

If you recently used `commit --amend`, you may need to force push:

```
$ git push -f origin feature/myfeature
```

### 7) Create a Pull Request

Create a pull request by visiting https://github.com/doximity/eslint-generate-todo/ and following the instructions at the top of the screen.

After the PR is submitted, project maintainers will review it.

### 8) Responding to your Pull Request

PRs are rarely merged without some discussion with a maintainer. This is to ensure the larger community benefits from all code contributions.

Please regularly check your open PRs, easily found at https://github.com/pulls, to help maintainer's get the information needed to merge your code.
