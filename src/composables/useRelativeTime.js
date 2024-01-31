import { ref } from "vue";
import { useI18n } from "vue-i18n";

export default function useRelativeTime(timestamp) {
  const relativeTimeString = ref("");
  const { t } = useI18n();

  const getTimeUnitAndValue = (diff) => {
    const minutes = Math.floor(diff / 60000); // 1000 * 60
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days) return { value: days, unit: "day" };
    if (hours) return { value: hours, unit: "hour" };
    return { value: minutes, unit: "minute" };
  };

  const updateRelativeTimeString = () => {
    const diff = new Date() - new Date(timestamp);
    const { value, unit } = getTimeUnitAndValue(diff);

    relativeTimeString.value = t(`message.chat.relative_time`, {
      value,
      unit: t(`message.chat.${unit}`),
    });
  };

  updateRelativeTimeString();

  return { relativeTimeString };
}
