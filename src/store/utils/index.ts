export const getFab = (root: { $store: { state: { configs: { fab: boolean; }; }; }; }):boolean => (
  root &&
  root.$store &&
  root.$store.state &&
  root.$store.state.configs &&
  root.$store.state.configs.fab
    ? root.$store.state.configs.fab
    : false
)

export const getDense = (root: { $store: { state: { configs: { dense: boolean; }; }; }; }):boolean => (
  root &&
  root.$store &&
  root.$store.state &&
  root.$store.state.configs &&
  root.$store.state.configs.dense
    ? root.$store.state.configs.dense
    : false
)
