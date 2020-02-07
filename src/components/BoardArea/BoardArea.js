import React from 'react';
import Sticker from "../Sticker/Sticker";
import './BoardArea.css';

const BoardArea = ({stickers, onDeleteSticker, onChangeTextarea, onSaveSticker, onEditSticker, onMouseDown}) => {
    return (
        <div className='board-area'>
            {
                stickers.map((sticker) => <Sticker sticker={sticker}
                                                   key={sticker.id}
                                                   onDeleteSticker={onDeleteSticker}
                                                   onChangeTextarea={onChangeTextarea}
                                                   onSaveSticker={onSaveSticker}
                                                   onEditSticker={onEditSticker}
                                                   onMouseDown={onMouseDown}
                />)
            }
        </div>
    );
}

export default BoardArea;