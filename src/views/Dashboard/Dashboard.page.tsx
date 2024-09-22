import { Card, CardBody, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import {
  countStudents,
  countStudentsByCourse,
  countStudentsByLateMilestones,
  countStudentsByProfessor,
  countStudentsByResearchLine,
} from "services";
import { GenericFunction } from "utils";

interface DashboardCard {
  title: string;
  value?: string | number;
  isLoading: boolean;
  children: JSX.Element;
}

type ApiFunctionsInterface =
  | "countStudents"
  | "countStudentsByCourse"
  | "countStudentsByLateMilestones"
  | "countStudentsByProfessor"
  | "countStudentsByResearchLine";

const apiFunctions: Record<ApiFunctionsInterface, GenericFunction> = {
  countStudents,
  countStudentsByCourse,
  countStudentsByLateMilestones,
  countStudentsByProfessor,
  countStudentsByResearchLine,
};

function getApiData(key: ApiFunctionsInterface) {
  const api = apiFunctions[key];
  return useQuery({ queryFn: () => api(), queryKey: [key] });
}

function DashboardCard({ title, children, isLoading }: DashboardCard) {
  if (isLoading) {
    return (
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
    );
  }

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col justify-between px-3">
          <div className="font-regular font-montserrat text-xl">{title}</div>
          {children ? (
            <div className="flex justify-end text-5xl font-black">
              {children}
            </div>
          ) : (
            <div className="flex justify-end text-5xl">-</div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export function DashboardPage() {
  const { data: totalStudents, isLoading: isLoadingTotalStudents } =
    getApiData("countStudents");
  const {
    data: totalStudentsByCourse,
    isLoading: isLoadingTotalStudentsByCourse,
    error,
  } = getApiData("countStudentsByCourse");
  console.log({ error });
  // const {
  //   data: totalStudentsByResearchLine,
  //   isLoading: isLoadingTotalStudentsByResearchLine,
  // } = getApiData("countStudentsByResearchLine");
  // const {
  //   data: totalStudentsByProfessor,
  //   isLoading: isLoadingTotalStudentsByProfessor,
  // } = getApiData("countStudentsByProfessor");
  // const {
  //   data: totalStudentsByLateMilestones,
  //   isLoading: isLoadingTotalStudentsByLateMilestones,
  // } = getApiData("countStudentsByLateMilestones");

  console.table({ totalStudentsByCourse });
  console.log({ isLoadingTotalStudentsByCourse });

  // console.table({ totalStudentsByResearchLine });
  // console.log({ isLoadingTotalStudentsByResearchLine });

  // console.table(totalStudentsByResearchLine);
  // console.log(isLoadingTotalStudentsByResearchLine);

  // console.table(totalStudentsByProfessor);
  // console.log(isLoadingTotalStudentsByProfessor);

  // console.table(totalStudentsByLateMilestones);
  // console.log(isLoadingTotalStudentsByLateMilestones);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <DashboardCard
          title="Total de Alunos"
          isLoading={isLoadingTotalStudents}
        >
          {totalStudents}
        </DashboardCard>
        <DashboardCard
          title="Total de Alunos Por Curso"
          isLoading={isLoadingTotalStudentsByCourse}
        >
          {totalStudentsByCourse}
        </DashboardCard>
        {/* <DashboardCard
          title="Total de Alunos Por Linha de Pesquisa"
          value={totalStudentsByResearchLine}
          isLoading={isLoadingTotalStudentsByResearchLine}
        />
        <DashboardCard
          title="Total de Alunos Por Professor"
          value={totalStudentsByProfessor}
          isLoading={isLoadingTotalStudentsByProfessor}
        />
        <DashboardCard
          title="Total de Alunos Com Marcos Atrasados"
          value={totalStudentsByLateMilestones}
          isLoading={isLoadingTotalStudentsByLateMilestones}
        /> */}
      </div>
    </div>
  );
}
