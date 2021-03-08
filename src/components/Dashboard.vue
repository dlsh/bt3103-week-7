<template>
    <div>
        <navbar></navbar>
        <h1>Bar Chart</h1>
        <bar-chart></bar-chart>
        <h1>Line Chart</h1>
        <line-chart></line-chart>
    </div>
</template>

<script>
import BarChart from './BarChart.vue'
import NavBar from './NavBar.vue'
import LineChart from './CallAPI.vue'
export default {
    components: {
        'bar-chart': BarChart,
        'navbar': NavBar,
        'line-chart': LineChart
    }
}
</script>

<style scoped>
    h1 {
        background-color: rgb(62, 171, 235);
        padding: 20px;
        color: white;
        font-size: 40px;
    }
</style>