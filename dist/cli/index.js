import chalk from "chalk";
import { Command } from "commander";
import { DEFAULT_APP_NAME } from "../defaults.js";
import { getVersion } from "../utils/getVersion.js";
import { logger } from "../utils/logger.js";
import inquirer from 'inquirer';
import { validateAppName } from "../utils/validateName.js";
import { validPackages } from "../helpers/createProject.js";
const defaultOpts = {
    appName: DEFAULT_APP_NAME,
    packages: []
};
export const runCli = async () => {
    const cliResult = defaultOpts;
    const program = new Command().name('create-aqua-app');
    program
        .description('Create a new application with the aqua stack')
        .argument("[dir]", "The name of the application + directory where the app gets created")
        .version(getVersion(), '-v, --version', 'View the current version')
        .addHelpText("afterAll", `\n The aqua stack is the starter code for every application made by
            ${chalk.hex("#6E92E9").bold("@AquaHubStudio")} \n`)
        .parse(process.argv);
    const [providedAppName] = program.args;
    if (providedAppName) {
        cliResult.appName = providedAppName;
    }
    try {
        if (!providedAppName) {
            const { appName } = await inquirer.prompt({
                name: "appName",
                type: "input",
                message: "How do you want your app to be called?",
                default: defaultOpts.appName,
                validate: validateAppName,
                transformer: (input) => {
                    return input.trim();
                },
            });
            cliResult.appName = appName;
        }
        const { packages } = await inquirer.prompt({
            name: "packages",
            type: "checkbox",
            message: "Which packages would you like to be installed already?",
            choices: validPackages.map((pkgName) => ({
                name: pkgName,
                checked: false,
            })),
        });
        cliResult.packages = packages;
        logger.success('Alright. Your application is getting created! Please wait one moment');
    }
    catch (err) {
        if (err instanceof Error && err.isTTYError) {
            logger.warn(`create-aqua-app needs an interactive terminal to provide options`);
        }
        else {
            throw err;
        }
    }
    return cliResult;
};
