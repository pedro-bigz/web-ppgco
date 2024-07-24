import { useApiQuery } from "core";

export function useGetCourse(courseId: string | number) {
  return useApiQuery({
    endpoint: "courses/" + courseId,
    queryKey: ["courses/" + courseId],
  });
}
