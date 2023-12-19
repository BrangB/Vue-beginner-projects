<template>
    <h1>Hello World</h1>
</template>

<script>
    export default{
        name: "Home",
        methods: {
            async fetchCovidData(){
                const res = await fetch('https://api.covidtracking.com/v1/status.json')
                const data = await res.json()
                return data;
            }
        },
        async created() {
            const data = await this.fetchCovidData()
            console.log(data)
        }
    }
</script>