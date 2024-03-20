// ./src/app/model1/page.tsx
"use client";
import React, { useEffect, useState } from 'react';

const Model1: React.FC = () => {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/model1'); 
                const jsonData = await response.json();
                setData(jsonData.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Model 1</h1>
            <p>This is the first model</p>
            <textarea value={data || ''} readOnly />
        </div>
    );
};

export default Model1;