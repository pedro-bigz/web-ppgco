import { Card, CardBody } from "@nextui-org/react";
import { ResponsiveContainer } from "recharts";
import { PieChart } from "../PieChart";

interface ResponsiveChartProps {
  data: any;
  title: string;
}

export function ResponsiveChart({ title, data }: ResponsiveChartProps) {
  return (
    <Card>
      <CardBody>
        <h3 className="text-[#181D11] font-bold">{title}</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart data={data} />
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
