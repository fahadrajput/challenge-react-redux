/* eslint-disable indent */
import React from 'react';
import 'antd/dist/antd.css';


export default function Health(v) {

    return (
        <div>
                <h2 style={{ textAlign: 'center', marginTop: 10 }}>{v.health}</h2>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="progress" style={{ width: '90%', marginBottom: 20 }}>
                        <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: `${v.health}%`, backgroundColor: v.health <= 50 ? '#5cb85c' : v.health >= 51 & v.health <= 70 ? '#f0ad4e' : '#f0ad4e' }}>
                            <span className="sr-only">70% Complete</span>
                        </div>
                    </div>
                </div>
        </div>
    );
}
