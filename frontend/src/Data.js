import React, { useState, useEffect } from 'react';

const Data = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =  await fetch('http://localhost:8000/gasprice');
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='Main-div'>
            <table className="Table-style">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Gas price</th>
                        <th>Gas price unit</th>
                        <th>Gas price USD</th>
                        <th>Time Fetched</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.gasprice}</td>
                            <td>{item.gasprice_unit}</td>
                            <td>{item.gasprice_usd}</td>
                            <td>{new Date(item.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Data;
