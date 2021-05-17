<template>
  <svg class="progress-ring" viewBox="-70,-70,140,140">
    <circle class="progress-ring-circle" :r="r" :stroke-width="stroke"/>
    <path class="progress-ring-ring" :d="path" :stroke-width="stroke"/>
    <!--    <circle class="progress-ring-end" :cx="endX" :cy="endY" r="9"/>-->
    <text alignment-baseline="middle" text-anchor="middle">{{ text }}</text>
  </svg>
</template>

<script>
export default {
  name: "ProgressCircle",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 1,
    },
    text: {
      type: null,
      default: '',
    },
  },
  data() {
    return {
      r: 46,
      stroke: 10
    }
  },
  computed: {
    theta() {
      const frac = (this.value - this.min) / (this.max - this.min) || 0;
      return frac * 2 * Math.PI;
    },
    path() {
      const large = this.theta > Math.PI;
      return `M0,-46 A46,46,0,${large ? 1 : 0},1,${this.endX},${this.endY}`;
    },
    endX() {
      return Math.cos(this.theta - Math.PI * 0.5) * this.r;
    },
    endY() {
      return Math.sin(this.theta - Math.PI * 0.5) * this.r;
    },
  },
}
</script>

<style scoped>
body {
  font-family: sans-serif;
}

.progress-ring {
  width: 30px;
  height: 30px;
}

.progress-ring-circle {
  stroke: rgba(0, 0, 0, 0.1);
  /*stroke-width: 8;*/
  fill: none;
}

.progress-ring-ring {
  stroke: #007fff;
  /*stroke-width: 8;*/
  fill: none;
}

.progress-ring-end {
  fill: #007fff;
}
</style>



