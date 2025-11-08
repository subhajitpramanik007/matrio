import cron from "node-cron";

const ROOM_CLEAN_CRON_EXPRESSION = "* * * * *";

export function roomCleaningCronJob(func: () => void, name: string) {
  cron.schedule(ROOM_CLEAN_CRON_EXPRESSION, func, {
    name: name,
  });
}
