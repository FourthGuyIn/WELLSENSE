// front_end\src\app\model1\page.tsx

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CSSProperties } from 'react';

const Model1: React.FC = () => {
    const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/route', {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonData = await response.json();
            setData(jsonData.data);
            setError(null);
        } catch (error) {
            console.error("Failed to fetch data", error);
            setError('Failed to fetch data. Please try again.');
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setSelectedFile(file);
    };

    const handleRunButtonClick = async () => {
        if (!selectedFile) {
            setError('Please select a file');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            const response = await fetch('/api/route', { // Change the URL back to /api/route
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonData = await response.json();
            setData(jsonData.data);
            setError(null);
        } catch (error) {
            console.error("Failed to upload file", error);
            setError('Failed to upload file. Please try again.');
        }
    };

    return (
        <div style={containerStyle}>
            <header style={headerStyle}>
                <h1 style={titleStyle}>Wellsense</h1>
                <Link href="/" passHref>
                    <div style={linkStyle}>Back to Home</div>
                </Link>
            </header>
            <div style={contentStyle}>
                <h2>Model 1: Abrupt Increase of BSW</h2>
                <div style={terminalStyle}>
                    <div style={terminalHeaderStyle}>
                        <span>Terminal</span>
                    </div>
                    <textarea style={terminalOutputStyle} value={data || ''} readOnly />
                </div>
            </div>
            <div style={runCSVSectionStyle}>
                <div style={grayBoxStyle}>
                    <div style={uploadBoxStyle}>
                        <input type="file" onChange={handleFileUpload} style={fileInputStyle} />
                        <button onClick={handleRunButtonClick} style={runButtonStyle}>Run</button>
                    </div>
                    <div>
                        <p style={uploadText}>Please upload a CSV file</p>
                        <p style={uploadText}>Sensor Information Required:</p>
                        <ul style={uploadList}>
                            <li>P-TPT (Pressure at the Temperature and Pressure Transducer)</li>
                            <li>T-TPT (Temperature at the Temperature and Pressure Transducer)</li>
                            <li>P-MON-CKP (Pressure upstream of the Production Choke)</li>
                        </ul>
                    </div>
                </div>
                {error && <p>{error}</p>}
            </div>
            <div style={scrollContainerStyle}>
                {models.map((model, index) => (
                    <div key={index} style={modelBlockStyle}>
                        <div style={grayBoxStyle}>
                            <Link href={`/model${index + 1}`} passHref>
                                <div style={modelLinkStyle}>{model.name}</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <footer style={footerStyle}>
                <p>&copy; 2024 Wellsense. All rights reserved.</p>
            </footer>
        </div>
    );
};

// Styles
const containerStyle: CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '90%',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '5px',
};

const headerStyle: CSSProperties = {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const titleStyle: CSSProperties = {
    fontSize: '2em',
    margin: '0',
};

const linkStyle: CSSProperties = {
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#333333',
    fontSize: '1.2em',
};

const contentStyle: CSSProperties = {
    background: '#f5f5f5',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
};

const terminalStyle: CSSProperties = {
    background: '#000',
    color: '#fff',
    borderRadius: '5px',
    padding: '10px',
    marginTop: '20px',
    marginBottom: '20px', // Added margin at the bottom
};

const terminalHeaderStyle: CSSProperties = {
    marginBottom: '10px',
};

const terminalOutputStyle: CSSProperties = {
    width: '100%',
    height: '150px', // Reduced height
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: '14px',
};

const runCSVSectionStyle: CSSProperties = {
    marginBottom: '20px', // Added margin at the bottom
    border: '1px solid #ccc', // Add border around the upload section
    borderRadius: '5px', // Rounded corners
    padding: '20px', // Add padding
};

const grayBoxStyle: CSSProperties = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
};

const uploadBoxStyle: CSSProperties = {
    marginBottom: '20px',
};

const fileInputStyle: CSSProperties = {
    marginRight: '10px',
};

const runButtonStyle: CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const uploadText: CSSProperties = {
    marginBottom: '10px',
    fontSize: '16px',
};

const uploadList: CSSProperties = {
    paddingLeft: '20px',
};

const footerStyle: CSSProperties = {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
    position: 'relative', // Adjust position to relative
    clear: 'both', // Ensure it clears previous floats
    marginTop: '20px', // Added margin at the top
    padding: '20px 0',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc', // Add grey border around the footer
    borderRadius: '5px', // Rounded corners
};

const scrollContainerStyle: CSSProperties = {
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    marginTop: '20px',
    background: '#f5f5f5',
    padding: '20px',
};

const modelBlockStyle: CSSProperties = {
    display: 'inline-block',
    margin: '0 10px',
};

const modelLinkStyle: CSSProperties = {
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#333333',
};

// List of models
const models = [
    { name: 'Model 1 Abrupt increase of BSW', page: 'model1' },
    { name: 'Model 2 Hydrate in Production Line', page: 'model2' },
    { name: 'Model 3 Severe slugging', page: 'model3' },
    { name: 'Model 4', page: 'model4' },
];

export default Model1;