import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { InfoLineData } from "../InfoLineData";
import { GenericIconDefinition, Icon } from "components";

export interface CardItemProps {
  title: string;
  value: any;
  isLoading: boolean;
}

export interface CardListProps {
  icon: GenericIconDefinition;
  iconProps?: any;
  title: string;
  items: CardItemProps[];
}

export function CardList({ icon, iconProps, title, items }: CardListProps) {
  return (
    <Card className="p-3">
      <CardHeader>
        <h3 className="text-[#181D11] text-lg font-bold">
          <span className="flex items-center gap-2">
            <Icon icon={icon} iconProps={iconProps} /> {title}
          </span>
        </h3>
      </CardHeader>
      <CardBody>
        <div>
          <div className="flex flex-col gap-3 h-fit">
            {items.map((item, index) => (
              <div key={index}>
                <InfoLineData
                  title={item.title}
                  value={item.value}
                  isLoading={item.isLoading}
                />
                {index < items.length - 1 && <hr />}
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
