import { useQuery } from "@tanstack/react-query";
import _sumBy from "lodash/sumBy";

import {
  countProfessor,
  countStudentsByAdvisor,
  countProfessorByResearchLine,
} from "services";
import { Fieldset, Table, TableRowInterface } from "components";
import { GenericFunction, randomicCreateColorList } from "utils";
import { CirclePersonIcon } from "assets";
import { CardList } from "../CardList";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { ResponsiveChart } from "../ResponsiveChart";
import { colors } from "views/Dashboard/Dashboard.constants";

type ApiFunctionsInterface =
  | "countProfessor"
  | "countStudentsByAdvisor"
  | "countProfessorByResearchLine";

const apiFunctions: Record<ApiFunctionsInterface, GenericFunction> = {
  countProfessor,
  countStudentsByAdvisor,
  countProfessorByResearchLine,
};

function getApiData(key: ApiFunctionsInterface) {
  const api = apiFunctions[key];
  return useQuery({ queryFn: () => api(), queryKey: [key] });
}

export function ProfessorData() {
  const { data: countProfessorData, isLoading: isLoadingTotalProfessor } =
    getApiData("countProfessor");
  const {
    data: totalProfessorByResearchLine = [],
    isLoading: isLoadingTotalProfessorByResearchLine,
  } = getApiData("countProfessorByResearchLine");
  const {
    data: totalStudentsByAdvisor = [],
    isLoading: isLoadingTotalStudentsByAdvisor,
  } = getApiData("countStudentsByAdvisor");

  const [totalStudents] = countProfessorData ?? [];

  const averageByResearchLine =
    _sumBy(totalProfessorByResearchLine, "value") /
    totalProfessorByResearchLine.length;

  // const researchLineColors = randomicCreateColorList(
  //   totalProfessorByResearchLine.length,
  //   colors
  // );

  return (
    <Fieldset
      legend={
        <h3 className="text-[#181D11] text-xl font-extrabold leading-[normal] whitespace-nowrap">
          Professores
        </h3>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="grid md:grid-cols-2 gap-3">
          <CardList
            title="Total"
            icon={CirclePersonIcon}
            iconProps={{ backgroundColor: "#6A0000" }}
            items={[
              {
                title: "Total",
                value: totalStudents?.value,
                isLoading: isLoadingTotalProfessor,
              },
              {
                title: "Média Por Linha de Pesquisa",
                value: averageByResearchLine.toFixed(2),
                isLoading: isLoadingTotalProfessorByResearchLine,
              },
            ]}
          />
          <CardList
            title="Por Linha de Pesquisa"
            icon={CirclePersonIcon}
            iconProps={{ backgroundColor: "#903333" }}
            items={totalProfessorByResearchLine.map((item: any) => ({
              title: item.research_line_title,
              value: item.value,
              isLoading: isLoadingTotalProfessorByResearchLine,
            }))}
          />
        </div>
        <div className="flex grid grid-cols-3 gap-3">
          <ResponsiveChart
            title="Por Curso"
            data={totalProfessorByResearchLine.map(
              (item: any, index: number) => ({
                name: item.research_line_title,
                value: item.value,
                fill: colors[index],
              })
            )}
          />
        </div>
        <Card>
          <CardHeader className="pb-0 px-5">
            <h3 className="text-[#181D11] text-lg font-extrabold leading-[normal] whitespace-nowrap">
              Professores com orientandos
            </h3>
          </CardHeader>
          <CardBody>
            <Table
              rowKey="id"
              rows={totalStudentsByAdvisor as TableRowInterface[]}
              columns={[
                { key: "id", label: "ID" },
                { key: "advisor_name", label: "Professor" },
                { key: "research_line_title", label: "Linha de Pesquisa" },
                { key: "students_counting", label: "Nº de Orientandos" },
              ]}
              isLoading={isLoadingTotalStudentsByAdvisor}
            />
          </CardBody>
        </Card>
      </div>
    </Fieldset>
  );
}
