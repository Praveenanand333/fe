import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import React, { useState } from 'react';
import Data from './Data';
import Navbar from '../Navbar';
const options = {
  method: 'open',
  resolution: Resolution.MEDIUM,
  page: {
    margin: Margin.SMALL,
    format: 'letter',
    orientation: 'portrait',
  },
  canvas: {
    mimeType: 'image/jpeg', 
    qualityRatio: 0.9, 
  },
  compression: { quality: 1 },
};

function PDFData() {
  const [display, setDisplay] = useState(false);

  const getTargetElement = () => document.getElementById('content-id');

  return (
    <>
    <Navbar />
    <div>
      <button className='add-btn' onClick={() => setDisplay(!display)}>View PDF</button>
      {display && <button className='add-btn' onClick={() => generatePDF(getTargetElement, options)}>Download PDF</button>}

      {display && <div id="content-id">

        <Data />
      </div>}
    </div>
    </>
  );
}

export default PDFData;
