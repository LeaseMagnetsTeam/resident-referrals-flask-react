import React, { useState, useEffect } from 'react';
import QRCode from './QRCode';
import AptFeedback from './AptFeedback';
import StaffFeedback from './StaffFeedback';
import Badge from './Badge';

// Material UI Imports
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import './dashboard.css';

export default function Dashboard({ getApartment, getSlug }) {
  const [apt, setApt] = useState();
  // TODO: Get leasing staff from backend
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: "Amulya Parmar"
    },
    {
      id: 2,
      name: "Amulya Parmar"
    },
    {
      id: 3,
      name: "Amulya Parmar"
    },
    {
      id: 4,
      name: "Jonathan Chuang"
    },
    {
      id: 5,
      name: "Jonathan Chuang"
    },
    {
      id: 6,
      name: "Jonathan Chuang"
    },
  ]);
  const [maintenance, setMaintenance] = useState([
    {
      id: 4,
      name: "Jonathan Chuang"
    },
    {
      id: 5,
      name: "Jonathan Chuang"
    },
    {
      id: 6,
      name: "Jonathan Chuang"
    },
  ]);

  // Get leasing/maintenance staff
  // setState = setter function
  // slug = aptName slug
  // staff = "Staff" or "Maintenance"
  function getStaff(setState, slug, staff) {
    fetch(`http://localhost:8080/users/${slug}/${staff}`)
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

  // TODO: GET reviews

  // Which tab user is on
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    getApartment(setApt, getSlug());
    getStaff(setStaff, getSlug(), "Staff");
    getStaff(setMaintenance, getSlug(), "Maintenance");
  }, []);

  return (
    <>
    {(apt) &&
    <div className='dashboard-container'>
      <h1>{apt.aptName} Admin Portal</h1>

      <div className='float-left'>
        <QRCode link={`http://localhost:3000/survey/${getSlug()}`} />
      </div>

      <div className='float-right'>
        <AptFeedback apt={apt} />
      </div>

      <div>
        <h1>Staff Feedback</h1>

        <div className='dashboard-badge-container'>
          <Badge number={10} text={"friendly"} />
          <Badge number={90} text={"rude"} />
        </div>

        <AppBar position="static">
          <Tabs value={tab} onChange={handleTabChange} aria-label="simple tabs example">
            <Tab label="Leasing Staff" {...a11yProps(0)} />
            <Tab label="Maintenance Staff" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={tab} index={0}>
          <StaffFeedback
            employees={staff}
            aptName={apt.aptName}
            route={"Staff"}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <StaffFeedback
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
