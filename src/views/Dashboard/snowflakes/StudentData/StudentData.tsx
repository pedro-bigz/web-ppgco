import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import _sumBy from "lodash/sumBy";

import {
  countStudents,
  countStudentsByCourse,
  countStudentsWithLateMilestonesByCourse,
  countStudentsByProfessor,
  countStudentsByResearchLine,
  getStudentsWithLateMilestones,
} from "services";
import { Fieldset, Table, TableRowInterface } from "components";
import { GenericFunction, randomicCreateColorList } from "utils";
import { CirclePersonIcon } from "assets";
import { CardList } from "../CardList";
import { ResponsiveChart } from "../ResponsiveChart";
import {
  bluePalette,
  greenPalette,
  purplePalette,
  redPalette,
} from "views/Dashboard/Dashboard.constants";

type ApiFunctionsInterface =
  | "countStudents"
  | "countStudentsByCourse"
  | "countStudentsWithLateMilestonesByCourse"
  | "countStudentsByProfessor"
  | "countStudentsByResearchLine"
  | "getStudentsWithLateMilestones";

const apiFunctions: Record<ApiFunctionsInterface, GenericFunction> = {
  countStudents,
  countStudentsByCourse,
  countStudentsWithLateMilestonesByCourse,
  countStudentsByProfessor,
  countStudentsByResearchLine,
  getStudentsWithLateMilestones,
};

function getApiData(key: ApiFunctionsInterface) {
  const api = apiFunctions[key];
  return useQuery({ queryFn: () => api(), queryKey: [key] });
}

export function StudentData() {
  const { data: countStudentData, isLoading: isLoadingTotalStudents } =
    getApiData("countStudents");
  const {
    data: totalStudentsByCourse = [],
    isLoading: isLoadingTotalStudentsByCourse,
  } = getApiData("countStudentsByCourse");
  const {
    data: totalStudentsByResearchLine = [],
    isLoading: isLoadingTotalStudentsByResearchLine,
  } = getApiData("countStudentsByResearchLine");
  const {
    data: totalStudentsByProfessor = [],
    isLoading: isLoadingTotalStudentsByProfessor,
  } = getApiData("countStudentsByProfessor");
  const {
    data: totalStudentsWithLateMilestonesByCourse = [],
    isLoading: isLoadingTotalStudentsWithLateMilestonesByCourse,
  } = getApiData("countStudentsWithLateMilestonesByCourse");
  const {
    data: studentsWithLateMilestones = [],
    isLoading: isLoadingStudentsWithLateMilestones,
  } = getApiData("getStudentsWithLateMilestones");

  const [totalStudents] = countStudentData ?? [];

  const averageByCourse =
    _sumBy(totalStudentsByCourse, "value") / totalStudentsByCourse.length;

  const courseColors = randomicCreateColorList(
    totalStudentsByCourse.length,
    redPalette
  );
  const researchLineColors = randomicCreateColorList(
    totalStudentsByResearchLine.length,
    bluePalette
  );
  const professorColors = randomicCreateColorList(
    totalStudentsByProfessor.length,
    greenPalette
  );
  const lateMilestonesByCourseColors = randomicCreateColorList(
    totalStudentsByProfessor.length,
    purplePalette
  );

  return (
    <Fieldset
      legend={
        <h3 className="text-[#181D11] text-xl font-extrabold leading-[normal] whitespace-nowrap">
          Estudantes
        </h3>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <CardList
            title="Total"
            icon={CirclePersonIcon}
            iconProps={{ backgroundColor: "#0A1037" }}
            items={[
              {
                title: "Total",
                value: totalStudents?.value,
                isLoading: isLoadingTotalStudents,
              },
              {
                title: "Média Por Curso",
                value: averageByCourse.toFixed(2),
                isLoading: isLoadingTotalStudentsByCourse,
              },
            ]}
          />
          <CardList
            title="Por Curso"
            icon={CirclePersonIcon}
            iconProps={{ backgroundColor: "#2F355D" }}
            items={totalStudentsByCourse.map((item: any) => ({
              title: item.course_name,
              value: item.value,
              isLoading: isLoadingTotalStudentsByCourse,
            }))}
          />
          <CardList
            title="Por Orientador"
            icon={CirclePersonIcon}
            iconProps={{ backgroundColor: "#474D76" }}
            items={totalStudentsByProfessor.map((item: any) => ({
              title: item.advisor_name,
              value: item.value,
              isLoading: isLoadingTotalStudentsByProfessor,
            }))}
          />
          <CardList
            title="Por Linha de Pesquisa"
            icon={CirclePersonIcon}
            iconProps={{ backgroundColor: "#595F89" }}
            items={totalStudentsByResearchLine.map((item: any) => ({
              title: item.research_line_title,
              value: item.value,
              isLoading: isLoadingTotalStudentsByResearchLine,
            }))}
          />
          <CardList
            title="Com Marcos Atrasados"
            icon={CirclePersonIcon}
            iconProps={{ backgroundColor: "#CBD2FF" }}
            items={totalStudentsWithLateMilestonesByCourse.map((item: any) => ({
              title: item.course_name,
              value: item.value,
              isLoading: isLoadingTotalStudentsWithLateMilestonesByCourse,
            }))}
          />
        </div>
        <div className="flex grid grid-cols-3 gap-3">
          <ResponsiveChart
            title="Por Curso"
            data={totalStudentsByCourse.map((item: any, index: number) => ({
              name: item.course_name,
              value: item.value,
              fill: courseColors[index],
            }))}
          />
          <ResponsiveChart
            title="Por Orientador"
            data={totalStudentsByProfessor.map((item: any, index: number) => ({
              name: item.advisor_name,
              value: item.value,
              fill: professorColors[index],
            }))}
          />
          <ResponsiveChart
            title="Por Linha de Pesquisa"
            data={totalStudentsByResearchLine.map(
              (item: any, index: number) => ({
                name: item.research_line_title,
                value: item.value,
                fill: researchLineColors[index],
              })
            )}
          />
          <ResponsiveChart
            title="Com Marcos Atrasados"
            data={totalStudentsWithLateMilestonesByCourse.map(
              (item: any, index: number) => ({
                name: item.course_name,
                value: item.value,
                fill: lateMilestonesByCourseColors[index],
              })
            )}
          />
        </div>
        <Card>
          <CardHeader className="pb-0 px-5">
            <h3 className="text-[#181D11] text-lg font-extrabold leading-[normal] whitespace-nowrap">
              Estudantes com Marcos atrasados
            </h3>
          </CardHeader>
          <CardBody>
            <Table
              rowKey="id"
              rows={studentsWithLateMilestones as TableRowInterface[]}
              columns={[
                { key: "id", label: "ID" },
                { key: "student_name", label: "Estudante" },
                { key: "course_name", label: "Curso" },
                {
                  key: "late_milestones_counting",
                  label: "Nº de Marcos atrasados",
                },
              ]}
              isLoading={isLoadingStudentsWithLateMilestones}
            />
          </CardBody>
        </Card>
      </div>
    </Fieldset>
  );
}
