import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import timezone from "dayjs/plugin/timezone";
import isLeapYear from "dayjs/plugin/isLeapYear";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import objectSupport from "dayjs/plugin/objectSupport";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";

dayjs.extend(isoWeek);
dayjs.extend(timezone);
dayjs.extend(isLeapYear);
dayjs.extend(isSameOrBefore);
dayjs.extend(objectSupport);
dayjs.extend(customParseFormat);
dayjs.locale("pt-br");

export { dayjs };
