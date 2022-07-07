import chalk from "chalk";
import ora from "ora";
import { execa } from "../utils/execCmdAsync.js";
import { logger } from "../utils/logger.js";
export const installPackages = async ({ projectDir, packages, }) => {
    logger.info('Installing packages...');
    for (const name of packages) {
        const spinner = ora(`Installing ${name}...`).start();
        await execa(`npm i ${name}`, { cwd: projectDir });
        spinner.succeed(chalk.green(`Successfully installed ${chalk.green.bold(name)}`));
    }
    logger.info("");
};
