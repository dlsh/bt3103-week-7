<template>
    <div id = "ordersList">
        <navbar></navbar>
        <ul class = "outer">
            <li v-for='order in orders' :key ='order.id' class = "outer">
                <ul class = "inner">
                    <li v-for="item in order[1]" :key='item.id' class = "inner">
                        <span>{{item.name}}: {{item.qty}}</span>
                    </li>
                </ul>
                <div id = "allButtons">
                    <button v-bind:id ='order[0]' v-on:click="deleteItem($event)">Delete</button>
                    <button v-bind:id ='order[0]' v-on:click="route($event)">Modify</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import db from "../firebase.js"
import NavBar from './NavBar.vue'

export default {
    data() {
        return {
            orders: []
        }
    },
    methods: {
        fetchOrders: function() {
            db.collection('orders').get().then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    this.orders.push([doc.id, doc.data()]);
                    console.log(doc.id, "=>", doc.data());
                });
            });
        },
        deleteItem: function(event) {
            let doc_id = event.target.getAttribute("id");
            db.collection('orders').doc(doc_id).delete().then(() => {
                console.log("Successfully deleted ", doc_id);
                location.reload();
            }).catch((error) => {
                console.error("Failed to delete document: ", error);
            });
        },
        route: function(event) {
            this.$router.push({ name: 'Modify', params: {id: event.target.getAttribute("id")}});
        }
    },
    created: function() {
        this.fetchOrders();
    },
    components: {
        'navbar': NavBar
    }
}
</script>

<style scoped>
ul {
    list-style-type: none;
}
ul.inner {
    display: block;
    float: left;
}
ul.outer {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
}
li.outer {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
}

li.inner {
    margin-left: 150px;
    padding-top: 0;
}


button {
    width: 65px;
    height: 30px;
    background-color: #f7cac9;
    border-radius: 10px;
    border-width: 1px;
    float: right;
}

#allButtons {
    margin-right: 150px;
}
</style>