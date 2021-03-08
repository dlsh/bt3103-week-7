<template>
    <div id = "itemsList">
        <navbar></navbar>
        <ul>
            <li v-for="item in items" :key ="item.id">
                <h1 id = "itemName">{{item.name}}</h1> <br>
                <img v-bind:src = "item.imageURL"> <br>
                <p id = "price">${{item.price}}</p>
                <qtyCounter v-bind:item = 'item' v-on:counter="onCounter"></qtyCounter>
                <br>
            </li>
        </ul>
        <basket v-bind:itemsSelected = 'itemsSelected' v-bind:items = 'items' id = "shoppingBasket"></basket>
    </div>
</template>

<script>
import db from "../firebase.js"
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import NavBar from './NavBar.vue'

export default {
    data() {
        return {
            itemsSelected: [],
            items: []
        }
    },
    components: {
        "qtyCounter" : QuantityCounter,
        'basket' : Basket,
        'navbar': NavBar
    },
    methods: {
        onCounter: function (item, count) {
            var inBasket = false;
            var index;
            for (let i = 0; i < this.itemsSelected.length; i++) {
                if (this.itemsSelected[i][0] === item.name) {
                    inBasket = true;
                    index = i;
                    break;
                }
            }

            if (!inBasket && count > 0) {
                this.itemsSelected.push([item.name, count, item.price]);
            } else if (inBasket) {
                if (count === 0) {
                    this.itemsSelected.splice(index, 1);
                } else {
                    this.itemsSelected[index].splice(1, 1, count);
                }
            }
        },
        fetchItems: function() {
            db.collection('menu').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.items.push(doc.data());
                    console.log(doc.data());
                });
            });
        }
    },
    created: function() {
        this.fetchItems();
    }
}
</script>

<style scoped>
    #itemsList {
        width: 100%;
        max-width: 70%;
        margin: 0px;
        padding: 0 5px;
        box-sizing: border-box;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
    }
    li {
        flex-grow: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 10px;
        border: 1px solid #222;
        margin: 10px;
    }
    img {
        width: 135px;
        height: 135px;
    }

    #price {
        font-size: 30px;
    }

    #itemName {
        font-size: 30px;
    }

    #shoppingBasket {
        position: absolute;
        top: 15%;
        left: 78%;
        font-size: 30px;
    }
</style>