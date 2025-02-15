
const CategoriesCard = ({ Category, image, categoryColor,imageColor,onClick }) => {
  return (
    <section       onClick={onClick}

      className={`mt-5 w-56 h-24 flex transform transition-transform duration-300 hover:scale-110 space-x-4 justify-center items-center mr-5 rounded-md border border-gray shadow-md p-2 ${categoryColor}`}
    >
      <div className={`rounded-full ${imageColor} p-2`}>
        <img
          src={image}
          alt={`Category - ${Category}`}
          className="w-10 object-fit"
        />
      </div>
      <h1 className="mb-2 text-lg font-semibold">{Category}</h1>
    </section>
  );
};

export default CategoriesCard;
