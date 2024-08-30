import React, { useEffect, useState } from "react";
import "./Reviews.css";
import Loading from "./Loading";
import { url } from "../url";

function Reviews({ newReview }) {
  const [reviews, setReviews] = useState([]);
  const [reviewsDate, setReviewsDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchReviews = async () => {
    setLoading((prev) => !prev);
    try {
      const response = await fetch(`${url}/reviews/getAllReviews`);
      const resData = await response.json();
      if (!response.ok) {
        console.log(resData.message);
      }
      setReviews(resData.review);
    } catch (error) {
      console.log(error);
    }
    setLoading((prev) => !prev);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const dates = reviews.map((review) => {
        const date = new Date(review.createdAt);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      });
      setReviewsDate(dates);
    }
  }, [reviews]);
  useEffect(() => {
    console.log(newReview);
    if (newReview) setReviews((prev) => [...prev, newReview]);
  }, [newReview]);

  return (
    <div className="reviewsCont">
      {loading && (
        <h1>
          <Loading />
        </h1>
      )}
      {reviews.length < 1 && !loading ? (
        <h1>NO REVIEWS YET</h1>
      ) : (
        reviews.map((review, i) => {
          return (
            <div className="d-flex justify-content-center py-2">
              <div className="second py-2 px-2">
                <span className="text1">{review.review.toUpperCase()}</span>
                <div className="d-flex justify-content-between py-1 pt-2">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <span className="text2">{review.userId.name}</span>
                    <span className="date">{`  ${reviewsDate[i]}`}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Reviews;
