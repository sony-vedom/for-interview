export enum Meta {
  INITIAL = "initial", // Process not started
  LOADING = "loading", // first load
  FETCHING = "fetching", // repeated load
  SAVING = "saving",
  DELETING = "deleting",
  EDITING = "editing",
  ERROR = "error", // Finish with errors
  SUCCESS = "success", // Finish success
}
