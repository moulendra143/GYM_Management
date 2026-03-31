import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import memberService from '../../services/memberService';
import toast from 'react-hot-toast';

const Feedback = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }
        setSubmitting(true);
        try {
            const response = await memberService.submitFeedback({ rating, comment });
            if (response.success) {
                toast.success('Thank you for your feedback!');
                setRating(0);
                setComment('');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Failed to submit feedback');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Feedback</h1>
                <p className="text-gray-600 mt-2">Share your experience and suggestions with us.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            How would you rate your experience?
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    className="focus:outline-none"
                                >
                                    <FaStar
                                        className={`text-3xl ${(hover || rating) >= star ? 'text-yellow-500' : 'text-gray-300'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Comments / Suggestions
                        </label>
                        <textarea
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Tell us what you liked or how we can improve..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {submitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;