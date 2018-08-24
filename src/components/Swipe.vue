<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="list in lists">
            <a class="js-no-follow" :href="list.clickUrl">
                <img class="goods-main-photo fadeIn" :src="list.img">
            </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>
<style>
.swiper-wrapper img{
    width:100%; height:100%;
}
</style>
<script>
import 'swiper/dist/css/swiper.css'
import Swiper from 'swiper/dist/js/swiper.js'
export default {
    name:'Swipe',
    props:['lists'],
    created(){
    },
    mounted(){
        new Swiper('.swiper-container',{
            autoplay:true,
            loop:true,
            pagination: {
                el: '.swiper-pagination',
            },
        })
    }
}
</script>
