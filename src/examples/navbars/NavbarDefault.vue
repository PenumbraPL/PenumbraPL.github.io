<script setup>
//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";

import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";

// images
import team4 from "@/assets/img/team-4.jpg";
import mailIcon from "/express.ico";

import ArrDark from "@/assets/img/down-arrow-dark.svg";
import downArrow from "@/assets/img/down-arrow.svg";
import DownArrWhite from "@/assets/img/down-arrow-white.svg";
import router from "../../router";


let loginFunction = ref("Zaloguj sie")
let showDropdown = ref(false)
let logged =  ref(islogged())

function islogged(){
  return (localStorage.user) ? true : false
}

function dropDown(){
  showDropdown = !showDropdown
  if(islogged()){
    loginFunction.value = "Wyloguj sie"
  }else{
    loginFunction.value = "Zaloguj sie"
  }
}

function signOut(){
  console.log("Sign out")
  const user = JSON.parse(localStorage.user)
  if(islogged()){
    localStorage.removeItem('user')
  }
  // ?
  logged.value = islogged()
  let destination = '/'
  const workerId = user['workerId'] ? true : false
  const isAdmin = user['isAdmin']
  if(workerId){
    if(isAdmin){
      destination = '/admin'
    }else{
      destination = '/admin/employee'
    }
  }
  router.push(destination)
}

function checkMainPage(){
  if(islogged()){
    //console.log(localStorage.user)
    const user = JSON.parse(localStorage.user)
    const userId = user['userId'] ? true : false
    const workerId = user['workerId'] ? true : false
    const isAdmin = user['isAdmin']
    if(userId){
      return 'presentation'
    }
    else if(workerId){
      if(isAdmin){
        return 'admin-presentation-page'
      }
      return 'employee-presentation-page'
    }
  }
  return 'presentation'
}

const props = defineProps({
  action: {
    type: Object,
    route: String,
    color: String,
    label: String,
    default: () => ({
      route: "https://www.creative-tim.com/product/vue-material-kit",
      color: "bg-gradient-success",
      label: "Free Download"
    })
  },
  transparent: {
    type: Boolean,
    default: false
  },
  light: {
    type: Boolean,
    default: false
  },
  dark: {
    type: Boolean,
    default: false
  },
  sticky: {
    type: Boolean,
    default: false
  },
  darkText: {
    type: Boolean,
    default: false
  }
});

// set arrow  color
function getArrowColor() {
  if (props.transparent && textDark.value) {
    return ArrDark;
  } else if (props.transparent) {
    return DownArrWhite;
  } else {
    return ArrDark;
  }
}

// set text color
const getTextColor = () => {
  let color;
  if (props.transparent && textDark.value) {
    color = "text-dark";
  } else if (props.transparent) {
    color = "text-white";
  } else {
    color = "text-dark";
  }

  return color;
};

// set nav color on mobile && desktop

let textDark = ref(props.darkText);
const { type } = useWindowsWidth();

if (type.value === "mobile") {
  textDark.value = true;
} else if (type.value === "desktop" && textDark.value == false) {
  textDark.value = false;
}

watch(
  () => type.value,
  (newValue) => {
    if (newValue === "mobile") {
      textDark.value = true;
    } else {
      textDark.value = false;
    }
  }
);
</script>
<template>
  <nav
    class="navbar navbar-expand-lg top-0"
    :class="{
      'z-index-3 w-100 shadow-none navbar-transparent position-absolute my-3':
        props.transparent,
      'my-3 blur border-radius-lg z-index-3 py-2 shadow py-2 start-0 end-0 mx-4 position-absolute mt-4':
        props.sticky,
      'navbar-light bg-white py-3': props.light,
      ' navbar-dark bg-gradient-dark z-index-3 py-3': props.dark
    }"
  >
    <div
      :class="
        props.transparent || props.light || props.dark
          ? 'container'
          : 'container-fluid px-0'
      "
    >
      <RouterLink
        class="navbar-brand d-none d-md-block"
        :class="[
          (props.transparent && textDark.value) || !props.transparent
            ? 'text-dark font-weight-bolder ms-sm-3'
            : 'text-white font-weight-bolder ms-sm-3'
        ]"
        :to="{ name: checkMainPage() }"
        rel="tooltip"
        title="Strona glowna"
        data-placement="bottom"
      >
 <!-- 'presentation' -->
    <MaterialAvatar :image="mailIcon" alt="Image placeholder" size="md" />
        Krakowski-kurier
      </RouterLink>
     
      <button
        class="navbar-toggler shadow-none ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div
        class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
        id="navigation"
      >
        <ul class="navbar-nav navbar-nav-hover ms-auto">
          
          <li class="nav-link d-flex cursor-pointer align-items-center">
            <!-- <a
            href="/profile"
              
            > -->
            <div class="dropdown">
               <MaterialAvatar 
               :image="team4" 
               alt="Uzytkownik" 
               size="md" 
               data-bs-toggle="dropdown"
              :area-expanded="showDropdown"
              @click="dropDown"
              />
              <ul
              class="dropdown-menu px-2 py-3"
              :class="{ show: showDropdown }"
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <a class="dropdown-item border-radius-md" href="/profile"
                  >Profil</a
                >
              </li>
              <li v-show="logged">
                <a class="dropdown-item border-radius-md"
                  @click="signOut"
                  >{{ loginFunction }}</a
                >
              </li>
            </ul>  
            <!-- </a> -->
          </div>
          </li>
        </ul>

      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>
