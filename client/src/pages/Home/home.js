import React, { useState }  from 'react';
import "./home.css"
import Controls from '../../components/Controls/controls.js'
import React, { useState, useEffect } from 'react';
import "./home.css"
import Controls from '../../components/Controls/controls.js'


const Home = () => {
    // const defaultBoxColours = ['#FF7F7F', '#FFBF7F', 'FFDF7F', '#FFFF7F', '#BFFF7F', '#7FFFFF', '#7FBFFF', '#7F7FFF', '#BF7FBF', '#3B3B3B', '#85858', '#CFCFCF', '#CFCFCF']

    const [boxItems, setBoxItems] = useState([
        [{ background: '#FF7F7F', text: 'S' }, { background: '#FFFFFF', text: 'Box 11' }],                
        [{ background: '#FFBF7F', text: 'A' }, { background: 'https://media.istockphoto.com/id/464988959/photo/mallard-duck-on-white-background.jpg?s=612x612&w=0&k=20&c=S1jcDuyXuoCVUaTobTrZ5f6SlscukkyheqKDHAeflW8=', text: 'Box 3' }], 
        [{ background: '#FFDF7F', text: 'B' }],
        [{ background: '#FFFF7F', text: 'C' }],
        [{ background: '#BFFF7F', text: 'D' }],
        [{ background: '#7F7FFF', text: 'F' }] 
    ]);

    const [selectedRow, setSelectedRow] = useState(0);
    const [selectedBox, setSelectedBox] = useState(0);

    const handleRowClick = (rowIndex) => {
        console.log("row",rowIndex)
        setSelectedRow(rowIndex);
    };

    const handleBoxClick = (boxIndex) => {
        console.log("box", boxIndex)
        setSelectedBox(boxIndex);
    };

    //grabs from props passed back up from control.js (onColorSelect)
    const handleColorSelect = (rowIndex, boxIndex, color) => {
        handleColorChange(rowIndex, boxIndex, color);
    };

    //grabs from props passed back up from control.js (onTextSelect)
    const handleTextSelect = (rowIndex, boxIndex, newText) => {
        handleTextChange(rowIndex, boxIndex, newText);
    };

    const handleColorChange = (rowIndex, boxIndex, color) => {
        const newItems = boxItems.map((row, i) => 
            i === rowIndex ? row.map((box, j) => (j === boxIndex ? { ...box, background: color } : box)) : row
        );
        setBoxItems(newItems);
    };

    const handleTextChange = (rowIndex, boxIndex, newText) => {
        const newItems = boxItems.map((row, i) => 
            i === rowIndex ? row.map((box, j) => (j === boxIndex ? { ...box, text: newText } : box)) : row
        );
        setBoxItems(newItems);
    };

    const handleNewRow = (rowName, order) => {
        const newRow = [{ background: '#FFFFFF', text: rowName || 'new' }];

    setBoxItems(prevItems => {
        const updatedItems = [...prevItems];
        if (typeof order === 'number' && order >= 0 && order < updatedItems.length) {
            updatedItems.splice(order, 0, newRow);
        } else {
            updatedItems.push(newRow);
        }
        return updatedItems;
    });
    }

    const handleCellRowRemoval = (rowIndex, boxIndex) => {
        setBoxItems(prevItems => {
            const updatedItems = [...prevItems];
    
            // Remove the selected box from the row
            if (boxIndex === 0) {
                updatedItems.splice(rowIndex, 1);
            } else {
                updatedItems[rowIndex] = updatedItems[rowIndex].filter((_, index) => index !== boxIndex);
                if (updatedItems[rowIndex].length === 0) {
                    updatedItems.splice(rowIndex, 1);
                }
            }
    
            // Adjust selectedBox if needed to avoid out-of-bound error
            if (updatedItems[rowIndex] && updatedItems[rowIndex].length <= selectedBox) {
                setSelectedBox(updatedItems[rowIndex].length - 1);  // Set to last box if current selectedBox is out of bounds
            }
    
            return updatedItems;
        });
    };
    

    return (
        <div className = "container">
            <div className = "box">
                <div className = "inner-box1">
                    <Controls selectedRow={selectedRow} selectedBox={selectedBox} boxItems={boxItems} onColorSelect={handleColorSelect} onTextSelect={handleTextSelect} onPlusSelect={handleNewRow} onMinusSelect={handleCellRowRemoval}/>
                </div>
                <div className="inner-box2">
                    {boxItems.map((row, rowIndex) => (
                        <div key={rowIndex} className="row" onClick={() => handleRowClick(rowIndex)}>
                            {row.map((item, boxIndex) => (
                                <div 
                                    key={boxIndex} 
                                    className="small-box"
                                    onClick={() => handleBoxClick(boxIndex)} 
                                    style={{ 
                                        backgroundColor: item.background.startsWith('#') ? item.background : 'transparent',
                                        backgroundImage: item.background.startsWith('http') ? `url(${item.background})` : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <span className="box-text">{item.text}</span>
                                    
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div> 
        </div>
    );
}

export default Home


