import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Data2 from './Data2'
import Navbar from '../Navbar';
const PDFData2= () => {
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
      <div ref={contentToPrint}>{<Data2/>}</div>
      <button className='add-btn'onClick={() => {
        handlePrint(null, () => contentToPrint.current);
      }}>
        PRINT
      </button>
    </>
  )
}
export default PDFData2;