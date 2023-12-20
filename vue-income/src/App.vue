<template>
  <header>
    <Header :totalIncome="state.totalIncome"/>
    <Form   @add-income="AddIncome"/>
    <IncomeList @update="removeItem" :state="state"/>
  </header>
</template>

<script>
import { computed, reactive } from 'vue';
import Header from './components/Header.vue';
import Form from './components/Form.vue'
import IncomeList from './components/IncomeList.vue';
export default{
  components: {
    Header,
    Form,
    IncomeList
  },
  data(){
    const state = reactive({
      income: [],
      totalIncome: computed(() => {
        let temp = 0;

        if(state.income.length > 0){
          for(let i = 0; i < state.income.length; i++){
            temp += state.income[i].value
          }
        }
        return temp
      })
    })
    return {
      state
    }
  },
  methods: {
    AddIncome(data) {
      let d = data.date.split("-");
      let newD = new Date(d[0], d[1], d[2]);
      this.state.income = [...this.state.income, {
        id: Date.now(),
        desc: data.desc,
        value: parseInt(data.value),
        date: newD.getTime()
      }]
      console.log(this.state.income)
    },
    removeItem(id){
      this.state.income = this.state.income.filter((item) => {
        return id !== item.id
      })
    }
  }
}

</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Fira Sans", sans-serif;
}
body{
  background: #EEE;

}
</style>
