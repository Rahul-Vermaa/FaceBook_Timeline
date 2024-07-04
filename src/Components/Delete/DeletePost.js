import React from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import superagent from 'superagent';

const { confirm } = Modal;

const DeletePost = ({ postId, onDeleteSuccess }) => {
    const handleDelete = async () => {
        try {
            await superagent.delete(`http://139.59.47.49:4004/api/post/delete/${postId}`);
            onDeleteSuccess(); 
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    
    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure you want to delete this post?',
            icon: <DeleteOutlined />,
            content: 'This action cannot be undone.',
            onOk() {
                handleDelete();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    return (
        <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={showDeleteConfirm}
        >
            Delete
        </Button>
    );
};

export default DeletePost;
