import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css'; // Ensure this is the correct path

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Recipee() {
  const slides = [
    {
      image: '/images/jay-wennington-N_Y88TWmGwA-unsplash.jpg',
      title: 'Discover Recipes',
      description: 'Explore a vast collection of recipes. Find inspiration and try new dishes.',
    },
    {
      image: '/images/or-hakim-S2Eql9vHN3o-unsplash.jpg',
      title: 'Discover Rewards',
      description: 'Earn tokens for quality recipes and engagement. Creativity pays off!',
    },
    {
      image: '/images/calum-lewis-8Nc_oQsc2qQ-unsplash.jpg',
      title: 'Discover Ownership',
      description: 'Mint your recipes as NFTs and own your unique creations securely.',
    },
    {
      image: '/images/dan-gold-E6HjQaB7UEA-unsplash.jpg',
      title: 'Discover Premium',
      description: 'Unlock exclusive features and an ad-free experience by going premium.',
    },
  ];

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.image}
              alt={slide.title}
              className="slide-image"
            />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
