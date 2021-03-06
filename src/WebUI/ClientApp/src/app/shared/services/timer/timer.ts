export const defaultTime: string = "00:00:00";

export class Time {
  hours: number;
  minutes: number;
  seconds: number;

  constructor(timeString: string) {
    const timeArray = timeString.split(":");

    this.hours = parseInt(timeArray[0]),
      this.minutes = parseInt(timeArray[1]),
      this.seconds = parseInt(timeArray[2])
  }
}

export function timeToHHMMSS(time: Time): string {
  const totalSeconds: number = calcTotalSeconds(time.hours, time.minutes, time.seconds);
  return toHHMMSS(totalSeconds);
}

export function calcTotalSeconds(hours: number, minutes: number, seconds: number): number {
  let o_totalSeconds: number = 0;

  o_totalSeconds += hours * 3600;
  o_totalSeconds += minutes * 60;
  o_totalSeconds += seconds;

  return o_totalSeconds;
}

function toHHMMSS(secs) {
  const sec_num = parseInt(secs, 10);
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor(sec_num / 60) % 60;
  const seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map(v => v < 10 ? "0" + v : v)
    .join(":");
}
