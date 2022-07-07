import path from "path";
import { installPackages } from "./installPackages.js";
import { scaffoldProject } from "./scaffoldProject.js";
export const validPackages = [
    "zustand",
    "zod"
];
export const createProject = async ({ projectName, packages, }) => {
    const projectDir = path.resolve(process.cwd(), projectName);
    await scaffoldProject({ projectName, projectDir });
    await installPackages({ projectDir, packages });
    return projectDir;
};
