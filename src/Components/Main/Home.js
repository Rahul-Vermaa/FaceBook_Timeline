import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { Card, Row, Col, Avatar, Empty } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import DynamicBackground from '../Background/DynamicBackground';
import NewPost from '../Add/NewPost';
import DeletePost from '../Delete/DeletePost';
import '../Main/App.css';
import image from '../Assets/profile.jpeg';
import EditPost from '../Edit/Edit';
import Filter from './Filter';


const Home = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    
    const fetchData = async (date = '') => {
        try {
            const limit = 20;
            const res = await superagent.get(`http://139.59.47.49:4004/api/posts?limit=${limit}&start=1&orderby=0&date=${date}`);
            setData(res.body);
            setFilteredData(res.body);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);


    const handlePostCreated = () => {
        fetchData();
    };

    const handleFilter = (date) => {
        if (date) {
            fetchData(date);
        } else {
            fetchData();
        }
    };


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        <div style={{ position: "relative" }}>
            <DynamicBackground />
            <div style={{ position: 'relative', top: '100px' }}>
                <NewPost onPostCreated={handlePostCreated} />
            </div>
            <div className="container" style={{ position: 'relative', top: '140px' }}>
                <h1 className="my-4">Posts</h1>
                <Filter onFilter={handleFilter} />
                {filteredData.length > 0 ? (
                    <Row gutter={[16, 16]}>
                        {filteredData.map((item) => (
                            <Col key={item.id} span={24}>
                                <Card
                                    hoverable
                                    cover={item.background ? <img src={`http://139.59.47.49:4004/uploads/${item.background}`} alt="Post Background" style={{ height: '500px', objectFit: 'cover' }} /> : null}
                                    actions={[
                                        <LikeOutlined key="like" />,
                                        <DeletePost postId={item.id} onDeleteSuccess={fetchData} />,
                                        <EditPost postId={item.id} onEditSuccess={fetchData} />
                                    ]}
                                    style={{ marginBottom: '16px' }}
                                >
                                    <Card.Meta
                                        avatar={<Avatar src={image} size={40} />}
                                        title={`@Elena_Parkour`}
                                        description={(
                                            <>
                                                <p><strong>Caption:</strong> {item.post}</p>
                                                <p><strong>Date:</strong> {formatDate(item.created_at)}</p>
                                            </>
                                        )}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Empty description="No Data Found" />
                )}
            </div>
        </div>
    );
};

export default Home;
