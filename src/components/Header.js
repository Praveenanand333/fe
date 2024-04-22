//header

import React from 'react'
import temp from '../components/images/temp.png'
import image2 from '../components/images/image2.png'
import image3 from '../components/images/image3.png'

import SimpleImageSlider from "react-simple-image-slider";


const Header = ({onClick}) => {

  return (
    <div>
        <div className='nav-container'>
            <h1>DEPARTMENT OF INFORMATION SCIENCE AND TECHNOLOGY</h1>
            <ul>
                <li>HOME</li>
                <li onClick={onClick}>SERVICES</li>
            </ul>  
            
        </div>
        <Image />   
    </div>
  )
}

function Image()  {
    const images = [
        {url: temp},
        {url: image3},
        {url: image2}
    ];

    return (
      <div style={{display:"flex"}}>
      <div className='image-container'>
          <SimpleImageSlider 
              width={"650px"} 
              height={"435px"} 
              images={images}
              showBullets={true}
              showNavs={true} 
              style={{marginLeft:"auto",marginRight:"auto",marginTop:"7px",transform:`scale(${0.9})`}}
          />
          
      </div>
      <div className="image-container1">
        {/* <img src="https://www.annauniv.edu/dist/assests/CEG.png" alt="Your Image" /> */}
        <div className="text-overlay1">
          
        
  
        This portal provides a comprehensive solution tailored for the needs of students, staff, and the department head. With a user-friendly interface, staff can efficiently take attendance, while students can easily access their attendance percentage and receive email notifications if their attendance falls below a certain threshold. Students can also input and manage their blue card details, with the ability for staff to make necessary edits. Additionally, students can analyze their CGPAs, empowering them to track their academic progress. All these features are accessible to the department head, providing a holistic view of departmental activities and student performance.
        </div>
      </div>

    
      </div>
    );
}

export default Header