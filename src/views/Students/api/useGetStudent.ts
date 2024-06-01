import { useApiQuery } from "hooks";

export interface UseGetStudentParams {
  studentId?: string;
}

export const useGetStudent = (studentId?: string) => {
  return useApiQuery({
    endpoint: "/student/" + studentId,
    options: { enabled: Boolean(studentId) },
    queryKey: ["student", String(studentId)],
  });
};
