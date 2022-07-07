import { DEFAULT_APP_NAME } from "../defaults.js";
import { logger } from "../utils/logger.js";
export const logNextSteps = ({ projectName = DEFAULT_APP_NAME }) => {
    logger.info("Next steps:");
    logger.info(`  cd ${projectName}`);
    logger.info(`  npx prisma db push`);
    logger.info(`  npm run dev`);
};
