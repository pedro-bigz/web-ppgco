import { ProfileDrowdown } from "./snowflakes";
import { currentUser } from "services";

export function TopBar() {
  const user = currentUser();

  return (
    <div className="flex justify-between items-center bg-background drop-shadow top-0 z-40 px-[42px] py-[17px] gap-8">
      <div className="w-[500px] max-w-full">
        {/* <UncontrolledTextField size="md" placeholder="Pesquisar no histórico" /> */}
      </div>
      <ProfileDrowdown
        user={{
          name: user?.name ?? "",
          description: user?.email ?? "",
        }}
      />
    </div>
  );
}
