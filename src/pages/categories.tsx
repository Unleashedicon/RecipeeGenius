import { Sidebar, Menu, MenuItem, SubMenu, menuClasses, MenuItemStyles } from 'react-pro-sidebar';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Switch } from "../context/Switch";
import 'hamburgers/dist/hamburgers.css';
type Theme = 'light' | 'dark';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Progress } from "@/components/ui/progress";
import RecipeModal from '../components/RecipeeModal';
import { useQuery } from '@tanstack/react-query';

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: '#0b2948',
      color: '#8ba1b7',
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#00458b',
        color: '#b6c8d9',
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

type Recipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
};

const ProgressDemo = ({ progress }: { progress: number }) => {
  return <Progress value={progress} className="w-[60%]" />;
};


export default function Category() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [rtl, setRtl] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(true);
  const [theme, setTheme] = React.useState<Theme>('dark');
  const [isActive, setIsActive] = useState(false);
  const [keyword, setKeyword] = useState(''); // Initialized as an empty string
  const [diet, setDiet] = useState('');
  const [type, setType] = useState(''); // Initialized as an empty string
  const [exclude, setExclude] = useState(''); // Initialized as an empty string // Stores the excluded ingredients
  const [response, setResponse] = useState(null); // Stores the response from the API
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [progress, setProgress] = useState(0);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const latestRequestToken = useRef<string | null>(null);

 
  // Fetch random recipes function
  const fetchRandomRecipes = async () => {
    try {
      setLoading(true);
      const res = await axios.get('api/random'); // Replace with your random recipes API endpoint
      const { data } = res;
      setRecipes(data.results);
      setIsSearch(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRandomRecipes();
  }, []);
  // Fetch search recipes function
  const fetchSearchRecipes = async () => {
    if (!keyword && !diet && !type && !exclude) {
      toast.warning('At least one search parameter must be provided.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  
    const { data } = await axios.get('api/search', {
      params: { keyword, diet, type, exclude },
    });
    return data.results;
  };

  const {
    data: searchRecipes,
    isLoading: isSearchLoading,
    isError: isSearchError,
    refetch: refetchSearchRecipes,
  } = useQuery(['searchRecipes', keyword, diet, type, exclude], fetchSearchRecipes, {
    enabled: false, // Only fetch when triggered manually
    onSuccess: (data) => {
      if (data && data.length > 0) {
        setRecipes(data); // Update the state with search results
        setIsSearch(true);
        toast.success('Recipes loaded successfully!', {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.warning('No recipes found. Please try different search criteria.', {
          position: "top-right",
          autoClose: 3000,
          
        });
        setIsSearch(false);

      }
    },
    onError: () => {
      toast.error('An error occurred while searching for recipes. Please try again later.', {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  useEffect(() => {
    fetchRandomRecipes(); // Fetch random recipes on component mount
  }, []);

  const handleCategoryClick = (category: string) => {
    setType(category);
    refetchSearchRecipes(); // Trigger the search recipes API call
  }
  // handle on theme change event
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasImage(e.target.checked);
  };

  const toggleHamburger = () => {
    setToggled(!toggled);
  };

  const openModal = (id: number) => {
    setSelectedRecipeId(id);
    setModalOpen(true);
  };

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1)
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div style={{ display: 'flex', height: '100%', direction: rtl ? 'rtl' : 'ltr' }}>
          <Sidebar 
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        rtl={rtl}
        breakPoint="md"
        backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
        rootStyles={{
          color: themes[theme].sidebar.color,
          position: "sticky",
          top: 0,
          left: 0, 
        }}>
  <div className="p-4 text-green-400 font-lobster">
  <h2 className="text-2xl font-semibold mb-4">Explore Our Menu</h2>
    <div className="mb-4">
      <Switch
        id="theme"
        checked={theme === 'dark'}
        onChange={handleThemeChange}
        label="Dark theme"
      />
    </div>
    <div className="mb-4">
      <Switch 
        id="image" 
        checked={hasImage} 
        onChange={handleImageChange} 
        label="Image" 
      />
    </div>
  </div>
  <Menu menuItemStyles={menuItemStyles}>
  {['Main Course', 'Side Dish', 'Dessert', 'Appetizer', 'Salad', 'Bread', 'Breakfast', 'Soup', 'Beverage', 'Sauce', 'Marinade', 'Fingerfood', 'Snack', 'Drink'].map((item) => (
      <MenuItem key={item} onClick={() => handleCategoryClick(item)}>
        {item}
      </MenuItem>
  ))}
</Menu>
          </Sidebar>
      <main>
        <div style={{ padding: '16px 5px', color: '#44596e' }}>
          <div style={{ marginBottom: '16px' }}>
            {broken && (
            <button
            className={`hamburger hamburger--collapse ${isActive ? 'is-active' : ''}`}
            type="button"
            onClick={toggleHamburger}
            aria-label="Menu"
            aria-controls="navigation"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
            )}
          </div>
          <div style={{ padding: '0 8px' }}>
            <div style={{ marginBottom: 16 }}>
              <Switch
                id="collapse"
                checked={collapsed}
                onChange={() => setCollapsed(!collapsed)}
                label="Collapse"
              />
            </div>


          </div>
        </div>
        <div className="flex flex-col md:px-12 px-0 relative bg-background font-raleway items-center min-h-screen">
      <h1 className="text-6xl font-bold text-active mt-0">
        Recipe Search
      </h1>
      <h2 className="text-primary text-2xl font-light mt-5">
        Search recipes from all over the world.
      </h2>
      {isSearch && (
        <button
  onClick={fetchRandomRecipes}
  className="mt-5 w-full rounded-lg px-5 py-3 bg-active text-base text-primary font-bold hover:text-active hover:bg-primary transition-colors duration-300 sm:px-10"
>
  Back to Random Recipes
</button>

      )}
      <form
        className="sm:mx-auto mt-0 md:max-w-4xl justify-center flex flex-col sm:w-full sm:flex"
        onSubmit={(e) => {
          e.preventDefault();
          refetchSearchRecipes();
        }}
      >
				<input
					type="text"
					className="flex w-full rounded-lg px-5 py-3 text-base text-background font-semibold focus:outline-none focus:ring-2 focus:ring-active"
					placeholder="Enter a recipe"
					onChange={e => {
						setKeyword(e.target.value);
						setResponse(null);
					}}
				/>
        <div className="mt-5 flex sm:flex-row flex-col justify-start">
          <div className="sm:w-1/3 w-full">
            <label className="block text-primary text-sm">Diet</label>
            <select
              className="mt-1 flex w-full rounded-lg px-5 py-3 text-base text-background font-bold focus:outline-none"
              onChange={(e) => setDiet(e.target.value)}
            >
              {['none', 'pescetarian', 'lacto vegetarian', 'ovo vegetarian', 'vegan', 'vegetarian'].map((diet) => (
                <option key={diet} value={diet}>
                  {diet}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:ml-10 sm:w-1/3 w-full">
            <label className="block text-primary text-sm">Exclude Ingredients</label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg px-5 py-3 text-base text-background font-bold focus:outline-none"
              placeholder="coconut"
              onChange={(e) => setExclude(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-5">
  <label className="block text-primary text-sm">Category</label>
  <select
    className="mt-1 w-full rounded-lg px-5 py-3 text-base text-background font-bold focus:outline-none"
    value={type}
    onChange={(e) => setType(e.target.value)}
  >
    {['none', 'Main Course', 'Side Dish', 'Dessert', 'Appetizer', 'Salad', 'Bread', 'Breakfast', 'Soup', 'Beverage', 'Sauce', 'Marinade', 'Fingerfood', 'Snack', 'Drink'].map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
</div>
				<button
					className="mt-5 w-full rounded-lg px-5 py-3 bg-active text-base text-primary font-bold hover:text-active hover:bg-primary transition-colors duration-300 sm:px-10"
					type="submit"
				>
					Search
				</button>
      </form>
 {loading || isSearchLoading ? (
          <div className="flex justify-center items-center h-screen">
            <ProgressDemo progress={80} />
          <p>Loading...</p>
          </div>
        ) : (
          <div className="mt-0">
            {isSearchError && !isSearch ? (
              <p className="text-red-500 text-center">
                Error loading recipes.
              </p>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="pt-6">
                    <div className="flow-root bg-light rounded-lg px-4 pb-8">
                      <div className="-mt-6">
                        <div className="flex items-center justify-center">
                          <span className="p-2">
                            <img
                              src={recipe.image}
                              className="w-full h-full rounded-lg"
                              alt={recipe.title}
                            />
                          </span>
                        </div>
                        <div className="text-center justify-center items-center">
                          <h3 className="mt-4 text-lg font-bold w-full break-words overflow-x-auto text-primary tracking-tight">
                            {recipe.title}
                          </h3>
                          <span className="mt-2 text-sm text-secondary block">
                            Ready in {recipe.readyInMinutes} minutes - {recipe.servings} Servings
                          </span>
                          <a className="mt-4 text-sm text-active block" href={recipe.sourceUrl}>
                            Go to Recipe
                          </a>
                          <button
                            onClick={() => openModal(recipe.id)}
                            className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
    {selectedRecipeId !== null && (
      <RecipeModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        recipeId={selectedRecipeId}
      />
    )}
  </div>
)
}