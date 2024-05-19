import { ListingHeader, ListingBody } from "components";

export function StudentsListingPage() {
  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "teste",
      label: "TESTE",
    },
    {
      key: "teste2",
      label: "TESTE2",
    },
    {
      key: "teste3",
      label: "TESTE3",
    },
    {
      key: "teste4",
      label: "TESTE4",
    },
  ];

  return (
    <div>
      <ListingHeader title="Alunos" />

      <ListingBody
        endpoint=""
        columns={columns}
        actions={[
          {
            label: "teste",
            onClick: (...args: any[]) => console.log("action teste", ...args),
          },
        ]}
      />
    </div>
  );
}
