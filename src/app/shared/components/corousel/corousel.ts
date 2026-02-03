import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { carouselDTO } from '../../models/carouselDTO';

@Component({
  selector: 'app-corousel',
  imports: [CommonModule],
  templateUrl: './corousel.html',
  styleUrl: './corousel.css'
})
export class Corousel implements OnInit, OnDestroy {
  @Input() data?: carouselDTO
  carouselType?: number
  @Input() currentSlide: number = 0;
  images: string[] = [
    '/assets/back_image.webp',
    '/assets/Carousel_image2.png',
    '/assets/Carousel_image.png'
  ];
  autoSlideInterval: any;

  base = {
    title: 'Título atractivo en 2 líneas de texto',
    description: 'Descripción corta del evento o producto que se este promocionando.'
  }

  ngOnDestroy(): void {
    clearInterval(this.autoSlideInterval);
  }

  ngOnInit(): void {
    if (this.data) {
      this.images = this.data.banners.map(x => x.image)
    }
    this.carouselType = this.data?.carousel
    //this.startAutoplay();
  }

  startAutoplay(): void {
    this.autoSlideInterval = setInterval(() => this.nextSlide(), 4000); // Cambia de slide cada 4 segundos
  }


  goToSlide(index: number) {
    this.currentSlide = index;
    clearInterval(this.autoSlideInterval);
    setTimeout(() => this.startAutoplay(), 10000); // espera 10s y sigue
  }
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }



}
