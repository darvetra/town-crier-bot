import dayjs from "dayjs";
import {europeMoscow} from './const.js';

import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc)
dayjs.extend(timezone)

// Дата
export const dayjsLocalMoscow = (date) => dayjs(date).tz(europeMoscow)

export const humanizeDate = (date) => dayjs(date).format('DD.MM.YYYY HH:MM');
