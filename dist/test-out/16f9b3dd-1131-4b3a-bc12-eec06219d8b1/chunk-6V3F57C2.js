import {
  CommonModule,
  init_common
} from "./chunk-QVDWSDMI.js";
import {
  Component,
  Input,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-W7AWB7PO.js";

// angular:jit:template:src\app\shared\components\corousel\corousel.html
var corousel_default;
var init_corousel = __esm({
  "angular:jit:template:src\\app\\shared\\components\\corousel\\corousel.html"() {
    corousel_default = `<div class="carousel-container"\r
  [ngClass]="{'second': carouselType == 1, 'third': carouselType == 2, 'fourth':carouselType=== 3 }">\r
  <!-- \r
    -->@if (carouselType != 3) {\r
  <div class="gradient"></div>\r
  }\r
  <div class="slides">\r
    @for (banner of data?.banners; track $index) {\r
    @if (carouselType != 3) {\r
    <div class="info-container"\r
      [ngClass]="{'second': carouselType == 1, 'third': carouselType == 2 ,'fourth':carouselType=== 3, 'visible': currentSlide ===$index }">\r
      <div class="info-contet" [ngClass]="{'second': carouselType == 1, 'third': carouselType == 2 ,'fourth': 3 }">\r
        <h2 class="car-text">{{banner.name? banner.name: base.title}}</h2>\r
        <p class="card-info">{{banner.description?banner.description: base.description}}</p>\r
        @if(carouselType !=2){\r
        <button class="button-chips">\r
          <label>Adquirir</label>\r
        </button>\r
        }\r
      </div>\r
    </div>\r
    }\r
\r
    <div class="slide" [ngClass]="{ 'visible': currentSlide === $index }">\r
      <img [src]="banner.image? banner.image: 'carousel-base.png' " />\r
    </div>\r
    }\r
  </div>\r
</div>`;
  }
});

// angular:jit:style:src\app\shared\components\corousel\corousel.css
var corousel_default2;
var init_corousel2 = __esm({
  "angular:jit:style:src\\app\\shared\\components\\corousel\\corousel.css"() {
    corousel_default2 = '/* src/app/shared/components/corousel/corousel.css */\n.carousel-container {\n  position: relative;\n  height: 256px;\n}\n.carousel-container.second {\n  height: 256px;\n  overflow: hidden;\n}\n.carousel-container.third {\n  height: 648px;\n}\n.carousel-container.fourth {\n  height: 100%;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.carousel-container input[type=radio] {\n  display: none;\n}\n.slides {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.slide {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  transition: opacity 1s ease-in-out;\n  overflow: hidden;\n}\n.slide img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n.info-container.visible {\n  opacity: 1;\n}\n.slide.visible {\n  opacity: 1;\n}\n.navegacion {\n  display: flex;\n  position: absolute;\n  z-index: 10;\n  gap: 12px;\n  bottom: 16px;\n  left: calc(50% - 24px);\n}\n.gradient {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  background:\n    linear-gradient(\n      270deg,\n      rgba(0, 0, 0, 0.13) 0%,\n      rgba(0, 0, 0, 0.404) 93.92%);\n}\n.info-container {\n  position: absolute;\n  z-index: 3;\n  width: 100%;\n  height: 100%;\n  padding: 51px 53px;\n  box-sizing: border-box;\n  opacity: 0;\n  transition: opacity 1s ease;\n}\n.info-container.third {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.info-contet {\n  top: 51px;\n  left: 53px;\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 32px;\n  box-sizing: border-box;\n}\n.info-contet.second {\n  align-items: flex-end;\n  margin-left: auto;\n}\n.info-contet.third {\n  width: 942px;\n  align-items: center;\n}\n.info-contet.third p {\n  text-align: center;\n}\n.info-contet.second h2,\n.info-contet.second p {\n  text-align: right;\n}\n.info-contet h2 {\n  color: var(--White, #FFF);\n  font-family:\n    var(--montser-font),\n    "montserrat",\n    sans-serif;\n  font-size: 26px;\n  font-style: normal;\n  font-weight: 600;\n  line-height: 31px;\n  letter-spacing: -1.2px;\n  margin: 0px;\n}\n.info-contet p {\n  color: var(--White, #FFF);\n  font-family:\n    var(--montser-font),\n    "montserrat",\n    sans-serif;\n  font-size: 9px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 13px;\n  margin: 0px;\n}\n.navegacion label {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: #717680;\n  cursor: pointer;\n  transition: background-color 0.5s ease-in-out;\n}\n.navegacion label:hover {\n  background-color: #bdc0c6 !important;\n}\n/*# sourceMappingURL=corousel.css.map */\n';
  }
});

// src/app/shared/components/corousel/corousel.ts
var Corousel;
var init_corousel3 = __esm({
  "src/app/shared/components/corousel/corousel.ts"() {
    "use strict";
    init_tslib_es6();
    init_corousel();
    init_corousel2();
    init_common();
    init_core();
    Corousel = class Corousel2 {
      data;
      carouselType;
      currentSlide = 0;
      images = [
        "/assets/back_image.webp",
        "/assets/Carousel_image2.png",
        "/assets/Carousel_image.png"
      ];
      autoSlideInterval;
      base = {
        title: "T\xEDtulo atractivo en 2 l\xEDneas de texto",
        description: "Descripci\xF3n corta del evento o producto que se este promocionando."
      };
      ngOnDestroy() {
        clearInterval(this.autoSlideInterval);
      }
      ngOnInit() {
        if (this.data) {
          this.images = this.data.banners.map((x) => x.image);
        }
        this.carouselType = this.data?.carousel;
      }
      startAutoplay() {
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 4e3);
      }
      goToSlide(index) {
        this.currentSlide = index;
        clearInterval(this.autoSlideInterval);
        setTimeout(() => this.startAutoplay(), 1e4);
      }
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.images.length;
      }
      static propDecorators = {
        data: [{ type: Input }],
        currentSlide: [{ type: Input }]
      };
    };
    Corousel = __decorate([
      Component({
        selector: "app-corousel",
        imports: [CommonModule],
        template: corousel_default,
        styles: [corousel_default2]
      })
    ], Corousel);
  }
});

export {
  Corousel,
  init_corousel3 as init_corousel
};
//# sourceMappingURL=chunk-6V3F57C2.js.map
