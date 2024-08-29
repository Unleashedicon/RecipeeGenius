import React from 'react';
import '@fontsource/lobster-two'; // Importing the Lobster Two font
import '../styles/pop-styles.css'; // Assuming custom styles are still needed

export default function Choice() {
    return (
        <>
        <div className="decorative-line"></div>

        {/* Background container */}
        <div>
            {/* Section Heading */}
            <h2 className="choice">Why Choose Us?</h2>
            
            {/* Tags Container */}
            <div className="flex flex-wrap justify-center items-start">
                {/* Tag Item */}
                <div className="flex flex-col items-center p-4 m-2 bg-green-100 shadow-lg rounded-xl max-w-xs md:h-[330px] h-auto flex-grow">
                    <img src="/images/ramen.png" alt="Quality Food" className="w-24 sm:w-32 md:w-40 lg:w-48 object-cover rounded-full mb-4" />
                    <div className="text-center flex flex-col justify-between h-full">
                        <h3 className="text-lg font-semibold">Quality Food</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Our recipes are crafted to perfection, ensuring every dish delivers exceptional taste. Experience gourmet delight with every bite.
                        </p>
                    </div>
                </div>
                {/* Repeat for other tags */}
                <div className="flex flex-col items-center p-4 m-2 bg-green-100 shadow-lg rounded-xl max-w-xs md:h-[330px] h-auto flex-grow">
                    <img src="/images/recipes.png" alt="Premium Ingredients" className="w-24 sm:w-32 md:w-40 lg:w-48 object-cover rounded-full mb-4" />
                    <div className="text-center flex flex-col justify-between h-full">
                        <h3 className="text-lg font-semibold">Premium Ingredients</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            We use only the freshest and finest ingredients, bringing quality and flavor to your table. Taste the difference with every meal.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center p-4 m-2 bg-green-100 shadow-lg rounded-xl max-w-xs md:h-[330px] h-auto flex-grow">
                    <img src="/images/chef.png" alt="Cook Like a Chef" className="w-24 sm:w-32 md:w-40 lg:w-48 object-cover rounded-full mb-4" />
                    <div className="text-center flex flex-col justify-between h-full">
                        <h3 className="text-lg font-semibold">Cook Like a Chef</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Unlock your cooking potential with our easy-to-follow recipes. Impress your guests with dishes that look and taste professionally made.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center p-4 m-2 bg-green-100 shadow-lg rounded-xl max-w-xs md:h-[330px] h-auto flex-grow">
                    <img src="/images/cook-book.png" alt="Easy Recipes" className="w-24 sm:w-32 md:w-40 lg:w-48 object-cover rounded-full mb-4" />
                    <div className="text-center flex flex-col justify-between h-full">
                        <h3 className="text-lg font-semibold">Easy Recipes</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Enjoy delicious meals without the hassle. Our simple recipes make cooking a breeze, perfect for any skill level.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
