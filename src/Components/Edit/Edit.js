import React, { useState, useEffect } from 'react';
import { Button, Input, Upload, Modal } from 'antd';
import { EditOutlined, UploadOutlined, SmileOutlined } from '@ant-design/icons';
import Picker from '@emoji-mart/react';
import request from 'superagent';

const { TextArea } = Input;

const Edit = ({ postId, onEditSuccess }) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


    const fetchPostData = async () => {
        try {
            const res = await request.get(`http://139.59.47.49:4004/api/post/${postId}`);
            const { post, background } = res.body;
            setText(post);
            setPreviewImage(`http://139.59.47.49:4004/uploads/${background}`);
        } catch (error) {
            console.error('Error fetching post data:', error);
        }
    };      


    useEffect(() => {
        if (modalVisible) {
            fetchPostData();
        }
    }, [modalVisible, postId]);


    const handleTextChange = (e) => {
        setText(e.target.value);
    };


    const handleUploadChange = ({ file }) => {
        if (file.status === 'done' || file.status === 'uploading') {
            setFile(file);
            setPreviewImage(URL.createObjectURL(file.originFileObj));
        }
    };


    const handleEmojiSelect = (emoji) => {
        setText(text + emoji.native);
    };


    const uploadImage = async (file) => {
        try {
            const res = await request.post("http://139.59.47.49:4004/api/upload/image/").attach('file', file);
            return res.body.filename;
        } catch (error) {
            alert('There was an error uploading the image. Please try again.');
            throw error;
        }
    };

    const updatePost = async (body) => {
        try {
        const res =    await request.put(`http://139.59.47.49:4004/api/post`).send(body).set("Content-Type", "application/json");
        if (onEditSuccess) {
                onEditSuccess();
            }
            alert('Post updated successfully!');
            setModalVisible(false);
        } catch (error) {
            alert('There was an error updating the post. Please try again.');
        }
    };


    const updateProfileImage = async (imageFilename) => {
        try {
           const req =  await request.get(`http://139.59.47.49:4004/api/profile_image?profile_image=${imageFilename}`);
        } catch (error) {
            console.error('Error updating profile image:', error);
            alert('There was an error updating the profile image. Please try again.');
        }
    };


    const handleUpdate = async () => {
        try {
            let imageFilename = '';
            if (file) {
                imageFilename = await uploadImage(file.originFileObj);
            }
            const postData = {
                id:postId,
                post: text,
                background: imageFilename 
            };
            await updatePost(postData);
            if (imageFilename) {
                await updateProfileImage(imageFilename);
            }
            setText('');
            setFile([]);
            setPreviewImage('');
        } catch (error) {
            alert('There was an error updating the post. Please try again.');
        }
    };

    
    const handleCancel = () => {
        setModalVisible(false);
        setText('');
        setFile([]);
        setPreviewImage('');  
    };


    return (
        <>
            <Button type="text" icon={<EditOutlined />} onClick={() => setModalVisible(true)}>
                Edit
            </Button>
            <Modal
                title="Edit Post"
                visible={modalVisible}
                onOk={handleUpdate}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                ]}
            >
                <div style={{ textAlign: 'center' }}>
                    <TextArea
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Write something here..."
                        rows={4}
                        style={{ marginBottom: '10px' }}
                    />
                    <Upload       
                       fileList={(file.length>0)?(file[0]):([])}
                       onChange={handleUploadChange}>
                        <Button icon={<UploadOutlined />}>Select Photo</Button>
                    </Upload>
                    {previewImage && (
                        <div style={{ position: 'relative', marginTop: '10px' }}>
                            <img
                                alt="Preview"
                                style={{ width: '100%' }}
                                src={previewImage}
                            />
                        </div>
                    )}
                    <Button
                        icon={<SmileOutlined />}
                        onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
                        style={{ marginTop: '10px' }}
                    >
                        Add Emoji
                    </Button>
                    {emojiPickerVisible && (
                        <Picker onEmojiSelect={handleEmojiSelect} />
                    )}
                </div>
            </Modal>
        </>
    );
};

export default Edit;
