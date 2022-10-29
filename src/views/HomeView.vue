<template>
  <div class="home">
    <swiper
      class=""
      :modules="modules"
      :slides-per-view="1"
      :space-between="50"
      :loop="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      navigation
      :pagination="{ clickable: true }"
    >
      <swiper-slide>
        <div class="txt">
          <h3>關於皇家影城</h3>
          專屬貴賓影城服務再升級的全新招待，共3個廳202席位。寬敞可調式雙人沙發座椅、專人貼心服務，搭配主廚料理的精緻餐點，將成為尊爵觀影的新選擇
        </div>
        <img
          src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg"
          class="d-block w-100"
          alt="'圖片+i'"
        />
        ></swiper-slide
      >
      <swiper-slide>
        <div class="txt">
          <h3>影城特色</h3>

          TITAN巨幕影廳則為高亮度RGB放映機。 音響部分則全是隱藏式 7.1
          環繞音響，將呈現精緻達到4迴路音響效果，影迷入場後看不到配置音響，會更感受到整座影廳的氣派空間感。座椅全採用尊榮皮質座椅，讓影迷看電影簡直就像在搭乘頭等艙。
        </div>
        <img
          src="https://images.pexels.com/photos/3069306/pexels-photo-3069306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          class="d-block w-100"
          alt="'圖片+i'"
      /></swiper-slide>
      <swiper-slide>
        <div class="txt">
          <h3>影城特色</h3>

          最大特色為全影廳都接受由《星際大戰》導演喬治盧卡斯，所推出的美國知名THX認證。此認證系統，證明影廳畫面對比度、色彩，聲音響度、音場頻率全達到最高規格。
          全影城放映機皆為4K雷射投影，一般廳及MUCROWN頂級影廳，皆採高對比雷射放映機
        </div>
        <img
          src="https://images.pexels.com/photos/1200450/pexels-photo-1200450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          class="d-block w-100"
          alt="'圖片+i'"
      /></swiper-slide>
    </swiper>
    <div class="container bg-gray">
      <div class="row">
        <div class="col-5"></div>
        <div class="div_info col-7">
          <div class="div_header row">
            <!-- <img class="sheep to_left" src="" /> -->
            <div class="right_txt">最新公告<br /><span>LATEST NEWS</span></div>
          </div>

          <div class="row">
            <div class="col title">2022-09-15</div>
            <a href="/News/Detail?id=693&amp;type=4">
              <div class="col news_content" style="cursor: pointer">團體電影優惠券退貨規定</div>
            </a>
          </div>
          <div class="row">
            <div class="col title">2022-09-02</div>
            <a href="/News/Detail?id=692&amp;type=4">
              <div class="col news_content" style="cursor: pointer">9-10月會員紅利兌換</div>
            </a>
          </div>
          <div class="row">
            <div class="col title">2022-08-10</div>
            <a href="/News/Detail?id=691&amp;type=4">
              <div class="col news_content" style="cursor: pointer">
                美麗新台茂影城PINK SOFA廳雙人套票贈韓國拍貼機卷
              </div>
            </a>
          </div>
          <div class="row">
            <div class="col title">2022-06-15</div>
            <a href="/News/Detail?id=689&amp;type=4">
              <div class="col news_content" style="cursor: pointer">
                台茂Pink Sofa雙人沙發座椅打造觀影新享受
              </div>
            </a>
          </div>
          <div class="row">
            <div class="col title">2022-04-29</div>
            <a href="/News/Detail?id=685&amp;type=4">
              <div class="col news_content" style="cursor: pointer">歡迎下載臺灣社交距離APP</div>
            </a>
          </div>
          <div class="row">
            <div class="col title">2022-01-01</div>
            <a href="/News/Detail?id=675&amp;type=4">
              <div class="col news_content" style="cursor: pointer">玉山宏匯聯名卡優惠</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-success p-2">
      <swiper
        class="botswiper"
        :modules="modules"
        :slides-per-view="3"
        :space-between="20"
        :loop="true"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        navigation
        :pagination="{ clickable: true }"
      >
        <swiper-slide>
          <img
            src="https://images.pexels.com/photos/7991158/pexels-photo-7991158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            class="d-block w-100"
            alt="'圖片+i'"
          />
          ></swiper-slide
        >
        <swiper-slide>
          <img
            src="https://images.pexels.com/photos/7234227/pexels-photo-7234227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            class="d-block w-100"
            alt="'圖片+i'"
        /></swiper-slide>
        <swiper-slide>
          <img
            src="https://images.pexels.com/photos/3843282/pexels-photo-3843282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            class="d-block w-100"
            alt="'圖片+i'"
        /></swiper-slide>
        <swiper-slide>
          <img
            src="https://images.pexels.com/photos/65128/pexels-photo-65128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            class="d-block w-100"
            alt="'圖片+i'"
        /></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';

export default {
  name: 'HomeView',
  data() {
    return { modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay] };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  created() {
    console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH);
  },
};
</script>
<style>
img {
  width: 100%;
  height: 100%;
}
.swiper {
  width: 100%;
  height: 80vh;
  object-fit: cover;
}
.botswiper {
  width: 100%;
  height: 20vh;
  object-fit: cover;
}

.txt {
  padding: 1rem;
  color: white;
  top: 30%;
  bottom: 50%;
  left: 18%;
  width: 390px;

  min-height: 30vh;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
}
@media screen and (max-width: 430px) {
  .txt {
    left: 0;
    right: 0;
  }
}
</style>
