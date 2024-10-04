import { axiosMain } from "core";
import { buildParams } from "utils";

export async function countStudents(params?: URLSearchParams) {
  return axiosMain.get("students/count", { params }).then(({ data }) => data);
}

export async function countStudentsWithLateMilestonesByCourse() {
  return axiosMain
    .get("students/count-with-late-milestones-by-course")
    .then(({ data }) => data);
}

export async function countStudentsByCourse() {
  return countStudents(
    buildParams({
      groupBy: "course_id",
      attributes: ["course_name"],
    })
  );
}

export async function countStudentsByResearchLine() {
  return countStudents(
    buildParams({
      groupBy: "research_line_id",
      attributes: ["research_line_title"],
    })
  );
}

export async function countStudentsByProfessor() {
  return countStudents(
    buildParams({
      groupBy: "advisor_id",
      attributes: "advisor_name",
    })
  );
}
