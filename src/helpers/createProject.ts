import path from "path";
import { installPackages } from "./installPackages.js";
import { scaffoldProject } from "./scaffoldProject.js";

export const validPackages = [
    "zustand",
    "zod"
] as const;

export type ValidPackages = typeof validPackages[number]

interface CreateProjectOptions {
  projectName: string;
  packages: ValidPackages[];
}

export const createProject = async ({
  projectName,
  packages,
}: CreateProjectOptions) => {
  const projectDir = path.resolve(process.cwd(), projectName);

  // Bootstraps the base Next.js application
  await scaffoldProject({ projectName, projectDir });

  // Install the selected packages
  await installPackages({ projectDir, packages });

  return projectDir;
};