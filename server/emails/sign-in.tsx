import * as React from 'react';

interface EmailTemplateProps {
	name: string;
	signInTime: string;
}

const SignInEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, signInTime }) => (
	<div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f8f8f8' }}>
		<h1 style={{ color: '#333', borderBottom: '2px solid #4a90e2', paddingBottom: '10px' }}>Hello, {name}!</h1>
		<p style={{ color: '#555', fontSize: '16px' }}>You have successfully signed in to your account.</p>
		<p style={{ color: '#555', fontSize: '14px' }}>
			Sign-in time:{' '}
			<span style={{ fontWeight: 'bold' }}>
				{new Intl.DateTimeFormat('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					hour12: true,
				}).format(new Date(parseInt(signInTime)))}
			</span>
		</p>
		<p style={{ color: '#555', fontSize: '16px', marginTop: '20px' }}>If this wasn't you, please contact our support team immediately.</p>
		<p style={{ color: '#4a90e2', fontSize: '18px', marginTop: '20px' }}>Thank you and happy shopping!</p>
		<div style={{ marginTop: '30px', borderTop: '1px solid #ddd', paddingTop: '20px', color: '#777', fontSize: '14px' }}>
			<p>Best regards,</p>
			<p>Your App Team</p>
		</div>
	</div>
);

export default SignInEmailTemplate;
