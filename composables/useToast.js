// composables/useToast.js
import { useToast } from 'primevue/usetoast';

export const useCustomToast = () => {
  const toast = useToast();
  const { t } = useI18n();
  const showToast = (severity, detail, life = 3000) => {
    toast.add({ severity, summary: t('notification'), detail, life });
  };

  return { showToast };
};
