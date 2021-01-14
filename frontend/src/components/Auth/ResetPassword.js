// import React, { useState } from 'react';
// import { Grid, Button, Card, Container, Page, Form, Text } from 'tabler-react';
// import { Link } from 'react-router-dom';
// // import classes from './Auth.module.css';
// // import 'tabler-react/dist/Tabler.css';
// // import firebase from '../../utils/base';∫
//
// const ResetPassword = () => {
//   const [email, setEmail] = useState('');
//   const [resetPasswordMessage, setResetPassMessage] = useState(
//     <>Enter your email to reset your password</>
//   );
//
//   const onPassReset = (e) => {
//     e.preventDefault();
//     setResetPassMessage(
//       <>A magnet is fetching your email address from our records</>
//     );
//
//     // firebase.auth
//     //   .sendPasswordResetEmail(email)
//     //   .then(function () {
//     //     console.log('email pass reset successful: ', email);
//     //   })
//     //   .catch(function (error) {
//     //     console.log('email pass reset failed: ', error);
//     //   });
//
//     setResetPassMessage(
//       <>
//         A magnet is fetching your email address from our records. <br /> If an
//         email is found on file, a reset password email has been been sent
//       </>
//     );
//   };
//
//   return (
//     <div className="ResetPassword">
//       <Grid.Row className={classes.ctr}>
//         <Grid.Col className={classes.right}>
//           <Page>
//             <div className="page-single">
//               <Container>
//                 <Grid.Row>
//                   <Grid.Col className={`mx-auto ${classes.login}`}>
//                     <h2 style={{ fontFamily: 'Poppins', color: 'white' }}>
//                       🧲 LeaseMagnets | Reset Password
//                     </h2>
//
//                     <Card>
//                       <Card.Body>
//                         <Card.Title>{resetPasswordMessage}</Card.Title>
//                         <Form onSubmit={onPassReset}>
//                           <Form.Input
//                             name="email"
//                             label="Email"
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                           />
//                           <Button block color="primary mt-6 mb-6">
//                             Reset Password
//                           </Button>
//                           <Text className="text-center">
//                             Don&apos;t have an account?{' '}
//                             {/* <Link to="/signup" className="font-weight-bold">
//                               Sign Up
//                             </Link> */}
//                           </Text>
//                         </Form>
//                         <Text className="text-center">
//                           Already have an account?{' '}
//                           {/* <Link to="/" className="font-weight-bold">
//                             Sign In
//                           </Link> */}
//                         </Text>
//                       </Card.Body>
//                     </Card>
//
//                   </Grid.Col>
//                 </Grid.Row>
//               </Container>
//             </div>
//           </Page>
//         </Grid.Col>
//       </Grid.Row>
//     </div>
//   );
// };
//
// export default ResetPassword;
