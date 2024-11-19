// DraggableSmallBox.js
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableSmallBox = ({ item, index, rowIndex, moveBox }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'BOX',
        item: { index, rowIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className="small-box"
            style={{
                opacity: isDragging ? 0.5 : 1,
                backgroundColor: item.background.startsWith('#') ? item.background : 'transparent',
                backgroundImage: item.background.startsWith('http') ? `url(${item.background})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <span className="box-text">{item.text}</span>
        </div>
    );
};

export default DraggableSmallBox;