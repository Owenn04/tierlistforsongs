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

            // Don't replace items with themselves
            if (dragIndex === hoverIndex && dragRowIndex === hoverRowIndex) {
                return;
            }

            // Determine rectangle on screen for the hover target
            const hoverBoundingRect = ref.current.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            moveBox(dragIndex, hoverIndex, dragRowIndex, hoverRowIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
            item.rowIndex = hoverRowIndex;
        },
    });

    return <div ref={drop} className="drop-zone" />;
};

export default DropZone;