<template>
    <div class="card">
        <a href="#" target="_blank">
            <img :src="anime.images.jpg.image_url" alt="Anime Poster">
            <h3>{{anime.title}}</h3>
        </a>
    </div>
</template>

<script>
 export default{
    props: ['anime']
 }
</script>

<style scoped>
.card{
    flex: 1 1 25%;
    width: 33%;
    max-width: 33%;
    padding: 0 8px;
    margin-bottom: 16px;
}
.card img{
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transition: all .3s;
}
.card h3{
    padding: 16px;
    color: #313131;
}
.card:hover img{
    transform: scale(1.05);
}
</style>