// import React, { useState, useEffect } from 'react';
// import { Grid, Container, Page, Site } from 'tabler-react';
// // import classes from './Auth.module.css';
// // import 'tabler-react/dist/Tabler.css';
// import { Card } from 'tabler-react';
//
// // import exampleCommunities from '../../example_data.json';
//
// // const LeasemagnetsLogo = require('../../assets/leasemagnets-logo.png');
//
// export const SignUp = (props) => {
//   const [signupStep, setSignupStep] = useState(1);
//
//
//   useEffect(() => {
//     if (props.signupStep) {
//       console.log('signup step was: ', signupStep);
//       setSignupStep(props.signupStep);
//       console.log('signup step is now: ', signupStep);
//     }
//   }, []);
//
//   return (
//     <div className="SignUp">
//       <Site.Header imageURL={""} href="/" align="left" />
//
//       <Grid.Row className={classes.ctr}>
//         {/* Left Side Of Page */}
//         <Grid.Col className={classes.left}>
//           <Page>
//             <div className="page-single">
//               <Container>
//                 <Grid.Row>
//                   <Grid.Col className={`mx-auto ${classes.signup}`}>
//                     {signupStep === 1 && (
//                       <>
//                         <Card>
//                         <br/> <br/>
//                           This was a test <br/> <br/>
//                           This was a test <br/> <br/>
//                           This was a test <br/> <br/>
//                           This was a test <br/> <br/>
//                           This was a test <br/> <br/>
//                           This was a test <br/> <br/>
//                           <br/>
//                         </Card>
//                       </>
//                     )}
//                   </Grid.Col>
//                 </Grid.Row>
//               </Container>
//             </div>
//           </Page>
//         </Grid.Col>
//
//         {/* Righ Side of Page */}
//         <Grid.Col className={classes.right}>
//           <div className={classes.featuredContent}>
//             <div style={{ width: '80%' }}>
//               <div className={classes.featuredTrialHeader}>
//                 Build your own LeaseMagnets
//               </div>
//               <p>
//                 “...Gave me a true virtual leasing advantage - best marketing
//                 decision have ever made &amp; the free trial made it a no
//                 brainer.”
//               </p>
//               <br />
//               <div className={classes.featuredWebsiteLink}>
//                 <a
//                   href="https://bankierapartments.com"
//                   target="_blank"
//                   rel="noreferrer"
//                   style={{ textDecoration: 'none', color: 'white' }}
//                 >
//                   BANKIERAPARTMENTS.COM
//                 </a>
//               </div>
//             </div>
//
//             <div className={classes.featuredPerson}>
//               <span style={{ fontWeight: 'bold', opacity: '0.8' }}>
//                 Kierra Morris
//               </span>
//               <br />
//               <span style={{ opacity: '0.5' }}>Property Manager</span>
//             </div>
//           </div>
//         </Grid.Col>
//       </Grid.Row>
//     </div>
//   );
// };
