<template>
  <div class="income-item">
    <div @click="removeItem" class="removeItem">x</div>
    <div class="desc">{{ income.desc }}</div>
    <div class="price">{{ income.value }} MMK</div>
    <div class="date">{{ formattedDate }}</div>
  </div>
</template>

<script>
export default {
    props: {
        income: Object
    },
    data(){
        let date = new Date(this.income.date)
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        let formattedDate = day + "/" + month + "/" + year

        return{
            formattedDate
        }
    },
    methods: {
        removeItem(){
            this.$emit('remove', this.income.id);
        }
    }
}
</script>

<style scoped>
  .income-item {
    position: relative;
    display: flex;
    padding: 15px 15px 15px 0px;
    background-color: #FFF;
    border-radius: 8px;
    max-width: 600px;
    margin: 0 auto 30px;
  }

  .removeItem {
    color: #EF2D2D;
    font-weight: 600;
    font-size: 20px;
    line-height: 1;
    text-align: center;
    margin: auto 20px;
    cursor: pointer;
  }

  .desc {
    color: #666;
    flex: 1 1 100%;
    font-size: 20px;
  }

  .price {
    color: #666;
    min-width: 200px;
    font-size: 20px;
  }

  .date {
    color: #666;
    text-align: right;
    font-size: 20px;
  }
</style>