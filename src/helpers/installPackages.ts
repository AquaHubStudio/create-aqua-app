import chalk from "chalk";
import ora from "ora";
import { execa } from "../utils/execCmdAsync";
import { logger } from "../utils/logger.js";
import { ValidPackages } from "./createProject";
import { InstallerOptions } from "./scaffoldProject";

interface InstallPackagesOptions extends InstallerOptions {
  packages: ValidPackages[];
}
// This runs the installer for all the packages that the user has selected
export const installPackages = async ({
  projectDir,
  packages,
}: InstallPackagesOptions) => {
  logger.info('Installing packages...');

  console.log({ test: true, packages})
  for (const [ name ] of packages) {
      const spinner = ora(`Installing ${name}...`).start();
      await execa(`npm i ${name}`)
      spinner.succeed(
        chalk.green(`Successfully installed ${chalk.green.bold(name)}`),
      );
  }
  logger.info("");
};