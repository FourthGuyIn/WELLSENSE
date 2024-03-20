import React from 'react';
import Link from 'next/link';


// list of models
const models = [
  { name: 'Model 1 Abrupt increase of BSW', page: 'model1' },
  { name: 'Model 2 Hydrate in Production Line', page: 'model2' },
  { name: 'Model 3 Severe slugging', page: 'model3' },
  { name: 'Model 4', page: 'model4' },
];

const Home = () => {
  return (
    <div style={{backgroundColor: '#F5F5F5', minHeight: '100vh', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333333'}}>
      {/* Header */}
      <div style={{backgroundColor: '#CCCCCC', padding: '20px', marginBottom: '40px', textAlign: 'center'}}>
        <h1 style={{fontSize: '24px', fontWeight: 'bold', margin: '0'}}>Wellsense AI</h1>
      </div>

      {/* Welcome message */}
      <h2 style={{marginBottom: '30px'}}>Welcome, choose a model to get started</h2>

      {/* Main content area */}
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
      {/* List of models */}
      <div style={{backgroundColor: '#CCCCCC', padding: '20px', width: '48%', overflow: 'auto', maxHeight: '500px'}}>
        <div>
        {models.map((model, index) => (
          <div key={index} style={{border: '1px solid #999999', marginBottom: '10px', padding: '10px', backgroundColor: '#E0E0E0', color: '#333333'}}>
            <Link href={`/${model.page}`} passHref>
              <div style={{cursor: 'pointer', textDecoration: 'none', color: '#333333', fontSize: '1.2em', whiteSpace: 'pre-wrap'}}>{model.name}</div>
            </Link>
          </div>
          ))}
          </div>
        </div>

        {/* Placeholder for news content */}
        <div style={{backgroundColor: '#CCCCCC', padding: '20px', width: '48%', overflow: 'auto', maxHeight: '500px'}}>
          <h2>News</h2>
          {/* Add your news content here */}
        </div>
      </div>

      {/* Footer */}
      <div style={{backgroundColor: '#CCCCCC', padding: '10px', position: 'fixed', bottom: 0, width: '99%', textAlign: 'right'}}>
        Created by CompuHyper 2024
      </div>
    </div>
  );
};

export default Home;