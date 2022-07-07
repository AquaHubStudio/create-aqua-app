import { DEFAULT_APP_NAME } from "../defaults.js";
import { logger } from "../utils/logger.js";
import { InstallerOptions } from "./scaffoldProject.js";

// This logs the next steps that the user should take in order to advance the project
export const logNextSteps = ({
  projectName = DEFAULT_APP_NAME
}: Pick<InstallerOptions, "projectName" | "packages">) => {
  logger.info("Next steps:");
  logger.info(`  cd ${projectName}`);

    logger.info(
        `  npx prisma db push`,
    );

  logger.info(`  npm run dev`);
};