import React, { useState } from 'react'
import Components from '../../shared/components/export'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Star } from 'lucide-react'

const Review: React.FC = () => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [reviewText, setReviewText] = useState('')

  const handleSubmit = () => {
    if (rating === 0 || reviewText.trim() === '') {
      toast.error('Please provide a rating and review.')
      return
    }
    toast.success('Review submitted successfully!')
    setRating(0)
    setReviewText('')
  }

  return (
    <>
      <Components.navbar />
      <ToastContainer position="top-center" />
      <div className="max-w-xl mx-auto  p-6 mt-10 border border-black/15 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Leave a Review</h2>

        {/* Star Rating */}
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-8 h-8 cursor-pointer transition-colors ${
                (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              fill={(hover || rating) >= star ? 'currentColor' : 'none'}
            />
          ))}
        </div>

        {/* Review Input */}
        <textarea
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your review here..."
          rows={4}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        {/* Submit Button */}
        <button
          className="mt-4 w-full bg-gradient-to-r from-[#2784B8] to-[#113B52] hover:bg-[#1f6b96] text-white font-medium py-2 rounded-md transition"
          onClick={handleSubmit}
        >
          Submit Review
        </button>
      </div>
    </>
  )
}

export default Review
