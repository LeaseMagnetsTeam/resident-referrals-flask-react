import React, { useState, useEffect } from 'react';
import { Nav, Site, Button, Card} from 'tabler-react';
// import firebase from '../utils/base';

// const logo = require('../../images/');

const Navbar = () => {
  const [name, setName] = useState('John Whittaker');

//   const loadName = async (uid) => {
//     try {
//       const doc = await firebase.db.collection('users').doc(uid).get();

//       if (doc.exists) {
//         setName(doc.data().name);
//       }
//     } catch (err) {
//       console.log('Error getting document:', err);
//     }
//   };
//   useEffect(() => {
//     loadName(firebase.uid());
//   }, [firebase.uid()]);

  const accountDropdownProps = {
    avatarURL: 'http://tabler-react.com/demo/faces/female/25.jpg',
    name,
    description: 'Administrator',
    options: [
      { icon: 'user', value: 'Profile' },
      { icon: 'settings', value: 'Settings' },
      { icon: 'mail', value: 'Inbox', badge: '6' },
      { icon: 'send', value: 'Message' },
      { isDivider: true },
      { icon: 'help-circle', value: 'Need help?' },
      { icon: 'log-out', value: 'Sign out', to: 'signout' },
    ],
  };

  const items = (
    <Nav>
      <Nav.Item active value="Home" icon="globe" />

      <Nav.Item icon="plus" to="/">
        Add
      </Nav.Item>
    </Nav>
  );

  return (
    <div className="navbar-menu">
      <Card>
      <Site.Header
        imageURL={"https://pngimg.com/uploads/hammer/hammer_PNG3890.png"}
        href="/"
        accountDropdown={accountDropdownProps}
        align="left"
      />

      <Site.Nav items={items} />
      {/* <Site.Header
        // imageURL={"https://images.homedepot-static.com/productImages/4332845b-7fd0-439f-b43b-45bbe58115c9/svn/anvil-claw-hammers-n-g16cav-64_1000.jpg"}
        href="/"
        children={(
            <>
            <Button.List>
                <Button outline color="primary">
                    color='primary'
                </Button>
                <Button outline color="secondary">
                    color='secondary'
                </Button>
                <Button outline color="success">
                    color='success'
                </Button>
                <Button outline color="info">
                    color='info'
                </Button>
                <Button outline color="warning">
                    color='warning'
                </Button>
                <Button outline color="danger">
                    color='danger'
                </Button>
            </Button.List>
            </>
        )}
        align="left"
      /> */}
      </Card>
    </div>
  );
};

export default Navbar;
