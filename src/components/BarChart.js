import { Bar } from 'vue-chartjs'
import database from '../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Number of dishes",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#f5f5dc"],
                data: []
            }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.docs.forEach(doc => { 

            // add labels for first doc only
            if (this.datacollection.labels.length == 0) {
                for (let key in doc.data()) {
                    this.datacollection.labels.push(doc.data()[key].name);
                }
            }
            // initialise values in array
            if (this.datacollection.datasets[0].data.length == 0) {
                for (let key in doc.data()) {
                    this.datacollection.datasets[0].data.push(doc.data()[key].qty);
                }
            // add values to element in array
            } else {
                for (let i = 0; i < this.datacollection.datasets[0].data.length; i++) {
                    this.datacollection.datasets[0].data[i] += doc.data()[i.toString()].qty;
                }
            }
        });
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems();
  },
  mounted() {
    this.renderChart(this.datacollection, this.options);
  }
}