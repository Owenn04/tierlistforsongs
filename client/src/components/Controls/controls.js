import React, {useState, useRef, useCallback} from 'react';
import "./controls.css"
import Export from "../Export/export.js"
import ImageSearch from '../Search/imageSearch.js';

import { Search, Plus, Download, Palette, Type, Minus } from 'lucide-react';

const Controls = ({ selectedRow, selectedBox, boxItems, onColorSelect, onTextSelect, onPlusSelect, onMinusSelect, numResults = 3}) => {

    const defaultBoxColors = ['#FF7F7F', '#FFBF7F', '#FFDF7F', '#FFFF7F', '#BFFF7F', '#7FFFFF', '#7FBFFF', '#7F7FFF', '#BF7FBF', '#3B3B3B', '#858585', '#CFCFCF'];

    const [query, setQuery] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);
    const exportRef = useRef(null);

    const handleDownload = () => {
        if (isDownloading) return; //to prevent 1000 downloads/s
        setIsDownloading(true);
        exportRef.current.handleDownload();
        setTimeout(() => setIsDownloading(false), 1000);
    };

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
      };
    
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [isTextPickerOpen, setIsTextPickerOpen] = useState(false);
    const [isPlusPickerOpen, setIsPlusPickerOpen] = useState(false);

    const [selectedColor, setSelectedColor] = useState("");
    const [selectedText, setSelectedText] = useState("");
    const [selectedRowName, setSelectedRowName] = useState("");

    const handleColorPickerToggle = () => {
        setIsColorPickerOpen(!isColorPickerOpen);
        setSelectedColor("")
    };
    const handleTextPickerToggle = () => {
        setIsTextPickerOpen(!isTextPickerOpen);
        setSelectedText("")
    };
    const handlePlusPickerToggle = () => {
        setIsPlusPickerOpen(!isPlusPickerOpen);
        setSelectedRowName("")
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        // setIsColorPickerOpen(false);
        if (selectedRow !== null) {
            onColorSelect(selectedRow, selectedBox, color);
        }
    };

    const handleTextSelect = (text) => {
        setSelectedText(text);
        // setIsTextPickerOpen(false);
        if (selectedRow !== null) {
            onTextSelect(selectedRow, selectedBox, text);
        }
    };

    const handlePlusSelect = (rowName, order) => {
        setSelectedRowName(rowName);
        
        if (selectedRowName !== null) {
            onPlusSelect(rowName, order);
        }
        setSelectedRowName("")
    };

    const handleMinusToggle = () => {
        onMinusSelect(selectedRow, selectedBox)
    }

    // SEARCH VARIABLES
    
    
    

    return (
      <div className="control-container">
        <div className="search-container">
            <input
                type="text"
                value={query}
                placeholder="Search..."
                onChange={handleQueryChange}
            />
            <button>
                <Search/>
            </button>

            <ImageSearch query={query} numResults={numResults} />


            <div className = "button-container">
                {selectedRow !== null && boxItems && boxItems[selectedRow] && boxItems[selectedRow][selectedBox] && (
                    <div className = "selected-row" style={{backgroundColor: boxItems[selectedRow][selectedBox].background}}>
                        <h1>{boxItems[selectedRow][selectedBox].text}</h1>
                    </div>
                )}
                <button onClick={handleColorPickerToggle}>
                    <Palette/>
                </button>
                {isColorPickerOpen && (
                    <div className="color-picker-dropdown">
                        <div className="color-squares">
                            {defaultBoxColors.map((color, index) => (
                                <div
                                    key={index}
                                    className={`color-square ${selectedColor === color ? 'selected' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleColorSelect(color)}
                                />
                            ))}
                        </div>
                        <div className="color-palette">
                            <input
                                type="color"
                                value={selectedColor || '#FFFFFF'}
                                onChange={(e) => handleColorSelect(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>
                )}
                <button onClick={handleTextPickerToggle}>
                    <Type/>
                </button>
                {isTextPickerOpen && (
                    <div className="text-picker-dropdown">
                        <input
                                type="text"
                                value={selectedText}
                                onChange={(e) => handleTextSelect(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                placeholder = "Enter Cell Name"
                        />
                    </div>
                )}
                <button onClick={handlePlusPickerToggle}>
                    <Plus/>
                </button>
                {isPlusPickerOpen && (
                    <div className="plus-picker-dropdown">
                        <input
                                type="text"
                                value={selectedRowName}
                                onChange={(e) => setSelectedRowName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handlePlusSelect(e.target.value);
                                    }
                                }}
                                onBlur={() => handlePlusSelect(selectedRowName)}
                                onClick={(e) => e.stopPropagation()}
                                placeholder = "Enter Row Name"
                        />
                    </div>
                )}

                <button onClick={handleMinusToggle}>
                    <Minus/>
                </button>
                
                <Export boxItems={boxItems} onDownload={handleDownload} ref={exportRef} />

                <button onClick={handleDownload} disabled={isDownloading}>
                    <Download/>
                </button>
            </div>
        </div>
        
      </div>
    );
  };

export default Controls;

