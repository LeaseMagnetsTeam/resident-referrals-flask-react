import React, { useState, useEffect } from 'react';
import QRCode from './QRCode';
import AptFeedback from './AptFeedback';
import StaffFeedback from './StaffFeedback';
import Badge from './Badge';
import Settings from './Settings';

// Material UI Imports
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import HOST from '../../utils/request.js';

import './dashboard.css';

export default function Dashboard({ getApartment, getSlug }) {
  const [apt, setApt] = useState();
  const [staff, setStaff] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [staffBadges, setStaffBadges] = useState();
  const [aptBadges, setAptBadges] = useState();

  // Get leasing/maintenance staff
  // setState = setter function
  // slug = aptName slug
  // staff = "Staff" or "Maintenance"
  function getStaff(setState, staff) {
    fetch(`${HOST}/users/${getSlug()}/${staff}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setState(data.users);
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  // GET badges with counts
  function getBadges(setState, type) {
    fetch(`${HOST}/badges/${getSlug()}/${type}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setState(data.badges);
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  // Which tab user is on
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    getApartment(setApt, getSlug());
    getStaff(setStaff, "Staff");
    getStaff(setMaintenance, "Maintenance");
    getBadges(setStaffBadges, "staff");
    getBadges(setAptBadges, "apartment");
  }, []);

  return (
    <>
    {(apt) &&
    <div className='dashboard-container'>
      <h1>
        {apt.aptName} Admin Portal
        <Settings
          apt_id={apt.id}
          specialOffer={apt.specialOffer}
          aptBadges={apt.aptBadges.apt}
          staffBadges={apt.aptBadges.staff}
        />
      </h1>

      <div className='float-left'>
        <QRCode link={`https://residents.me/survey/${getSlug()}`} />
      </div>

      <div className='float-right'>
        {(aptBadges) && <AptFeedback apt={apt} badges={aptBadges} />}
      </div>

      <div>
        <h1>Staff Feedback</h1>

        <div className='dashboard-badge-container'>
          {(staffBadges) && Object.entries(staffBadges).map(([key,value]) => {
            return (
                <Badge number={value} text={key.toLowerCase()} />
            );
          })}
        </div>

        <AppBar position="static">
          <Tabs value={tab} onChange={handleTabChange} aria-label="simple tabs example">
            <Tab label="Leasing Staff" {...a11yProps(0)} />
            <Tab label="Maintenance Staff" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={tab} index={0}>
          <StaffFeedback
            getSlug={getSlug}
            employees={staff}
            aptName={apt.aptName}
            route={"Staff"}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <StaffFeedback
            getSlug={getSlug}
            employees={maintenance}
            aptName={apt.aptName}
            route={"Maintenance"}
          />
        </TabPanel>
      </div>
    </div>}
    </>
  );
}

// Material UI code for tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
