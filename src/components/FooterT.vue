<template>
  <div class="footer text-center text-lg-start">
    <!-- Copyright -->
    <div class="net-container">
      <p class="me-5">© 2022 Copyright</p>
      <ul>
        <li>
          <a href="https://www.instagram.com/transportescacciuttolo/" class="instagram"
            ><i class="fab fa-instagram"></i
          ></a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/profile.php?id=100071289445382"
            class="facebook"
            ><i class="fab fa-facebook-f"></i
          ></a>
        </li>
      </ul>
    </div>
    <!-- Copyright -->
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.footer {
  background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
  padding-top: 15px;
  padding-bottom: 15px;
  color: white;
}

.net-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.net-container ul li {
  display: inline-block;
  margin: 0 10px;
  width: 25px;
  height: 25px;
  text-align: center;
}

.net-container ul li a {
  display: block;
  padding: 0px;
  background-color: #333;
  color: white;
  line-height: 25px;
  font-size: 18px;
  box-shadow: 0 3px 5px 0px rgba($color: #000000, $alpha: .2);
  transition: .2s;
}

.net-container ul:hover a {
  filter: blur(2px);
}

.net-container ul li a:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 5px 5px 0px rgba($color: #000000, $alpha: .4);
  filter: none;
}

.net-container ul li .facebook:hover {
  background-color: #3b5999;
}

.net-container ul li .instagram:hover {
  background-color: white;
  color: #000000;
}

@media screen and (max-width: 768px) {
}
</style>