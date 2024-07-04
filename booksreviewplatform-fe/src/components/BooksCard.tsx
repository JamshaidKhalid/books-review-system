import React, { useState } from 'react';
import { Genre, Review } from '../types';
import Modal from './Modal';
import StarRatings from 'react-star-ratings';
import { addReview } from '../services/books.service';

interface BookCardProps {
  id: number;
  coverImage: string;
  title: string;
  author: string;
  publication_date: string;
  genres: Genre[];
  reviews: Review[];
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  coverImage,
  title,
  author,
  publication_date,
  genres,
  reviews: initialReviews,
}) => {
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [addReviewModal, setAddReviewModal] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const toggleReviewsModal = () => {
    setShowReviewsModal(!showReviewsModal);
  };

  const toggleAddReviewModal = () => {
    setAddReviewModal(!addReviewModal);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleAddReview = async () => {
    if (rating && reviewText) {
      const newReview = await addReview(id, rating, reviewText);
      setReviews([...reviews, newReview]);
      setRating(0);
      setReviewText('');
      setAddReviewModal(false);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <img className="w-full h-64 object-cover" src={coverImage} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">by {author}</p>
        <p className="text-gray-700 text-base">Published on {publication_date}</p>
        <div className="text-gray-700 text-base">
          Genres: {genres.map((genre) => genre.name).join(', ')}
        </div>
      </div>
      <div className="flex justify-between px-2 py-2 my-1">
        <button
          onClick={toggleReviewsModal}
          className="bg-white hover:bg-black hover:text-white text-black font-normal mx-1 py-1 px-2 border border-black rounded transition duration-300 ease-in-out"
        >
          Show Reviews
        </button>
        <button
          onClick={toggleAddReviewModal}
          className="bg-white hover:bg-black hover:text-white text-black font-normal mx-1 py-1 px-2 border border-black rounded transition duration-300 ease-in-out"
        >
          Add Review
        </button>
        <button className="bg-white hover:text-white hover:bg-black text-black font-normal mx-1 py-1 px-2 border border-black rounded transition duration-300 ease-in-out">
          Buy Book
        </button>
      </div>

      {/* Modals */}
      {showReviewsModal && (
        <Modal closeModal={toggleReviewsModal}>
          <h2 className="text-xl font-bold mb-2">Reviews</h2>
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <div key={review.id}>
                <strong>Rating: {review.rating}</strong>
                <p>{review.text}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {addReviewModal && (
        <Modal closeModal={toggleAddReviewModal}>
          <h2 className="text-xl font-bold mb-2">Add Review</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rating:
            </label>
            <StarRatings
              rating={rating}
              starRatedColor="#f8ca4d"
              starEmptyColor="#cbd5e0"
              starHoverColor="#fbbf24"
              changeRating={handleRatingChange}
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="2px"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Review:
            </label>
            <textarea
              className="border-gray-800 rounded-md shadow-sm w-full h-32 p-2"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
          <button
            onClick={handleAddReview}
            className="bg-white hover:text-white hover:bg-black text-black font-normal mx-1 py-1 px-2 border border-black rounded transition duration-300 ease-in-out"
          >
            Submit Review
          </button>
        </Modal>
      )}
    </div>
  );
};

export default BookCard;
