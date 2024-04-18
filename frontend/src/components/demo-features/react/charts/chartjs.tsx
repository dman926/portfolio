import type {
  ChartType,
  ChartData,
  ChartOptions,
  DefaultDataPoint,
  Plugin,
  BasePlatform,
} from "chart.js/auto";
import ChartJS from "chart.js/auto";
import { useEffect, useRef } from "react";

export interface ChartProps<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown
> {
  type: TType;
  data: ChartData<TType, TData, TLabel>;
  options?: ChartOptions<TType> | undefined;
  plugins?: Plugin<TType>[] | undefined;
  platform?: typeof BasePlatform;
}

export function Chart(chartjsProps: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      new ChartJS(canvasRef.current, chartjsProps);
    }
  }, [chartjsProps]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default Chart;
