import React, { useState } from 'react';
import NewPostForm from './NewPostForm';
import request from 'superagent';

const NewPost = ({ onPostCreated }) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState([]);
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');


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
            const res = await request
                .post("http://139.59.47.49:4004/api/upload/image")
                .attach('file', file.originFileObj);
            return res.body.filename;
        } catch (error) {
            alert('There was an error uploading the image. Please try again.');
            throw error;
        }
    };


    const postMethodFn = async (body) => {
        try {
            const res = await request
                .post("http://139.59.47.49:4004/api/post")
                .send(body)
                .set("Content-Type", "application/json");
            if (onPostCreated) {
                onPostCreated();
            }
            alert('Post created successfully!');
            setModalVisible(false);
        } catch (error) {
            alert('There is some error, please try again');
        }
    };

    
    const handlePost = async () => {
        try {
            if (text.length < 5) {
                alert('Please enter at least 5 characters.');
                return;
            }

            let imageFilename = '';
            if (file) {
                imageFilename = await uploadImage(file);
            }

            const postData = {
                post: text,
                background: imageFilename
            };

            await postMethodFn(postData);
            setText('');
            setFile([]);
            setPreviewImage('');
        } catch (error) {
            alert('There was an error creating the post. Please try again.');
        }
    };



    const handleCancel = () => {
        setModalVisible(false);
        setText('');
        setPreviewImage('');
        setFile([])
        setEmojiPickerVisible(null)
    };



    return (
        <NewPostForm
            handleCancel = {handleCancel}
            text={text}
            setText={setText}
            file={file}
            setFile={setFile}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            emojiPickerVisible={emojiPickerVisible}
            setEmojiPickerVisible={setEmojiPickerVisible}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            handleTextChange={handleTextChange}
            handleUploadChange={handleUploadChange}
            handleEmojiSelect={handleEmojiSelect}
            handlePost={handlePost}
        />
    );
};

export default NewPost;
