import { useEffect, useState } from "react";
import { getPublicReviews } from "../services/api";

function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getPublicReviews();
        setReviews(data.reviews || []);
      } catch (err) {
        console.error("Failed to load reviews:", err);
        setError("Unable to load reviews");
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  if (loading) {
    return (
      <section id="reviews" className="reviews-section">
        <div className="reviews-container">
          <p className="reviews-loading">Loading reviews...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return null;
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section id="reviews" className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-heading">
          <span className="reviews-eyebrow">Patient & Doctor Reviews</span>

          <h2>What Our Users Say</h2>

          <p>Real experiences from people using SmartCare HMS.</p>
        </div>

        <div className="reviews-grid">
          {reviews.map((item) => (
            <article className="review-card" key={item.id}>
              <div
                className="review-stars"
                aria-label={`${item.rating} out of 5 stars`}
              >
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
              </div>

              <p className="review-text">“{item.review}”</p>

              <div className="review-user">
                {item.profile_image ? (
                  <img
                    src={item.profile_image}
                    alt={item.username}
                    className="review-avatar"
                  />
                ) : (
                  <div className="review-avatar review-avatar-fallback">
                    {item.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <div>
                  <h4>{item.username}</h4>
                  <span>SmartCare HMS User</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewSection;
