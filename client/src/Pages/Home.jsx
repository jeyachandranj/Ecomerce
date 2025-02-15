import React, { useEffect, useState } from "react";
import Navigation from "../Components/TopNavigation/Navigation";
import CardBanner from "../Components/CardBanner/CardBanner";
import BookCard from "../Components/BookCard/BookCard";
import CategoriesCard from "../Components/BookCard/CategoriesCard";
import space from "../assets/space.png";
import rocket from "../assets/rocket.png";
import mortarboard from "../assets/mortarboard.png";
import history from "../assets/history.png";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleSort = (order) => {
    const sortedBooks = [...filteredBooks].sort((a, b) => {
      if (order === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setFilteredBooks(sortedBooks);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    const updatedBooks = category === "All" 
      ? books 
      : books.filter((book) => book.category === category);
    setFilteredBooks(updatedBooks);
  };

  const handleSearch = (query) => {
    const updatedBooks = books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(updatedBooks);
  };

  return (
    <>
      <Navigation OnSearch={handleSearch} onSort={handleSort} />
      <section className="main mt-20">
        <div className="Home">
          <div className="mt-10">
            <CardBanner />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mt-10 font-poppins">
              Categories
            </h2>
            <div className="flex">
              <CategoriesCard
                Category="All"
                image={space}
                categoryColor="bg-red-300"
                imageColor="bg-red-400"
                onClick={() => handleCategorySelection("All")}
              />
              <CategoriesCard
                Category="Scientific"
                image={rocket}
                categoryColor="bg-blue-300"
                imageColor="bg-blue-600"
                onClick={() => handleCategorySelection("Scientific")}
              />
              <CategoriesCard
                Category="Education"
                image={mortarboard}
                categoryColor="bg-yellow-300"
                imageColor="bg-amber-400"
                onClick={() => handleCategorySelection("Education")}
              />
              <CategoriesCard
                Category="Fictional"
                image={space}
                categoryColor="bg-pink-300"
                imageColor="bg-pink-400"
                onClick={() => handleCategorySelection("Fictional")}
              />
              <CategoriesCard
                Category="Novel"
                image={history}
                categoryColor="bg-green-300"
                imageColor="bg-green-400"
                onClick={() => handleCategorySelection("Novel")}
              />
            </div>
          </div>

          <div className="prodGrid mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[40px]">
            {filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                BookTitle={book.title}
                Author={book.author}
                Price={book.price}
                BookImage={book.image}
                Rating={book.rating}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;