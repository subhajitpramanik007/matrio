/*
 * Room clean up cron interval expression -> every 5 minutes
 */
export const ROOM_CLEAN_CRON_INTERVAL = '*/5 * * * *'

/*
 * Room clean up cron job name
 */
export const ROOM_CLEAN_CRON_JOB_NAME = 'Room Clean Cron Job'

/*
 * Maximum age of a room in milliseconds
 */
export const MAX_ROOM_AGE = 5 * 60 * 1000

/*
 * Maximum game duration in milliseconds
 */
export const MAX_GAME_DURATION = 30 * 60 * 1000

/*
 * Maximum match making time in milliseconds
 */
export const MAX_MATCH_MAKING_TIME = 2 * 60 * 1000
