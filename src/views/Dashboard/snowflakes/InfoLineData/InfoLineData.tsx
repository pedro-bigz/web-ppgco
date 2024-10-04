import { Skeleton } from "@nextui-org/react";
import { GenericIconDefinition, Icon } from "components";

export interface InfoLineDataProps {
  icon?: GenericIconDefinition;
  title: string;
  isLoading: boolean;
  value: JSX.Element | string;
}

export function InfoLineData({
  icon,
  title,
  value,
  isLoading,
}: InfoLineDataProps) {
  if (isLoading) {
    return (
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
    );
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-row w-full justify-between">
        <span className="flex gap-2 items-center leading-none text-[#6A6E71] text-capitalize font-bold text-sm">
          {icon && <Icon icon={icon} />} {title}
        </span>
        <span className="text-black text-right leading-trim text-capitalize font-nexa font-bold text-sm">
          {value}
        </span>
      </div>
    </div>
  );
}
