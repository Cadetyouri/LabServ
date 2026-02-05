import React, { useState, useEffect } from 'react';
import './App.css';

interface Device {
  id: string;
  name: string;
  ip: string;
  logo_path: string | null;
}

const API_URL = 'http://localhost:3001/api';

function App() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    ip: '',
    logo: null as File | null,
  });
  const [previewLogo, setPreviewLogo] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch devices on mount
  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await fetch(`${API_URL}/devices`);
      if (!response.ok) throw new Error('Failed to fetch devices');
      const data = await response.json();
      setDevices(data);
    } catch (err) {
      setError('Failed to load devices');
      console.error(err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.ip.trim()) {
      setError('Please fill in device name and IP address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('ip', formData.ip);
      if (formData.logo) {
        formDataToSend.append('logo', formData.logo);
      }

      const response = await fetch(`${API_URL}/devices`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed to add device');
      
      setFormData({ name: '', ip: '', logo: null });
      setPreviewLogo('');
      await fetchDevices();
    } catch (err) {
      setError('Failed to add device');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDevice = async (id: string) => {
    if (!confirm('Are you sure you want to delete this device?')) return;

    try {
      const response = await fetch(`${API_URL}/devices/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete device');
      await fetchDevices();
    } catch (err) {
      setError('Failed to delete device');
      console.error(err);
    }
  };

  const handleOpenDevice = (ip: string) => {
    const url = ip.startsWith('http://') || ip.startsWith('https://') ? ip : `http://${ip}`;
    window.open(url, '_blank');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Lab Interface</h1>
        <p>Manage your lab devices by IP address</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <main className="container">
        <section className="add-device-section">
          <h2>Add New Device</h2>
          <form onSubmit={handleAddDevice} className="form">
            <div className="form-group">
              <label htmlFor="name">Device Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Server 1, Router, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="ip">IP Address:</label>
              <input
                type="text"
                id="ip"
                name="ip"
                value={formData.ip}
                onChange={handleInputChange}
                placeholder="e.g., 192.168.1.100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="logo">Device Logo:</label>
              <input
                type="file"
                id="logo"
                accept="image/*"
                onChange={handleLogoUpload}
              />
              {previewLogo && (
                <div className="logo-preview">
                  <img src={previewLogo} alt="Logo preview" />
                </div>
              )}
            </div>

            <button type="submit" className="btn-add" disabled={loading}>
              {loading ? 'Adding...' : 'Add Device'}
            </button>
          </form>
        </section>

        <section className="devices-section">
          <h2>Devices ({devices.length})</h2>
          {devices.length === 0 ? (
            <p className="no-devices">No devices added yet. Add one above to get started!</p>
          ) : (
            <div className="devices-grid">
              {devices.map(device => (
                <div key={device.id} className="device-card" onClick={() => handleOpenDevice(device.ip)}>
                  {device.logo_path && (
                    <div className="device-logo">
                      <img src={`http://localhost:3001${device.logo_path}`} alt={device.name} />
                    </div>
                  )}
                  <div className="device-info">
                    <h3>{device.name}</h3>
                    <p className="ip-address">IP: <strong>{device.ip}</strong></p>
                    <div className="device-actions">
                      <button
                        className="btn-copy"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(device.ip);
                        }}
                      >
                        Copy IP
                      </button>
                      <button
                        className="btn-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDevice(device.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
