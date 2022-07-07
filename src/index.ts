#!/usr/bin/env node
import type { PackageJson } from "type-fest";
import path from "path";
import fs from "fs-extra";
import { runCli } from "./cli/index.js";
import { createProject } from "./helpers/createProject.js";
import { logNextSteps } from "./helpers/logNextSteps.js";
import { logger } from "./utils/logger.js";
import { parseNameAndPath } from "./utils/parseNameAndPath.js";
import { printTitle } from "./utils/printTitle.js";

const main = async () => {
  printTitle();

  const {
    appName,
    packages,
  } = await runCli();

  // e.g. dir/@mono/app returns ["@mono/app", "dir/app"]
  const [scopedAppName, appDir] = parseNameAndPath(appName);

  const projectDir = await createProject({
    projectName: appDir,
    packages: packages,
  });

  logNextSteps({ projectName: appDir });
  const pkgJson = (await fs.readJSON(
    path.join(projectDir, "package.json"),
  )) as PackageJson;
  pkgJson.name = scopedAppName;
  await fs.writeJSON(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });

  process.exit(0);
};

main().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "An unknown error has occurred. Here's the error:",
    );
    console.log(err);
  }
  process.exit(1);
});