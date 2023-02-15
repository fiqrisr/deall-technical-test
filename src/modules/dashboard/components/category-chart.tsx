import { LoadingOverlay } from "@mantine/core";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useProducts } from "../hooks/use-products";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Category",
    },
  },
};

export const CategoryChart = ({ isLoading }: { isLoading: boolean }) => {
  const { categoryDataset } = useProducts();

  const data = {
    labels: Object.keys(categoryDataset),
    datasets: [
      {
        label: "",
        data: Object.values(categoryDataset),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isLoading} />
      <Bar options={options} data={data} />;
    </div>
  );
};
