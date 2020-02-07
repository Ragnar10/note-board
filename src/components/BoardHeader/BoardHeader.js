import React from 'react';
import './BoardHeader.css';

const BoardHeader = ({onAddSticker, onDelStickers}) => {
    return (
        <div className='board-header'>
            <button className='delAll-btn'
                    onClick={onDelStickers}
            >
                Delete stickers
            </button>
            <button className='add-btn'
                    onClick={onAddSticker}
            >
                Add sticker
            </button>
        </div>
    );
}

export default BoardHeader;