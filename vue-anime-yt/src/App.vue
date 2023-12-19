
<template>
  <div class="app">
    <header>
      <h1>The <strong>Anime</strong> Database</h1>
      <form class="search-box" v-on:submit.prevent="HandleSearch">
        <input type="search" placeholder="Search for a anime..." class="search-field" required v-model="search_query">
      </form>
    </header>
    <main>
      <div class="cards" v-if="animeList.length > 0">
        <card v-for="anime in animeList" :key="anime.mal_id" :anime="anime"/>
      </div>
      <div class="no-result" v-else>
        <h3>Sorry, we have no results</h3>
      </div>
    </main>
  </div>
</template>

<script>
  import Card from './components/Card.vue';
  import { ref } from 'vue';

  export default{
    components: {
      "card": Card
    },
    data(){
      let search_query = ref("")
      let animeList = ref([])
      return {
        search_query,
        animeList
      }
    },
    methods: {
      async HandleSearch() {
        try {
          const response = await fetch(`https://api.jikan.moe/v4/anime?q=${this.search_query}`);
          const data = await response.json();
          this.animeList = data.data;
          console.log(this.animeList)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
  }
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif;
}
a{
  text-decoration: none;
}
header{
  padding-top: 50px;
  padding-bottom: 50px;
}
header h1{
  color: #888;
  font-size: 42px;
  font-weight: 400;
  margin-bottom: 50px;
  text-align: center;
  text-transform: uppercase;
  transition: all .2s ease-in-out;
}
header h1 strong{
  color: #313131;
}
header h1:hover{
  color: #313131;
}
header .search-box{
  display: flex;
  justify-content: center;
  padding: 0 10px;
}
header .search-box .search-field{
  appearance: none;
  background: none;
  border: none;
  outline: none;

  background: #F3F3F3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  display: block;
  width: 100%;
  max-width: 600px;
  padding: 15px;
  border-radius: 8px;

  color: #313131;
  font-size: 20px;
  transition: .4s;

}
header .search-box .search-field::placeholder {
  color: #AAA;
}
header .search-box .search-field:focus, header .search-box .search-field:valid{
  color: #FFF;
  background: #313131;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.15);
}
main{
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;

}
main .cards{
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px;
}

</style>
