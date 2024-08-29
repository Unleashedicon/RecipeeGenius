import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import '../styles/pop-styles.css';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import RecipeModal from './RecipeeModal';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
// Define the Recipe type according to your API response
type Recipe = {
  id: number;
  title: string;
  image: string;
};

export default function Latest() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch recipes when the component mounts
  useEffect(() => {
    const getRecipes = async () => {
      try {
        const res = await axios.get('/api/latest'); // Corrected path
        const { data } = res;
        console.log("Almost there")
        const filteredRecipes = data.results.slice(0, 7); // Filter to 9 recipes
        setRecipes(filteredRecipes);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getRecipes();
  }, []);

  if (loading) return <div>Loading...</div>;
  const openModal = (id: number) => {
    setSelectedRecipeId(id);
    
    setModalOpen(true);
  };
  return (
    <>
    <div className="decorative-line"></div>

    <div className="w-full max-w-4xl mx-auto flex justify-between items-center bg-gray-100 p-6 my-4 rounded-lg shadow-md">
      <span className="text-xl font-semibold text-gray-800">
        Latest Recipes
      </span>
      <Link href="/categories" className="text-green-500 flex items-center hover:text-green-700 transition duration-300">
  <span className="mr-1">See More</span>
  <span className="see-more-arrow text-green-500 hover:text-green-700 transition duration-300">&gt;</span>
</Link>

    </div>
    <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {recipes.map((recipe) => (
          <SwiperSlide key={recipe.id}>
            <div className="swiper-slide-content">
              <img src={recipe.image} alt={recipe.title} className="swiper-slide-image" />
              <h3 className="swiper-slide-title">{recipe.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
