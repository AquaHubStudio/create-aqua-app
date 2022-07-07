import { execa } from "./execCmdAsync";

type InstallOpts = {
    devMode?: boolean;
    projectDir: string;
    packages: string[];
}

export const installPackage = async (opts: InstallOpts) => {
    const { devMode, projectDir, packages } = opts

    const flag = devMode ? "-D" : "";
    const fullCmd = `npm ${flag} ${packages.join(" ")}`;
    await execa(fullCmd, { cwd: projectDir });
}