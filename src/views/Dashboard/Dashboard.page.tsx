import _sumBy from "lodash/sumBy";
import { ProfessorData, StudentData } from "./snowflakes";

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[#181D11] text-3xl font-extrabold leading-[normal] whitespace-nowrap">
        Dashboard
      </h3>
      <StudentData />
      <ProfessorData />
    </div>
  );
}
