import React from 'react';

interface EmailTemplateProps {
	name: string;
	email: string;
}

const SignUpEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, email }) => (
	<div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f8f8f8' }}>
		<h1 style={{ color: '#333', borderBottom: '2px solid #4a90e2', paddingBottom: '10px' }}>Welcome, {name}!</h1>
		<p style={{ color: '#555', fontSize: '16px' }}>Thank you for signing up to our service.</p>
		<p style={{ color: '#555', fontSize: '14px' }}>
			Your account has been created with the email: <span style={{ fontWeight: 'bold' }}>{email}</span>
		</p>
		<h2 style={{ color: '#4a90e2', marginTop: '20px' }}>Here are a few things you can do next:</h2>
		<ul style={{ color: '#555', fontSize: '14px', paddingLeft: '20px' }}>
			<li>Complete your profile</li>
			<li>Explore our products</li>
			<li>Check out our latest offers</li>
		</ul>
		<p style={{ color: '#555', fontSize: '16px', marginTop: '20px' }}>
			If you have any questions, feel free to reach out to our support team.
		</p>
		<div style={{ marginTop: '30px', borderTop: '1px solid #ddd', paddingTop: '20px', color: '#777', fontSize: '14px' }}>
			<p>Best regards,</p>
			<p>Your App Team</p>
		</div>
	</div>
);

export default SignUpEmailTemplate;
