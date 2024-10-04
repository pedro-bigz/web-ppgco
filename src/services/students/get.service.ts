import { axiosMain } from "core";

export async function getStudentsWithLateMilestones() {
  return axiosMain
    .get("students/get-with-late-milestones")
    .then(({ data }) => data);
}
