import chalk from "chalk";
import ora from "ora";
import { execa } from "../utils/execCmdAsync";
import { logger } from "../utils/logger.js";
export const installPackages = async ({ projectDir, packages, }) => {
    logger.info('Installing packages...');
    console.log({ test: true, packages });
    for (const [name] of packages) {
        const spinner = ora(`Installing ${name}...`).start();
        await execa(`npm i ${name}`);
        spinner.succeed(chalk.green(`Successfully installed ${chalk.green.bold(name)}`));
    }
    logger.info("");
};
