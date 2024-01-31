import { computed, ref } from "vue";
import { TimeframeDates } from "@/types/entities";

const formattedDateLocale = ref<string>(
  localStorage.getItem("user-locale") === "no" ? "nb-NO" : "en-US",
);

export function setFormattedDateLocale(locale: "no" | "other"): void {
  formattedDateLocale.value = locale === "no" ? "nb-NO" : "en-US";
}

export function useFormattedDate(timeframeDates: TimeframeDates) {
  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString(formattedDateLocale.value, {
      month: "short",
      day: "numeric",
    });
  };

  const formattedDate = computed(() => {
    const currentYear = new Date().getFullYear().toString();
    const startYear = timeframeDates.startDate.slice(0, 4);
    const endYear = timeframeDates.endDate.slice(0, 4);
  
    if (startYear === endYear && currentYear === endYear) {
      return `${formatDate(timeframeDates.startDate)} - ${formatDate(timeframeDates.endDate)}`;
    }
    return `${timeframeDates.startDate} - ${timeframeDates.endDate}`;
  });

  return { formattedDate };
}
