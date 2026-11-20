# DEMO-EPIBT

An interactive warehouse demo using EPIBT to plan for agents with orientation.
Choose or edit a layout, load and save JSON scenarios, and inspect each
agent's current task and plan.

[Open the demo](https://aandreychuk.github.io/DEMO-EPIBT/)

## Run locally

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Use Node.js 22 and pnpm 11.25.0. Run `pnpm build` for a static build.

See the [runtime documentation](runtime/epibt/README.md) for the JSON
format, upstream source and WebAssembly build instructions.
