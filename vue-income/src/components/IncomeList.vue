<template>
  <div class="income-list">
    <IncomeItem @remove="removeItem" v-for="data in state.income" :key="data.id" :income="data"/>
  </div>
</template>

<script>
import IncomeItem from './IncomeItem.vue';
export default {
    components: {
        IncomeItem
    },
    props: {
        state: Object
    },
    methods: {
        removeItem(id){
            this.$emit('update', id)
        }
    }
}
</script>

<style scoped>
    .income-list{
        margin-top: 30px;
        padding: 15px;
    }

</style>