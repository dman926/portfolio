<script lang="ts">
  import type {
    ChartType,
    ChartData,
    ChartOptions,
    DefaultDataPoint,
    Plugin,
    BasePlatform,
  } from "chart.js/auto";
  import Chart from "chart.js/auto";
  import { onMount } from "svelte";

  interface $$Props<
    TType extends ChartType = ChartType,
    TData = DefaultDataPoint<TType>,
    TLabel = unknown,
  > {
    type: TType;
    data: ChartData<TType, TData, TLabel>;
    options?: ChartOptions<TType> | undefined;
    plugins?: Plugin<TType>[] | undefined;
    platform?: typeof BasePlatform;
  }

  export let type: $$Props["type"];
  export let data: $$Props["data"];
  export let options: $$Props["options"] = undefined;
  export let plugins: $$Props["plugins"] = undefined;
  export let platform: $$Props["platform"] = undefined;

  let canvas: HTMLCanvasElement;

  onMount(() => {
    new Chart(canvas, {
      type,
      data,
      options,
      plugins,
      platform,
    });
  });
</script>

<div>
  <canvas bind:this={canvas}></canvas>
</div>
