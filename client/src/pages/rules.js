import React from "react";
import "../css/style.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const CreateRecepie = () => {
    return( 
    <div className="rule-page">
        <div className="bat">
       
        <img  className= "vk"
        src= "https://d13ir53smqqeyp.cloudfront.net/d11-static-pages/static-content/images/battingpoints.png" alt= "Batting"></img>
       <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Batting Rules</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <h1>Batting points</h1>
            <ul>
                <li className="row"><span>Run</span> <span className="box ">+1</span>  </li>    
                <li className="row"> <span>Boundary Bonus  </span>  <span className="box">  +1 </span>  </li>
                <li className="row"> <span> Six Bonus   </span>     <span className="box"> +2</span>    </li>
                <li className="row"> <span> Half-Century Bonus</span>  <span className="box"> +8</span> </li>
                <li className="row"> <span> Century Bonus</span> <span className="box">16</span>    </li>
                <li className="row"> <span> Dismical for a duck</span>  <span className="box"> -2</span></li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
 </div>
        <div className="ball">
            <img className="ms"
             src= "https://d13ir53smqqeyp.cloudfront.net/d11-static-pages/static-content/images/bowling_points.png" alt= ""></img>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Balliing Rules</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <h1>Bowling points</h1>
              <ul>  
                <li className="row"> <span>Wicket(Excluding Runout)</span>  <span className="box"> 25</span>  </li>
                <li className="row"> <span>Bonnus(LBW/Bowled) </span> <span className="box"> +8</span>  </li>
                <li className="row"> <span> 3 WicketBonus </span> <span className="box"> +4</span> </li>
                <li className="row"> <span>4 WicketBonus</span> <span className="box">+8</span>  </li>
                <li className="row"> <span>5 WicketBonus</span> <span className="box"> 16 </span>  </li>
                <li className="row"> <span>Maiden Over</span> <span className="box">12</span>  </li>
             </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
        </div>
        <div className="field">
            <img className="jr"
            src="https://d13ir53smqqeyp.cloudfront.net/d11-static-pages/static-content/images/fielding_points.png" alt="Fielder"></img>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Fieldiing Rules</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <h1>Fielding Points</h1>
                <ul>
                    <li className="row"> <span>Catch  </span> <span className="box"> +8</span>  </li>
                    <li className="row"> <span>3 Catch Bonus</span> <span className="box">+4</span>  </li>
                    <li className="row"> <span> Stumping</span> <span className="box">12</span>  </li>
                    <li className="row"> <span>Run-Out(DirectHit)</span> <span className="box">16</span>  </li>
                    <li className="row"><span>Run-Out(Not a DirectHit)</span> <span className="box">+6</span>  </li>
                    <li className="row"> <span> Catch-miss </span>  <span className="box">-2</span>  </li>
                </ul>
          </Typography>
        </AccordionDetails>
      </Accordion> 
        </div>
    </div>
    );
}
export default CreateRecepie; 