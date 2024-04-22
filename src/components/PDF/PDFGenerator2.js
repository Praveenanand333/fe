import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import React, { useState } from 'react';
import Data2 from './Data2';
import Navbar from '../Navbar';
const options = {
  method: 'open',
  resolution: Resolution.LOW,
  page: {
    margin: Margin.SMALL,
    format: 'letter',
    orientation: 'portrait',
  },
  canvas: {
    mimeType: 'image/jpeg', 
    qualityRatio: 0.5, 
  },
  compression: { quality: 0.3 },
};

function PDFData2() {
  const [display, setDisplay] = useState(false);

  const getTargetElement = () => document.getElementById('content-id');

  return (
    <>
    <Navbar />
    <div>
      <button className='add-btn' onClick={() => setDisplay(!display)}>View PDF</button>
      {display && <button className='add-btn' onClick={() => generatePDF(getTargetElement, options)}>Download PDF</button>}

      {display && <div id="content-id">

        <Data2 />
      </div>}
    </div>
    </>
  );
}

export default PDFData2;
