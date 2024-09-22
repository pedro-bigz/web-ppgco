import { axiosMain } from "core";
import { buildParams } from "utils";

export async function countStudents(params?: URLSearchParams) {
  return axiosMain.get("students/count", { params }).then(({ data }) => data);
}

export async function countStudentsByCourse() {
  return countStudents(
    buildParams({
      groupBy: "project.course_id",
    })
  );
}

export async function countStudentsByResearchLine() {
  return countStudents(
    new URLSearchParams({
      groupBy: "project.research_line_id",
    })
  );
}

export async function countStudentsByProfessor() {
  return countStudents(
    new URLSearchParams({
      groupBy: "project.advisor_id",
    })
  );
}

export async function countStudentsByLateMilestones() {
  return countStudents(
    new URLSearchParams({
      groupBy: "project.advisor_id",
    })
  );
}
