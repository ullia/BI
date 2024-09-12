const device = {
  type: null,
  init: function () {
    device.type =
      window.innerWidth > 1024 ? "desktop" : window.innerWidth > 768 ? "tablet" : "mobile";
  },
};

const gnb = {
  header: null,
  tabs: null,
  nav: null,
  pageType: null,
  btnMenu: null,
  btnClose: null,
  init: function () {
    gnb.header = document.querySelector(".bi__header");
    gnb.nav = document.querySelector(".bi__nav");
    gnb.tabs = document.querySelector(".bi__tabs");
    gnb.pageType = document.querySelector("body").dataset.type || null;
    gnb.btnMenu = document.querySelector(".bi__menu");
    gnb.btnClose = document.querySelector(".nav__close");

    gnb.btnMenu.addEventListener("click", e => {
      let target = e.target;
      target.classList.toggle("active");
      gnb.open();
    });

    gnb.btnClose.addEventListener("click", () => {
      gnb.close();
    });
  },
  open: function () {
    gnb.nav.classList.add("active");
    gnb.scrollLock("lock");
  },
  close: function () {
    gnb.nav.classList.remove("active");
    gnb.scrollLock("unlock");
  },
  headerInvert: function (pos) {
    let isOverNav = gnb.header.offsetHeight <= pos;
    isOverNav ? gnb.header.classList.add("invert") : gnb.header.classList.remove("invert");
  },
  scrollLock: function (islock) {
    islock === "lock"
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  },
};

window.addEventListener("scroll", function () {
  let pos = window.scrollY;
  if (gnb.pageType != null || gnb.pageType == "detail") {
    gnb.headerInvert(pos);
  }
});

// dial function
const dialObj = {
  dial: null,
  bg: null,
  size: null,
  btns: null,
  btnsTotal: null,
  btnsDistance: null,
  btnsInnerDistance: null,
  Descs: null,
  init: function () {
    dialObj.dial = document.querySelector(".dial__wrap");
    dialObj.bg = dialObj.dial.style.background;
    dialObj.size = dialObj.dial.offsetWidth;
    dialObj.btns = document.querySelectorAll(".dial__wrap button");
    dialObj.btnsTotal = dialObj.btns.length;
    dialObj.Descs = document.querySelectorAll(".dial__desc li");
    dialObj.btnsInnerDistance =
      device.type === "desktop" ? 100 : device.type === "tablet" ? 60 : 40;

    this.resp();

    dialObj.btns.forEach((button, index) => {
      button.addEventListener("click", e => {
        let target = e.currentTarget;
        let idx = index;

        dialObj.btns.forEach(btn => btn.classList.remove("active"));
        target.classList.add("active");
        this.matchDescs(idx);
      });
    });
  },
  matchDescs: function (idx) {
    dialObj.Descs.forEach(desc => desc.classList.remove("active"));
    dialObj.Descs[idx].classList.add("active");
    this.pagenation(idx);
  },
  pagenation: function (idx) {
    if (idx < 10) {
      document.querySelector(".pagenation .current").innerHTML = "0" + (idx + 1);
    } else {
      document.querySelector(".pagenation .current").innerHTML = idx + 1;
    }
  },
  resp: function () {
    let standard = 270;
    let interval = (360 / dialObj.btnsTotal).toFixed(4) * 1;
    dialObj.btnsDistance = dialObj.size / 2;

    dialObj.btns.forEach((btn, idx) => {
      let transformTemp = `translate(-50%, -50%) rotate(${standard.toFixed(4)}deg) translate(${
        dialObj.btnsDistance
      }px) rotate(-${standard.toFixed(4)}deg)`;
      let transformTemp2 = `translate(-50%, -50%) rotate(${standard.toFixed(4)}deg) translate(${
        dialObj.btnsInnerDistance
      }px) rotate(-${standard.toFixed(4)}deg)`;
      standard < 360 ? (standard += interval) : (standard += interval - 360);
      btn.style.transform = transformTemp;
      btn.childNodes[1].style.transform = transformTemp2;
    });
    // console.log(standard.toFixed(4) * 1);
  },
};

// go to top
function goToTop() {
  $("html, body").animate({ scrollTop: 0 }, 800);
  return false;
}

//window.addEventListener("scroll", function () {
//  let pos = window.scrollY;
//  if (gnb.pageType != null || gnb.pageType == "detail") {
//    gnb.headerInvert(pos);
//  }
//});

window.addEventListener("DOMContentLoaded", function () {
  device.init();
  gnb.init();
  if (gnb.pageType === "detail" && dialObj.dial === null) dialObj.init();
});

window.addEventListener("resize", function () {
  device.init();
  dialObj.init();
  if (device.type === "tablet" || device.type === "mobile") {
    gnb.tabs.style.display = "none";
  } else {
    gnb.tabs.style.display = "block";
  }
});
