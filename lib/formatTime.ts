import format from 'format-duration';

export function convertNumberToTime(timeInSeconds: number) {
  return format(timeInSeconds * 1000);
}

export function timeAgo(date: Date) {
  const now = new Date() as unknown as number;
  const seconds = Math.floor((now - (date as unknown as number)) / 1000);
  let interval = Math.floor(seconds / 2592000);

  if (interval > 1) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes ago`;
  }

  return `${Math.floor(seconds)} seconds ago`;
}
