import React, { useState } from 'react';
import QRCode from './QRCode';
import AptFeedback from './AptFeedback';
import StaffFeedback from './StaffFeedback';

// Material UI Imports
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import './dashboard.css';

export default function Dashboard() {
  // TODO: Get leasing staff from backend
  const [staff] = useState([
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
  const [maintenance] = useState([
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


  // Which tab user is on
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div className='dashboard-container'>
      <h1>The George Admin Portal</h1>

      <div className='inline-block'>
        <QRCode link={'https://leasemagnets.com'} />
      </div>

      <div className='inline-block'>
        <AptFeedback />
      </div>

      <div>
        <h1>Staff Feedback</h1>
        <AppBar position="static">
          <Tabs value={tab} onChange={handleTabChange} aria-label="simple tabs example">
            <Tab label="Leasing Staff" {...a11yProps(0)} />
            <Tab label="Maintenance Staff" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={tab} index={0}>
          <StaffFeedback employees={staff} aptName={"The George"} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <StaffFeedback employees={maintenance} aptName={"The George"} />
        </TabPanel>
      </div>
    </div>
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
