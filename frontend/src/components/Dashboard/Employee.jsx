import React, { useState, useEffect } from 'react';
import Badge from "./Badge";

// Material UI imports
import Rating from '@material-ui/lab/Rating';

export default function Employee({ slugToString, getSlug }) {
  const [user, setUser] = useState();
  // Reviews state
  const [reviews, setReviews] = useState();
  // Which page of reviews we are showing
  const [page, setPage] = useState(1);

  // Get apt name slug
  function getAptSlug() {
    // Split URL by '/'
    const url = window.location.href.split('/');
    return url[url.length - 2];
  }

  // Get user
  function getUser() {
    fetch(`http://localhost:8080/users/${getSlug()}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data.user.name);
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  // Get reviews for user
  function getReviews() {
    fetch(`http://localhost:8080/reviews/${getAptSlug()}/${getSlug()}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setReviews(data.reviews);
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  useEffect(() => {
    getUser();
    getReviews();
  }, []);

  return (
    <div className='dashboard-employee-container'>
      <h1>{slugToString(getAptSlug())} Admin Portal</h1>
      {(user) && <h3>Feedback for {user}</h3>}

      {(reviews) && <>
        <Table
          reviews={reviews}
          page={page}
        />

        <Navigation
          page={page}
          setPage={setPage}
          pages={Math.floor(reviews.length / 10) + 1}
        />
      </>}
    </div>
  );
}

// Table
function Table({ reviews, page }) {
  // TODO: sort by date, rating

  // Only display the current page of reviews (10 per page)
  function displayTen() {
    const ten = reviews.filter((review, idx) => idx >= 10 * (page - 1) && idx < 10 * page);
    console.log(ten);
    return ten;
  }

  return (
    <div className='dashboard-employee-table'>
      <table>
        <tr>
          <th className='date'>
            Date
          </th>
          <th className='rating'>
            Rating
          </th>
          <th className='comments'>
            Comments
          </th>
        </tr>
        {displayTen().map((review, idx) => {
          return (
            <Row
              key={idx}
              idx={idx}
              date={review.created_date}
              rating={review.rating}
              comments={review.review}
              badges={(review.aptBadges) ? review.aptBadges.staff : []}
            />
          );
        })}
      </table>
    </div>
  );
}

// Row
function Row({ idx, date, rating, comments, badges }) {
  // Expand or not
  const [expand, setExpand] = useState(false);

  // Constrain comments to 200 characters
  function constrainComments() {
    if (comments) {
      if (comments.length < 90) return comments;
      else return comments.slice(0, 90) + " ... ";
    }
    return "N/A";
  }

  return (
    <>
    <tr className={(idx % 2 === 0) ? 'grey' : ''}>
      <td className='date'>
        {date}
      </td>
      <td className='rating'>
        <Rating
          name="rating-component"
          defaultValue={rating}
          precision={0.5}
          readOnly
          size="medium"
        />
      </td>
      <td className='comments'>
        {constrainComments()}
        {(!expand) ?
          <button onClick={() => setExpand(true)}>
            {"▼"}
          </button>
          :
          <button onClick={() => setExpand(false)}>
            {"▲"}
          </button>}
      </td>
    </tr>
    {(expand) && <ExpandedComments idx={idx} comments={comments} badges={badges} />}
    </>
  );
}

// Expanded comments section
function ExpandedComments({ idx, comments, badges }) {
  return (
    <tr className={(idx % 2 === 0) ? 'grey' : '' }>
      <td colspan='3'>
        <div className='expanded-comments'>
          <p>
            {comments}
          </p>
          <div className='dashboard-badge-container'>
            {badges.map((badge) => {
              return (
                <Badge number={""} text={badge} />
              );
            })}
          </div>
        </div>
      </td>
    </tr>
  );
}

// Navigation bar for table
// page = current page
// setPage = set current page
// pages = total number of pages
function Navigation({ page, setPage, pages }) {
  // Handle clicks
  function handleFirst() {
    setPage(1);
  }

  function handlePrev() {
    if (page != 1) setPage(page - 1);
  }

  function handleNext() {
    if (page != pages) setPage(page + 1);
  }

  function handleLast() {
    setPage(pages);
  }

  return (
    <div className='employee-navigation center'>
      <span className='most-left' onClick={handleFirst}>
        {"<< First "}
      </span>
      <span className='left' onClick={handlePrev}>
         {" < Prev "}
      </span>
      <span className='center'>
        {page} / {pages}
      </span>
      <span className='right' onClick={handleNext}>
        {" Next > "}
      </span>
      <span className='most-right' onClick={handleLast}>
        {" Last >>"}
      </span>
    </div>
  );
}
