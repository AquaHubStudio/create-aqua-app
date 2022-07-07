import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";
import { PKG_ROOT } from "../defaults.js";
import { execa } from "../utils/execCmdAsync.js";
import { ValidPackages } from "./createProject.js";

export interface InstallerOptions {
    projectDir: string;
    projectName?: string;
    packages?: ValidPackages[];
}

// This bootstraps the base Next.js application
export const scaffoldProject = async ({
  projectName,
  projectDir
}: InstallerOptions) => {
  const srcDir = path.join(PKG_ROOT, "template");

  const spinner = ora(`Scaffolding in: ${projectDir}...\n`).start();

  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length === 0) {
      spinner.info(
        `${chalk.blue.bold(projectName)} exists but is empty, continuing...\n`,
      );
    } else {
      spinner.stopAndPersist();
      const { overwriteDir } = await inquirer.prompt<{ overwriteDir: boolean }>(
        {
          name: "overwriteDir",
          type: "confirm",
          message: `${chalk.redBright.bold("Warning:")} ${chalk.blue.bold(
            projectName,
          )} already exists and isn't empty. Do you want to overwrite it?`,
          default: false,
        },
      );
      if (!overwriteDir) {
        spinner.fail("Aborting installation...");
        process.exit(0);
      } else {
        spinner.info(
          `Emptying ${chalk.blue.bold(projectName)} and creating aqua app..\n`,
        );
        fs.emptyDirSync(projectDir);
      }
    }
  }

  spinner.start();

  await fs.copy(srcDir, projectDir);

  await execa(`npm install`, { cwd: projectDir });
  spinner.succeed(`${chalk.blue.bold(projectName)} scaffolded successfully!\n`);
};