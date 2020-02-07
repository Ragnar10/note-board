import React, {useState, useEffect} from 'react';
import BoardHeader from "../BoardHeader/BoardHeader";
import BoardArea from "../BoardArea/BoardArea";
import './App.css';

const App = () => {

    const [stickersArray, setStickersArray] = useState([]);

    useEffect(() => {
        const stickersArrayFromStorage = JSON.parse(localStorage.getItem('stickers'));
        if (stickersArrayFromStorage) {
            setStickersArray([...stickersArrayFromStorage]);
        }
    },[]);

    useEffect(() => {
        localStorage.setItem('stickers', JSON.stringify(stickersArray));
    },[stickersArray]);


    const addStickers = () => {
        const newId = stickersArray.length ? stickersArray[stickersArray.length - 1].id : 0;
        if (stickersArray.length === 24) {
            console.log('Максимум стикеров уже добавлено!');
            return;
        }
        setStickersArray([...stickersArray, {id: newId + 1, value: '', save: false, x: 0, y: 0, position: 'relative'}]);
    };

    const deleteStickers = () => {
        setStickersArray([...stickersArray.slice(-1, 0)]);
    };

    function setSticker(id, key, value) {
        const indexSticker = stickersArray.findIndex((item) => item.id === id);
        const sticker = stickersArray[indexSticker];
        return (key === undefined) ? [...stickersArray.slice(0, indexSticker), ...stickersArray.slice(indexSticker + 1)] :
            [...stickersArray.slice(0, indexSticker),  {...sticker, [key]: value}, ...stickersArray.slice(indexSticker + 1)];
    };

    const deleteSticker = (id) => {
        setStickersArray([...setSticker(id)]);
    };

    const changeTextarea = (valueSticker, id) => {
        setStickersArray([...setSticker(id, 'value', valueSticker)]);
    };

    const saveSticker = (id) => {
        setStickersArray([...setSticker(id, 'save', true)]);
    };


    const editSticker = (id) => {
        setStickersArray([...setSticker(id, 'save', false)]);
    };

    /*Drag'n'Drop на костылях в общем :) */


    const stickerDragStart = (event, id) => {
        let grab = event.target;
        if (grab.parentNode.className !== 'sticker') {
            return;
        }
        let grabElem = grab.closest('.sticker');
        grabElem.style.zIndex = id;
        let board = document.querySelector('.board-area');
        let shiftX = event.clientX - grabElem.getBoundingClientRect().left;
        let shiftY = event.clientY - grabElem.getBoundingClientRect().top;

        const stickerMove = (event) => {
            let left = event.pageX - shiftX - board.offsetLeft;
            let top = event.pageY - shiftY -  board.offsetTop;

            let right = board.offsetWidth - left - grabElem.offsetWidth;
            let bottom = board.offsetHeight - top - grabElem.offsetHeight;

            if (left < 0 || top < 0 || right < 0 || bottom < 0) {
                return;
            }

            const indexSticker = stickersArray.findIndex((item) => item.id === id);
            const sticker = stickersArray[indexSticker];
            const newStickersArray = [...stickersArray.slice(0, indexSticker),  {...sticker, x: left, y: top, position: 'absolute'}, ...stickersArray.slice(indexSticker + 1)];
            setStickersArray([...newStickersArray]);
        };

        document.addEventListener('mousemove', stickerMove);
        document.onmouseup = () => {
            document.removeEventListener('mousemove', stickerMove);
            grab.onmouseup = null;
        };
        grab.ondragstart = () => {
            return false;
        };
    };

    return (
        <div className='board'>
            <BoardHeader onAddSticker={addStickers}
                         onDelStickers={deleteStickers}
            />
            <BoardArea stickers={stickersArray}
                       onDeleteSticker={deleteSticker}
                       onChangeTextarea={changeTextarea}
                       onSaveSticker={saveSticker}
                       onEditSticker={editSticker}
                       onMouseDown={stickerDragStart}
            />
        </div>
    );
}

export default App;
