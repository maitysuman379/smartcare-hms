import { useEffect, useState } from "react";
import { getPublicReviews } from "../services/api";

function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

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

  if (error || reviews.length === 0) {
    return null;
  }

  // Show only the first 6 reviews initially.
  // On mobile, CSS will handle the single-column layout.
  const visibleReviews = showAll ? reviews : reviews.slice(0, 6);

  return (
    <section id="reviews" className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-heading">
          <span className="reviews-eyebrow">Patient & Doctor Reviews</span>

          <h2>What Our Users Say</h2>

          <p>Real experiences from people using SmartCare HMS.</p>
        </div>

        <div className="reviews-grid">
          {visibleReviews.map((item) => (
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

        {reviews.length > 6 && (
          <div className="reviews-more-wrapper">
            <button
              type="button"
              className="reviews-more-btn"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less Reviews" : "Show More Reviews"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ReviewSection;
