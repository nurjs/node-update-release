# NUR

**Node Update Release**

Nur was created to update npm packages easy and simple.

It will update the package.json with log file and create a git tag and commit.
After creation it will be pushed to git remote origin.

## Installation

```
# Recommended.
npx @nurjs/nurjs --release-type [options]

# OR an alternative global install.
npm install -g @nurjs/nurjs --release-type [options]
```

## Usage

### patch Release

```sh
nur --patch
```

### minor Release

```sh
nur --minor
```

### major Release

```sh
nur --major
```

### arguments

| argument | alias | description                       | default | example               |
| -------- | ----- | --------------------------------- | ------- | --------------------- |
| major    | -     | creates a major release           | false   | `nur --major`         |
| minor    | -     | creates a minor release           | false   | `nur --minor`         |
| patch    | -     | creates a patch release           | false   | `nur --patch`         |
| git      | -     | to decide if a git should be used | true    | `nur -g false`        |
| branch   | b     | git branch to commit to           | main    | `nur --branch main`   |
| version  | -     | Print CLI version                 | -       | `nur --version`       |
| debug    | -     | print debug info                  | false   | `nur --patch --debug` |
| clear    | -     | clears console after usage        | false   | `nur --patch --clear` |

## contributions

Check [contributions instructions](./CONTRIBUTING.md)
