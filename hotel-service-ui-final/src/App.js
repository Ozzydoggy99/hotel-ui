
import { useState } from 'react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    if (username.trim() === 'Ozzydog' && password.trim() === 'Ozzydog') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleFloorSelection = async (floor) => {
    try {
      const response = await fetch('https://testhotelsite.com/api/request-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service: selectedService,
          floor: floor
        })
      });

      const result = await response.json();
      setConfirmation(`Service requested: ${result.status || 'Success'}`);
    } catch (error) {
      console.error('Error sending service request:', error);
      setConfirmation('Failed to request service.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h2 style={{ fontSize: '1.875rem', textAlign: 'center', color: '#1f2937', marginBottom: '1rem' }}>Hotel Login</h2>
          <input
            style={{ padding: '0.75rem', width: '100%', marginBottom: '1rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            style={{ padding: '0.75rem', width: '100%', marginBottom: '1rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && <p style={{ color: 'red', textAlign: 'center', fontSize: '0.875rem' }}>{loginError}</p>}
          <button onClick={handleLogin} style={{
            padding: '0.75rem',
            width: '100%',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem'
          }}>Login</button>
        </div>
      </div>
    );
  }

  if (!selectedService) {
    return (
      <div style={{ padding: '1rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>Select a Service</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={() => setSelectedService('trash')} style={{ padding: '1rem', fontSize: '1rem' }}>Trash</button>
          <button onClick={() => setSelectedService('laundry')} style={{ padding: '1rem', fontSize: '1rem' }}>Laundry</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>{selectedService === 'trash' ? 'Trash Collection' : 'Laundry Pickup'}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem' }}>
        {[1, 2, 3, 4, 5, 6].map(floor => (
          <button key={floor} onClick={() => handleFloorSelection(floor)} style={{ padding: '1rem', fontSize: '1rem' }}>
            Floor {floor}
          </button>
        ))}
      </div>
      <button onClick={() => { setSelectedService(null); setConfirmation(null); }} style={{ marginTop: '1rem' }}>Back</button>
      {confirmation && <p style={{ textAlign: 'center', color: 'green', fontWeight: '500', marginTop: '1rem' }}>{confirmation}</p>}
    </div>
  );
}
