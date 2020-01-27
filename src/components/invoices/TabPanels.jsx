import React from 'react';
import Invoice from './components/invoice/Invoice';
import Overview from './components/overview/Overview';

const SystemSettings = () => {
	return <h1>System Settings</h1>;
};
const Profile = () => {
	return <h1>Profile</h1>;
};

const AboutUs = () => {
	return <h1>Abous Us</h1>;
};

const ContactSupport = () => {
	return <h1>Contact Support</h1>;
};

const tabPanels = [ Overview, Invoice, SystemSettings, Profile, AboutUs, ContactSupport ];

export default tabPanels;
