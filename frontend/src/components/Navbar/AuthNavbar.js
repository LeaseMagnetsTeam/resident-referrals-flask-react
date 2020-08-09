import React, { useState, useEffect } from 'react';
import { Card, Nav, Site, Button } from 'tabler-react';

// const logo = require('../../images/');

const Navbar = () => {

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
        // imageURL={"https://images.homedepot-static.com/productImages/4332845b-7fd0-439f-b43b-45bbe58115c9/svn/anvil-claw-hammers-n-g16cav-64_1000.jpg"}
        href="/"
        children={(
            <>
                Project
            </>
        )}
        align="left"
      />

      <Site.Nav items={items} />

      </Card>
    </div>
  );
};

export default Navbar;
