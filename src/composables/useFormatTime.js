import { ref } from "vue";

export default function useFormatTime(timestamp) {
  const deviceLocale = navigator.language;

  const timeFormatter = ref(
    new Intl.DateTimeFormat(deviceLocale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  );

  const dateFormatter = ref(
    new Intl.DateTimeFormat(deviceLocale, {
      month: "short",
      day: "2-digit",
    }),
  );

  const millisInDay = 86400000; //1000 * 60 * 60 * 24

  function formatTime() {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / millisInDay);

    const timeString = timeFormatter.value.format(date);
    const dateString = dateFormatter.value.format(date);

    if (diffInDays === 0) return timeString;
    if (diffInDays < 7)
      return `${date.toLocaleString(deviceLocale, {
        weekday: "short",
      })} ${timeString}`;

    return `${dateString} ${timeString}`;
  }

  return { formatTime };
}
