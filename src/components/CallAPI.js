import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: []
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: 'PSI Twenty Four Hourly (By Region)'
        },
        responsive: true,
        maintainAspectRatio: false
      },
      allColours: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#f6a95e"]
    }
  },
  methods: {
    fetchItems: function () {
      axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
      .then(response => {
        let metadata = response.data.region_metadata
        let i = 0;

        //  add labels
        metadata.forEach((region) => {
          this.datacollection.datasets.push({
            data:[], 
            label: region.name, 
            borderColor: this.allColours[i],
            fill: false
          });
          i++;
        });
        
        let allReadings = response.data.items
        allReadings.forEach((h_reading) => {
          // Add timestamps as labels
          this.datacollection.labels.push(h_reading.timestamp)
          
          // Add psi readings
          this.datacollection.datasets.forEach((dataset) => {
              dataset.data.push(h_reading.readings.psi_twenty_four_hourly[dataset.label]);
          });
        });
        this.renderChart(this.datacollection, this.options);
      });
    }
  },
  created () {
    this.fetchItems();
  },
  mounted() {
    
  }
}