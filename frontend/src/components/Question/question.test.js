// Backend returns this json
const apt_template = {
  id: 12345,
  name: 'The George',
  image: 'https://photos.zillowstatic.com/fp/f675a3f5ab964e2441d24672fd1cc615-p_e.jpg',
  review_link: 'http://search.google.com/local/writereview?placeid=ChIJx41ywWL6MIgRT5xaRhoEI9g'
};

// Landing page '/'
const question_template = {
  id: 12345,
  question: 'How did you end up here?',
  answers: [
    {
      text: 'Just toured the community',
      nextURL: '/toured-community'
    },
    {
      text: 'Finished signing a lease',
      nextURL: '/toured-community'
    },
    {
      text: 'My maintenance request was completed',
      nextURL: '/toured-community'
    },
    {
      text: 'Other',
      nextURL: '/special-offer'
    }
  ]
};

// 2nd question if 'toured the community' is selected
const question_template3 = {
  id: 87654,
  question: 'Who did you tour with?',
  answers: [
    {
      text: 'Amulya Parmar',
      nextURL: '/special-offer'
    },
    {
      text: 'Amulya Parmar',
      nextURL: '/special-offer'
    },
    {
      text: 'Amulya Parmar',
      nextURL: '/special-offer'
    },
    {
      text: 'Amulya Parmar',
      nextURL: '/special-offer'
    },
    {
      text: 'Amulya Parmar',
      nextURL: '/special-offer'
    }
  ]
};

// 3rd question if 'Amulya Parmar' is selected
const question_template1 = {
  id: 65432,
  question: 'Would you be willing to leave us a review of your experience at The George with Amulya Parmar?',
  answers: [
    {
      text: 'Yes!',
      nextURL: '/give-review'
    },
    {
      text: 'No thank you',
      nextURL: '/exit-page'
    }
  ]
};

// 4th question if 'No thank you' is selected
// const question_template2 = {
//   id: 98765,
//   question: 'Would you be willing to leave us a review of The George?',
//   answers: [
//     {
//       text: 'Yes!',
//       nextURL: 'http://search.google.com/local/writereview?placeid=ChIJx41ywWL6MIgRT5xaRhoEI9g'
//     },
//     {
//       text: 'No thank you',
//       nextURL: '/exit-page'
//     }
//   ]
// };

export {
  apt_template,
  question_template,
  question_template1,
  // question_template2,
  question_template3
};
