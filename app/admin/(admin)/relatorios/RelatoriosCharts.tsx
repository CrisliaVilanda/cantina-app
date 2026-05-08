"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Props = {
  vendasPorDia: {
    data: string;
    total: number;
  }[];

  categoriasData: {
    name: string;
    value: number;
  }[];
};

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#ca8a04",
  "#9333ea",
];

export default function RelatoriosCharts({
  vendasPorDia,
  categoriasData,
}: Props) {
  return (
    <div className="space-y-8">

      {/* GRÁFICO DE VENDAS */}
      <div className="bg-card border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">
          Vendas por dia
        </h2>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={vendasPorDia}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="data" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="total"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PIZZA DE CATEGORIAS */}
      <div className="bg-card border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">
          Categorias mais vendidas
        </h2>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoriasData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {categoriasData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}