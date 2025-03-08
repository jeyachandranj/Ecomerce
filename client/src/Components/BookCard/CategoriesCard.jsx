const CategoriesCard = ({ Category, categoryColor, onClick }) => {
  return (
    <section
      onClick={onClick}
      className={`mt-5 ml-3 w-56 h-24 flex transform transition-transform duration-300 hover:scale-110 space-x-4 justify-center items-center mr-5 rounded-md border border-gray shadow-md p-2 ${categoryColor}`}
    >
      <h1 className="mb-2 text-2xl font-semibold">{Category}</h1>
    </section>
  );
};

export default CategoriesCard;
