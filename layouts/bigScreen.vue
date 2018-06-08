<template>
  <div class="container">
    <div class="header"></div>
    <div class="content">
      <nuxt/>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style>
.header {
  width: 100%;
  height: 10%;
  background-image: url(../assets/img/header.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.content{
  width: 100%;
  height: 100%;
  position: inherit;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  display:none
}

.container{
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-image: url(../assets/img/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
