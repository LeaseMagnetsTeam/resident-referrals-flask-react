// Backend returns this json
// const apt_template = {
//   id: 12345,
//   aptName: 'The George',
//   image: 'https://photos.zillowstatic.com/fp/f675a3f5ab964e2441d24672fd1cc615-p_e.jpg',
//   reviewLink: 'http://search.google.com/local/writereview?placeid=ChIJx41ywWL6MIgRT5xaRhoEI9g'
// };

// Landing page '/'
const question_template = {
  id: 12345,
  question: 'How did you end up at',
  answers: [
    {
      id: 34142,
      text: 'Just toured the community',
      nextURL: '/toured-community'
    },
    {
      id: 34142,
      text: 'Finished signing a lease',
      nextURL: '/signed-lease'
    },
    {
      id: 34142,
      text: 'My maintenance request was completed',
      nextURL: '/maintenance-completed'
    },
    {
      id: 34142,
      text: 'Other',
      nextURL: '/special-offer'
    }
  ]
};

// 2nd question if 'maintenance request' is selected
const question_template2 = {
  id: 12345,
  question: 'Who completed your maintenance request at',
  answers: [
    // {
    //   text: 'Jonathan Chuang',
    //   nextURL: '/special-offer'
    // },
    // {
    //   text: 'Jonathan Chuang',
    //   nextURL: '/special-offer'
    // },
    // {
    //   text: 'Jonathan Chuang',
    //   nextURL: '/special-offer'
    // },
    // {
    //   text: 'Jonathan Chuang',
    //   nextURL: '/special-offer'
    // },
    // {
    //   text: 'Not sure/Other',
    //   nextURL: '/special-offer'
    // }
  ]
};

// 2nd question if 'toured the community' is selected
const question_template3 = {
  id: 87654,
  question: 'Who did you tour with at',
  answers: [
    // {
    //   text: 'Amulya Parmar',
    //   nextURL: '/special-offer'
    // },
    // {
    //   text: 'Amulya Parmar',
    //   nextURL: '/special-offer'
    // },
    // {
    //   text: 'Amulya Parmar',
    //   nextURL: '/special-offer'
    // },
    // {
    //   text: 'Amulya Parmar',
    //   nextURL: '/special-offer'
    // },
    // {
    //   text: 'Not sure/Other',
    //   nextURL: '/special-offer'
    // }
  ]
};

// 2nd question if 'signed lease' is selected
const question_template4 = {
  id: 87654,
  question: 'Congrats! Who helped you sign your lease at',
  answers: [
    // {
    //   text: 'Brandon Rea',
    //   nextURL: '/special-offer'
    // },
    // {
    //   text: 'Brandon Rea',
    //   nextURL: '/special-offer'
    // },
    // {
    //   text: 'Brandon Rea',
    //   nextURL: '/special-offer'
    // },
    // {
    //   text: 'Not sure/Other',
    //   nextURL: '/special-offer'
    // }
  ]
};

// 3rd question if 'Amulya Parmar' is selected
const question_template1 = {
  id: 65432,
  question: 'Would you be willing to leave us a review of your experience at',
  answers: [
    {
      id: 34142,
      text: 'Yes!',
      nextURL: '/give-review'
    },
    {
      id: 34142,
      text: 'No, I did not have a memorable experience.',
      nextURL: '/exit-page'
    }
  ]
};

export {
  //apt_template,
  question_template,
  question_template1,
  question_template2,
  question_template3,
  question_template4
};
