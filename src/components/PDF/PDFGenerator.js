import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Data from './Data'
import Navbar from '../Navbar';
const PDFGenerator= () => {
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <>
    <Navbar/>
      <div ref={contentToPrint}>{<Data/>}</div>
      <button className='add-btn'onClick={() => {
        handlePrint(null, () => contentToPrint.current);
      }}>
        PRINT
      </button>
    </>
  )
}
export default PDFGenerator;