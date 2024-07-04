import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import img from '../Assets/profile.jpeg';


const DynamicBackground = () => {
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');

    useEffect(() => {
        const changeBackgroundColor = () => {
            const colors = ['#ff6666', '#66ff66', '#6666ff', '#ffcc66', '#66ffcc'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setBackgroundColor(randomColor);
        };

        const intervalId = setInterval(changeBackgroundColor, 2000);
        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="container-fluid">
            <div className="row">
                <div
                    className="col-12"
                    style={{backgroundColor: backgroundColor, height: '60vh',width:'170vh',display: 'flex',left:'90px',borderBottomLeftRadius:'35px',borderBottomRightRadius:'35px',justifyContent: 'center', alignItems: 'center',  position: 'relative' }}
                >
                    <Avatar
                        src={img}
                        size={100}
                        style={{position: 'absolute', top: '100%', transform: 'translateY(-50%)', borderRadius: '50%',border: '5px solid white'  }}
                    />
                    <p level={3} style={{ position: 'absolute', top: '115%' }}>@Elena_Parkour</p>
                    <FacebookOutlined style={{ fontSize: '48px', color: '#fff', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                </div>
            </div>
        </div>
    );
};

export default DynamicBackground;
