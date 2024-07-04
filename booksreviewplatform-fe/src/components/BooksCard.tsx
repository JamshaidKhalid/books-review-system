import React, { useState } from 'react';
import { Genre, Review } from '../types';
import Modal from './Modal';
import StarRatings from 'react-star-ratings';
import { addReview } from '../services/books.service';
import Button from './Button';

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

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const averageRating = calculateAverageRating();

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
        <Button onClick={toggleReviewsModal}>Show Reviews</Button>
        <Button onClick={toggleAddReviewModal}>Add Review</Button>
        <Button onClick={{}}>Buy Book</Button>
      </div>

      {/* Modals */}
      {showReviewsModal && (
        <Modal closeModal={toggleReviewsModal}>
          <h2 className="text-xl font-bold mb-2">Reviews</h2>
          <div className="flex items-center mb-4">
            <StarRatings
              rating={averageRating}
              starRatedColor="#f8ca4d"
              starEmptyColor="#cbd5e0"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="2px"
            />
            <span className="ml-2 text-lg font-semibold text-gray-700">
              {averageRating.toFixed(1)} / 5
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="border p-2 rounded-md">
                  <div className="flex items-center">
                    <StarRatings
                      rating={review.rating}
                      starRatedColor="#f8ca4d"
                      starEmptyColor="#cbd5e0"
                      numberOfStars={5}
                      starDimension="16px"
                      starSpacing="1px"
                    />
                    <strong className="ml-2 text-gray-800">Rating: {review.rating}</strong>
                  </div>
                  <p className="text-gray-700 mt-1">{review.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700 text-center">No reviews yet. Be the first to review this book!</p>
            )}
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
          <Button onClick={handleAddReview}>Submit Review</Button>
        </Modal>
      )}
    </div>
  );
};

export default BookCard;
