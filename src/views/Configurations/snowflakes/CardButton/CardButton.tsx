import { Button, Tooltip } from "@nextui-org/react";
import classnames from "classnames";
import { useNavigationStore } from "core";

interface CardButtonProps {
  tooltip: string;
  href: string;
  label: string;
  icon: JSX.Element;
  className?: string;
}

export function CardButton({
  tooltip,
  href,
  label,
  icon,
  className,
}: CardButtonProps) {
  const { navigate } = useNavigationStore();
  const goTo = (url: string) => () => navigate(url);

  return (
    <Tooltip content={tooltip} placement="bottom">
      <Button
        onClick={goTo(href)}
        className={classnames(
          "flex text-white shadow-lg h-auto w-[250px]",
          className
        )}
      >
        <div className="flex flex-col items-center justify-center gap-2 h-full px-5 py-6">
          <div>{icon}</div>
          <h3 className="text-xl font-bold">{label}</h3>
        </div>
      </Button>
    </Tooltip>
  );
}
