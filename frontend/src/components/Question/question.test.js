// Backend returns this json
const apt_template = {
  id: 12345,
  name: 'The George',
  image: 'https://photos.zillowstatic.com/fp/f675a3f5ab964e2441d24672fd1cc615-p_e.jpg'
};

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
      nextURL: '/signed-lease'
    },
    {
      text: 'My maintence request was just completed',
      nextURL: '/maintence-request'
    },
    {
      text: 'Other',
      nextURL: '/other'
    }
  ]
};

export {
  apt_template,
  question_template
};
