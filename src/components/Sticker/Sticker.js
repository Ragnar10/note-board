import React from 'react';
import './Sticker.css';

const Sticker = ({sticker, onDeleteSticker, onChangeTextarea, onSaveSticker, onEditSticker, onMouseDown}) => {

    const changeTextarea = (e, id) => {
        onChangeTextarea(e.target.value, id);
    };

    return (
        <div className='sticker'
             style={{position: sticker.position, top: sticker.y, left: sticker.x}}
        >
            <div className='sticker-header'
                 onMouseDown={(e) => onMouseDown(e, sticker.id)}
            >
                {
                    sticker.save ? <button className='edit-btn' onClick={() => onEditSticker(sticker.id)}>Edit</button>
                    : <button className='save-btn' onClick={() => onSaveSticker(sticker.id)}>Save</button>
                }
                <button className='del-btn' onClick={() => onDeleteSticker(sticker.id)}>X</button>
            </div>
            {
                sticker.save ? <div className='sticker-text'>{sticker.value}</div>
                : <textarea
                    className='sticker-area'
                    value={sticker.value}
                    onChange={(e) => changeTextarea(e, sticker.id)}
                />
            }
        </div>
    );
};

export default Sticker;
