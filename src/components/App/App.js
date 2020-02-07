import React, {useState, useEffect} from 'react';
import BoardHeader from "../BoardHeader/BoardHeader";
import BoardArea from "../BoardArea/BoardArea";
import './App.css';

const App = () => {

    const [stickersArray, setStickersArray] = useState([{id: 0, value: '', save: false, x: 0, y: 0, position: 'relative'}]);

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
        const newId = stickersArray[stickersArray.length - 1].id;
        setStickersArray([...stickersArray, {id: newId + 1, value: '', save: false, x: 0, y: 0, position: 'relative'}]);
    };

    const deleteStickers = () => {
        setStickersArray([...stickersArray.slice(0, 1)]);
    };

    const deleteSticker = (id) => {
        const indexSticker = stickersArray.findIndex((item) => item.id === id);
        const newStickersArray = [...stickersArray.slice(0, indexSticker), ...stickersArray.slice(indexSticker + 1)];
        setStickersArray([...newStickersArray]);
    };

    const changeTextarea = (valueSticker, id) => {
        const indexSticker = stickersArray.findIndex((item) => item.id === id);
        const sticker = stickersArray[indexSticker];
        const newStickersArray = [...stickersArray.slice(0, indexSticker),  {...sticker, value: valueSticker}, ...stickersArray.slice(indexSticker + 1)];
        setStickersArray([...newStickersArray]);
    };

    const saveSticker = (id) => {
        const indexSticker = stickersArray.findIndex((item) => item.id === id);
        const sticker = stickersArray[indexSticker];
        const newStickersArray = [...stickersArray.slice(0, indexSticker),  {...sticker, save: true}, ...stickersArray.slice(indexSticker + 1)];
        setStickersArray([...newStickersArray]);
    };

    const editSticker = (id) => {
        const indexSticker = stickersArray.findIndex((item) => item.id === id);
        const sticker = stickersArray[indexSticker];
        const newStickersArray = [...stickersArray.slice(0, indexSticker),  {...sticker, save: false}, ...stickersArray.slice(indexSticker + 1)];
        setStickersArray([...newStickersArray]);
    };

    /*Drag'n'Drop на костылях в общем :) */


    const stickerDragStart = (event, id) => {
        let grab = event.target;
        if (grab.parentNode.className !== 'sticker') {
            return;
        }
        let grabElem = grab.closest('.sticker');
        let grabElemWidth = grabElem.offsetWidth;
        let grabElemHeight = grabElem.offsetHeight;
        let board = document.querySelector('.board-area');
        let boardLeft = board.offsetLeft;
        let boardTop = board.offsetTop;
        let boardWidth = board.offsetWidth;
        let boardHeight = board.offsetHeight;
        let shiftX = event.clientX - grabElem.getBoundingClientRect().left;
        let shiftY = event.clientY - grabElem.getBoundingClientRect().top;

        const stickerMove = (event) => {
            let left = event.pageX - shiftX - boardLeft;
            let top = event.pageY - shiftY - boardTop;

            let right = boardWidth - left - grabElemWidth;
            let bottom = boardHeight - top - grabElemHeight;

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