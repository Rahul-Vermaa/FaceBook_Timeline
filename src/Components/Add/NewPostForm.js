import React from 'react';
import { Button, Input, Upload, Modal, Avatar } from 'antd';
import { UploadOutlined, SmileOutlined } from '@ant-design/icons';
import Picker from '@emoji-mart/react';
import img from '../Assets/profile.jpeg'
const { TextArea } = Input;

const NewPostForm = ({
    text,
    previewImage,
    emojiPickerVisible,
    setEmojiPickerVisible,
    modalVisible,
    setModalVisible,
    handleTextChange,
    file,
    handleUploadChange,
    handleEmojiSelect,
    handlePost,
    handleCancel
}) => {

    
    return (
        <div className="container mt-4" style={{ border: '2px solid black', borderRadius: '19px', padding: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)  ' , overflow:'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    src={img}
                    size={60}
                    style={{
                        marginRight: '20px',
                        borderRadius: '50%',
                        border: '5px solid white',
                    }}
                />
                <div>
                    <TextArea className='Text'
                        value={text}
                        onChange={handleTextChange}
                        placeholder="What's on your mind?"
                        rows={4}
                        style={{ width: '900px', height: '30px', resize: 'none' }}
                        onClick={() => setModalVisible(true)}
                    />
                </div>
            </div>
            <Modal
                visible={modalVisible}
                footer={null}
                onCancel={handleCancel}  
            >
                <div style={{ textAlign: 'center' }}>
                    <TextArea
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Write something here..."
                        rows={4}
                        style={{ marginBottom: '10px', resize: 'none', height: '20px' }}
                    />
                    <Upload
                        fileList={(file.length>0)?(file[0]):([])}
                        onChange={handleUploadChange}
                    >
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
                    <Button
                        type="primary"
                        onClick={handlePost}
                        style={{ marginTop: '20px' }}
                    >
                        Post
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default NewPostForm;
