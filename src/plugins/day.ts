import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";

import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import toObject from "dayjs/plugin/toObject";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import weekday from "dayjs/plugin/weekday";
import isToday from "dayjs/plugin/isToday";
import CustomParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(duration);
dayjs.extend(toObject);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.extend(isToday);
dayjs.extend(CustomParseFormat);

dayjs.tz.setDefault("America/New_York");

const day = dayjs;
export default day;
