<template>
    <div>
        <br>
        <br>
        <ul>
            <li v-for='item in datapacket' :key ='item.id'>
                <p>{{item.name}}: {{item.qty}}</p>
                <input v-bind:id='item.name' placeholder="0" type="number" min="0"><br>
            </li>
        </ul>
        <button v-on:click ="updateOrder()">Update Order</button>
    </div>
</template>

<script>
import db from "../firebase.js"

export default {
    data() {
        return {
            datapacket: Object
        }
    },
    methods: {
        fetchOrders: function(id) {
            db.collection('orders').doc(id).get().then((doc) => {
                if (doc.exists) {
                    this.datapacket = doc.data();
                    console.log("Document get!");
                } else {
                    console.log("No such document");
                }
            }).catch((error) => {
                console.error("Error getting document: ", error);
            })
        },
        updateOrder() {
            db.collection('orders').doc(this.$route.params.id).set(this.newData).then(() => {
                console.log("Update successful");
                this.$router.push({path: '/orders'});
            }).catch((err) => {
                console.error("Update Failed: ", err);
            });
            
        }
    },
    created: function() {
        this.fetchOrders(this.$route.params.id);
    },
    computed: {
        newData: function() {
            var updatedData = JSON.parse(JSON.stringify(this.datapacket));

            for (let key in updatedData) {
                if (document.getElementById(updatedData[key].name).value != "") {
                    updatedData[key].qty = parseInt(document.getElementById(updatedData[key].name).value);
                } else {
                    updatedData[key].qty = parseInt(document.getElementById(updatedData[key].name).placeholder);
                }

            }
            return updatedData;
        }
    }
    
}
</script>

<style scoped>
ul {
  list-style-type: none;
  text-align: left;
  padding:0;
}

button {
    background-color: #f7cac9;
    border: 1px solid black;
    float: left;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    border-width: 1px;
}

</style>