// import React, { useState } from 'react';
// import { Grid, Button, Card, Container, Page, Form, Text } from 'tabler-react';
// import { Link } from 'react-router-dom';
// // import classes from './Auth.module.css';
// // import 'tabler-react/dist/Tabler.css';
// // import firebase from '../../utils/base';
//
// export const SignIn = () => {
//   // User Input States
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   // Validate Inputs
//   const isValid = !email || !password;
//
//   const onSignIn = (e) => {
//     e.preventDefault();
//
//     if (isValid) {
//       console.log("Input fields couldn't be empty");
//       return;
//     }
//
//     // firebase.auth
//     //   .signInWithEmailAndPassword(email, password)
//     //   .then((user) => console.log(user))
//     //   .catch((err) => console.log(err));
//
//   };
//
//   return (
//     <div className="SignIn">
//       <Grid.Row className={classes.ctr}>
//         <Grid.Col className={classes.right}>
//           <Page>
//             <div className="page-single">
//               <Container>
//                 <Grid.Row>
//                   <Grid.Col className={`mx-auto ${classes.login}`}>
//                     <h2 style={{ fontFamily: 'Poppins', color: 'white' }}>
//                       {' '}
//                       🧲 LeaseMagnets{' '}
//                     </h2>
//
//                     <Card>
//                       <Card.Body>
//                         <Card.Title>Sign in to your account</Card.Title>
//                         <Form onSubmit={onSignIn}>
//                           <Form.Input
//                             name="email"
//                             label="Email"
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                           />
//                           <Form.Input
//                             type="password"
//                             name="password"
//                             label="Password"
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                           />
//                           <Button block color="primary mt-6 mb-6">
//                             Continue
//                           </Button>
//                           <Text className="text-center">
//                             Don&apos;t have an account?{' '}
//                             {/* <Link to="/signup" className="font-weight-bold">
//                               Sign Up
//                             </Link> */}
//                           </Text>
//                           <Text className="text-center">
//                             Trouble logging in?{' '}
//                             {/* <Link
//                               to="/resetpassword"
//                               className="font-weight-bold"
//                             >
//                               Reset Password
//                             </Link> */}
//                           </Text>
//                         </Form>
//                       </Card.Body>
//                     </Card>
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
