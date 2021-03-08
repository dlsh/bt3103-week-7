<template>
    <div id = "buttext">
        <button v-on:click="deduct()">-</button>
        &nbsp;
        <span>{{counter}}</span>
        &nbsp;
        <button v-on:click="addition()">+</button>     
    </div>
</template>

<script>
export default {
    data() {
        return{
            counter: 0
        }
    }, 
    methods: {
        deduct:function() {
            if (this.counter > 0) {
                this.counter--;
            }
            this.$emit('counter', this.$props.item, this.counter)
        },
        addition:function() {
            if (this.counter == 10) {
                return alert("You cannot buy more than 10 items.")
            } else {
                this.counter++;
            }
            this.$emit('counter', this.$props.item, this.counter)
        }
    },
    props: {
        item: Object
    }
}
</script>

<style scoped>
    button {
        background-color: #ffc0cb;
        border: 1px solid black;
        border-radius: 5px;
        width: 40px;
        height: 40px;
        font-size: 20px;
    }

    #buttext {
        font-size: 30px;

    }
</style>