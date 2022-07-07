import { execa } from "./execCmdAsync";
export const installPackage = async (opts) => {
    const { devMode, projectDir, packages } = opts;
    const flag = devMode ? "-D" : "";
    const fullCmd = `npm ${flag} ${packages.join(" ")}`;
    await execa(fullCmd, { cwd: projectDir });
};
