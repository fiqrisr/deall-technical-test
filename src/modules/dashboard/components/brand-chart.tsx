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
  indexAxis: "y" as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Brand",
    },
  },
};

export const BrandChart = ({ isLoading }: { isLoading: boolean }) => {
  const { brandDataset } = useProducts();

  const data = {
    labels: Object.keys(brandDataset),
    datasets: [
      {
        label: "",
        data: Object.values(brandDataset),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div style={{ position: "relative", marginBottom: "36px" }}>
      <LoadingOverlay visible={isLoading} />
      <Bar options={options} data={data} height={1200} />
    </div>
  );
};
