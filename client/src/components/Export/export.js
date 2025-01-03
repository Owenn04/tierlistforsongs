import { forwardRef, useImperativeHandle} from 'react';

const Export = forwardRef(({ boxItems }, ref) => {
    const generateTierlistImage = () => {
        const canvas = document.createElement('canvas');
        const rows = boxItems.length;
        const maxBoxes = Math.max(...boxItems.map(row => row.length));
        const boxWidth = 100;
        const boxHeight = 100;
        const canvasWidth = maxBoxes * boxWidth;
        const canvasHeight = rows * boxHeight;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext('2d');

        boxItems.forEach((row, rowIndex) => {
            row.forEach((box, boxIndex) => {
                ctx.fillStyle = box.background;
                ctx.fillRect(boxIndex * boxWidth, rowIndex * boxHeight, boxWidth, boxHeight);
                ctx.font = '16px Arial';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(box.text, boxIndex * boxWidth + boxWidth / 2, rowIndex * boxHeight + boxHeight / 2);
            });
        });

        return canvas.toDataURL('image/png');
    };

    const handleDownload = () => {
        const imageData = generateTierlistImage();
        const link = document.createElement('a');
        link.download = 'tierlist.png';
        link.href = imageData;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useImperativeHandle(ref, () => ({
        handleDownload,
    }));

    return null;
});

export default Export;
