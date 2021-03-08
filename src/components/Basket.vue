<template>
    <div id = "basket">
        <span>Menu:</span><br>
        <ul>
            <li v-for="item in itemsSelected" :key = "item[0]">
                <p>{{item[0]}} x {{item[1]}}</p>
            </li>
        </ul>

        <button v-on:click="findTotal(); sendOrder();">Add Order</button> <br>
        <p v-show="buttonClicked">Subtotal: ${{subTotalPrice}}</p> 
        <p v-show="buttonClicked">Grand Total: ${{grandTotal}}</p>

    </div>
</template>

<script>
import db from "../firebase.js"
export default {
    data() {
        return {
            subTotalPrice: 0,
            buttonClicked: false,
        }
    },
    props: {
        itemsSelected: Array,
        items: Array
    },
    methods: {
        findTotal : function() {
            var total = 0;
            for (let i = 0; i < this.itemsSelected.length; i++) {
                const curr = this.itemsSelected[i];
                total += curr[1] * curr[2];
            }
            this.subTotalPrice = total;
            this.buttonClicked = true;
        },
        sendOrder: function() {
            let finalArray = this.finalItems();
            console.log(finalArray);

            // Initialise doc with first item
            db.collection('orders').add({
                "0": {
                    name: finalArray[0][0],
                    qty: finalArray[0][1],
                    price: finalArray[0][2]
                }   
            }).then((docRef) => {
                // Add the rest of the items
                for (let i = 1; i < finalArray.length; i++) {
                    let curr = finalArray[i];
                    let docData = {
                        name: curr[0],
                        qty: curr[1],
                        price: curr[2]
                    }
                    db.collection('orders').doc(docRef.id).set({
                        [i]: docData
                    }, {merge : true}).then(() => {
                        console.log("Successfully added " + docData.name);
                        // Reload page only after the last item is added
                        if (i == finalArray.length - 1) {
                            location.reload();
                        }
                    }).catch((error) => {
                        console.error("Error adding more " + error);
                    });
                }
                console.log("Transmission succcess");
                
                
            }).catch((error) => {
                console.error("Error adding document " + error);
            });  

        },
        finalItems: function() {
            // deep copy all items
            let allItems = JSON.parse(JSON.stringify(this.items));

            // filter for items that are not in basket
            for (let j = 0; j < this.itemsSelected.length; j++) {
                allItems = allItems.filter(ele => ele.name != this.itemsSelected[j][0]);
            }

            // deep copy basket
            let final = JSON.parse(JSON.stringify(this.itemsSelected));

            // add items that are not in basket with a default quantity of 0
            for (let k = 0; k < allItems.length; k++) {
                final.push([allItems[k].name, 0, allItems[k].price]);
            }

            // sort all items in order
            final.sort((a, b) => a[0].localeCompare(b[0]));

            return final;
        }
    }, 
    computed: {
        grandTotal : function() {
            return (this.subTotalPrice * 1.07).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
        },
    },
}
</script>

<style scoped>
    span {
        float: left;
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

    p {
        text-align: left;
    }

</style>
