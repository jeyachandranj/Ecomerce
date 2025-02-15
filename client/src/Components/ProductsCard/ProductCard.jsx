import Cart from '../../assets/cart.png';
import { useNavigate } from 'react-router-dom';
import './card.css';

const ProductCard = ({ title, author, price, book, coverImage }) => {
  const navigate = useNavigate();

  return (
    <section className="cardContainer">
      <div className="cardImage">
        <img src={coverImage} className="cardImage" alt={`${title} cover`} />
      </div>
      <div className="cardBody">
        <div className="prodCardDesc">
          <h3 className="prodCardTitle">
            {title} - {author}
          </h3>
          <h3 className="prodCardPrice">₹{price}</h3>
          <div className="buyContainer">
            <button
              onClick={() =>
                navigate('/productpage', {
                  state: { title, author, price, book, coverImage },
                })
              }
              className="Signup"
            >
              Buy Now
            </button>
            <button className="addCart Login border border-black ">
              <img src={Cart} className="cartIcon" alt="Cart Icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
