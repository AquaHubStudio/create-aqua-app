import path from "path";
import { installPackages } from "./installPackages";
import { scaffoldProject } from "./scaffoldProject";
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
