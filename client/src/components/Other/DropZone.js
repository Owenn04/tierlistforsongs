// DropZone.js
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ index, rowIndex, moveBox }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'BOX',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const dragRowIndex = item.rowIndex;
            const hoverIndex = index;
            const hoverRowIndex = rowIndex;

            if (dragIndex === hoverIndex && dragRowIndex === hoverRowIndex) {
                return;
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveBox(dragIndex, hoverIndex, dragRowIndex, hoverRowIndex);

            item.index = hoverIndex;
            item.rowIndex = hoverRowIndex;
        },
    });

    return <div ref={drop} className="drop-zone" />;
};

export default DropZone;