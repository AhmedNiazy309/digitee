// composables/useCountries.js
export function useCountries() {
  const selectedId = ref(null);
  const { data: countries , execute , error} = useApiFetch("countries");

  // Set selectedId once countries data is loaded
  watchEffect(() => {
    if (countries.value?.data) {
      selectedId.value =
        countries.value.data.length > 4 ? countries.value.data[4] : null;
    }
  });

  return { countries, selectedId , execute , error};
}
