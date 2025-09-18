# Contributing to Frappe-UI-React

If you're reading this, you're awesome!
Thank you for being a part of the community and helping us make these projects great.
Here are a few guidelines that will help you along the way.

## Summary

- [Code of conduct](#code-of-conduct)
- [A large spectrum of contributions](#a-large-spectrum-of-contributions)
- [Your first pull request](#your-first-pull-request)
- [Sending a pull request](#sending-a-pull-request)
  - [How to increase the chances of being accepted](#how-to-increase-the-chances-of-being-accepted)
  - [CI checks and how to fix them](#ci-checks-and-how-to-fix-them)
  - [Coding style](#coding-style)
- [Contributing to the documentation](#contributing-to-the-documentation)
  - [How to find docs issues to work on](#how-to-find-docs-issues-to-work-on)
  - [How to add a new demo to the docs](#how-to-add-a-new-demo-to-the-docs)
- [License](#license)

## Code of conduct

We have adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as our code of conduct, and we expect project participants to adhere to it.
Please read [the full text](https://github.com/frappe-ui-react/.github/blob/master/CODE_OF_CONDUCT.md) to understand what actions will and will not be tolerated.

## A large spectrum of contributions

There are many ways to contribute to the library, and writing code is only one part of the story—[documentation improvements](#contributing-to-the-documentation) can be just as important as code changes.
If you have an idea for an improvement to the code or the docs, we encourage you to open an issue as a first step, to discuss your proposed changes with the maintainers before proceeding.

## Your first pull request

Working on your first pull request? You can learn how in this free video series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

Get started with [good first issues](https://github.com/rtCamp/frappe-ui-react/issues?q=is:open+is:issue+label:"good+first+issue"), which have a limited scope and a working solution that's already been discussed.
This makes them ideal for newer developers, or those who are new to these libraries and want to see how the contribution process works.

We also have a list of [ready to take issues](https://github.com/rtCamp/frappe-ui-react/issues?q=is:open+is:issue+label:"ready+to+take"), which are issues that have already been at least partially resolved in discussion, to the point that it's clear what to do next.
These issues are great for developers who want to reduce their chances of falling down a rabbit hole in search of a solution.

Of course, you can work on any other issue you like—the "good first" and "ready to take" issues are simply those where the scope and timeline may be better defined.
Pull requests for other issues, or completely novel problems, may take a bit longer to review if they don't fit into our current development cycle.

If you decide to fix an issue, please make sure to check the comment thread in case somebody is already working on a fix.
If nobody is working on it at the moment, please leave a comment stating that you've started to work on it, so other people don't accidentally duplicate your effort.

If somebody claims an issue but doesn't follow up after more than a week, it's fine to take over, but you should still leave a comment.
If there has been no activity on the issue for 7 to 14 days, then it's safe to assume that nobody is working on it.

## Sending a pull request

MUI Core projects are community-driven, so pull requests are always welcome, but before working on a large change, it's best to open an issue first to discuss it with the maintainers.

When in doubt, keep your pull requests small.
For the best chances of being accepted, don't bundle more than one feature or bug fix per PR.
It's often best to create two smaller PRs rather than one big one.

1. Fork the repository.

2. Clone the fork to your local machine and add the upstream remote:

```bash
git clone https://github.com/rtCamp/frappe-ui-react.git
cd frappe-ui-react
git remote add upstream https://github.com/rtCamp/frappe-ui-react.git
```

<!-- #target-branch-reference -->

3. Synchronize your local `main` branch with the upstream one:

```bash
git checkout master
git pull upstream master
```

4. Install the dependencies with pnpm (yarn or npm aren't supported):

```bash
npm install
```

5. Create a new topic branch:

```bash
git checkout -b [fix/feat/chore/hotfix]/branch-topic
```

6. Make changes, commit, and push to your fork:

```bash
git push -u origin HEAD
```

7. Go to [the repository](https://github.com/rtCamp/frappe-ui-react.git) and open a pull request.

The core team actively monitors for new pull requests.
We will review your PR and either merge it, request changes to it, or close it with an explanation.

### How to increase the chances of being accepted

Continuous Integration (CI) automatically runs a series of checks when a PR is opened.
If you're unsure whether your changes will pass, you can always open a PR, and the GitHub UI will display a summary of the results.
If any of these checks fail, refer to [CI checks and how to fix them](#ci-checks-and-how-to-fix-them).

Make sure the following is true:

<!-- #target-branch-reference -->

- The branch is targeted at `develop` for ongoing development. All tests are passing. Code that lands in `develop` must be compatible with the latest stable release. It may contain additional features but no breaking changes. We should be able to release a new minor version from the tip of `develop` at any time.
- If a feature is being added:
  - If the result was already achievable with the core library, you've explained why this feature needs to be added to the core.
  - If this is a common use case, you've added an example to the documentation.
- If adding new features or modifying existing ones, you've included tests to confirm the new behavior. You can read more about our test setup in our test README.
- If props were added or prop types were changed, you've updated the TypeScript declarations.
- The branch is not [behind its target branch](https://docs.github.com/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/keeping-your-pull-request-in-sync-with-the-base-branch).
- If you have included a visual component make sure to add a storybook file with possible variations.

We will only merge a PR when all tests pass.
The following statements must be true:

- The code is formatted. If the code was changed, run `npm prettier`.
- The code is linted. If the code was changed, run `npm eslint`.
- The code is type-safe. If TypeScript sources or declarations were changed, run `npm typescript` to confirm that the check passes.
- The pull request title follows the pattern `[product-name][Component] Imperative commit message`. (See: [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) for a great explanation).

Don't worry if you miss a step—the Continuous Integration will run a thorough set of tests on your commits, and the maintainers of the project can assist you if you run into problems.

If your pull request addresses an open issue, make sure to link the PR to that issue.
Use any [supported GitHub keyword](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword) in the PR description to automatically link them.
This makes it easier to understand where the PR is coming from, and also speeds things up because the issue will be closed automatically when the PR is merged.

### CI checks and how to fix them

If any of the checks fail, click on the **Details** link and review the logs of the build to find out why it failed.
For CircleCI, you need to log in first.
No further permissions are required to view the build logs.
The following sections give an overview of what each check is responsible for.

#### Continuous Releases

This task publishes a preview for the packages to pkg.pr.new. It should not fail in isolation. Use it to test more complex scenarios.

#### codecov/project

This monitors coverage of the tests.
A reduction in coverage isn't necessarily bad, but it's always appreciated if it can be improved.

#### Misc

There are various other checks done by Netlify to validate the integrity of the docs.
Click on **Details** to find out more about them.

### Coding style

Please follow the coding style of the project.
It uses Prettier and ESLint, so if possible, enable linting in your editor to get real-time feedback.

- `npm prettier` reformats the code.
- `npm eslint` runs the linting rules.

When you submit a PR, these checks are run again by our continuous integration tools, but hopefully your code is already clean!

## Contributing to the documentation

Contributing to open-source docs involves a lot more than just fixing typos—developers frequently request more in-depth explanations of component features, and this requires both coding and technical writing to accomplish.
Every documentation PR will be reviewed by an editor following [MUI's writing style guide](https://mui-org.notion.site/Writing-style-guide-2a957a4168a54d47b14bae026d06a24b), and if you plan to contribute regularly, you should familiarize yourself with this guide to speed up the editing process.

### How to find docs issues to work on

If you're interested in contributing to the docs but aren't sure where to start, you can use this search prompt in the GitHub repo to find open issues tagged with both `docs` and `ready to take`:

`is:issue is:open label:docs label:"ready to take"`

Or [follow this link directly to the results of that search](https://github.com/rtCamp/frappe-ui-react/issues?q=is%3Aissue+is%3Aopen+label%3Adocs+label%3A%22ready+to+take%22).

### How to add a new demo to the docs

The following steps explain how to add a new demo to the docs using the Button component as an example:

#### 1. Add a new component file to the directory

Add the new file to the component's corresponding directory...

```bash
packages/frappe-ui-react/src/components/button
```

...and give it a name: how about `buttons.stories.tsx`?

#### 2. Write the demo code

We use TypeScript with storybook to document our components.
We prefer demos written in TypeScript (using the `.tsx` file format).

#### 4. Submit your PR

Now you're ready to [open a PR](#sending-a-pull-request) to add your new demo to the docs.

Check out [this Toggle Button demo PR](https://github.com/rtCamp/frappe-ui-react/pull/35) for an example of what your new and edited files should look like when opening your own demo PR.

## License

By contributing your code to the [rtcamp/frappe-ui-react](https://github.com/rtCamp/frappe-ui-react) GitHub repository, you agree to license your contribution under the [MIT license](/LICENSE).
