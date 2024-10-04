import { axiosMain } from "core";
import { buildParams } from "utils";

export async function countProfessor(params?: URLSearchParams) {
  return axiosMain.get("advisors/count", { params }).then(({ data }) => data);
}

export async function countProfessorByResearchLine() {
  return countProfessor(
    buildParams({
      groupBy: "research_line_id",
      attributes: ["research_line_title"],
    })
  );
}

export async function countStudentsByAdvisor() {
  return axiosMain
    .get("advisors/count-students-by-advisor")
    .then(({ data }) => data);
}
