import chalk from "chalk";
import ora from "ora";
import { execa } from "../utils/execCmdAsync.js";
import { logger } from "../utils/logger.js";
import { ValidPackages } from "./createProject.js";
import { InstallerOptions } from "./scaffoldProject.js";

interface InstallPackagesOptions extends InstallerOptions {
  packages: ValidPackages[];
}
// This runs the installer for all the packages that the user has selected
export const installPackages = async ({
  projectDir,
  packages,
}: InstallPackagesOptions) => {
  if(typeof packages !== 'undefined' && packages.length > 0) {
    logger.info('Installing packages...');

    for (const name of packages) {
        const spinner = ora(`Installing ${name}...`).start();
        await execa(`npm i ${name}`, { cwd: projectDir })
        spinner.succeed(
          chalk.green(`Successfully installed ${chalk.green.bold(name)}`),
        );
    }
  }
  
  logger.info("");
};