import React from "react";
import "../css/style.css";
export const CreateRecepie = () => {
    return( 
    <div className="rule-page">
        <div className="bat">
        <img  className= "vk"
        src= "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/326800/326828.jpg" alt= "Batting"></img>
        <h1>Batting points</h1>
            <ul>
                <li className="row"><span>Run</span> <span className="box ">+1</span>  </li>    
                <li className="row"> <span>Boundary Bonus  </span>  <span className="box">  +1 </span>  </li>
                <li className="row"> <span> Six Bonus   </span>     <span className="box"> +2</span>    </li>
                <li className="row"> <span> Half-Century Bonus</span>  <span className="box"> +8</span> </li>
                <li className="row"> <span> Century Bonus</span> <span className="box">16</span>    </li>
                <li className="row"> <span> Dismical for a duck</span>  <span className="box"> -2</span></li>
            </ul>
        </div>
        <div className="ball">
            <img className="ms"
             src= "https://i.guim.co.uk/img/media/7c54b4825efc82d60efe350e13ee1ecfbeb75790/0_139_3000_1801/master/3000.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=43509f823df107e16a7ee5366bad7309" alt= ""></img>
            <h1>Bowling points</h1>
              <ul>  
                <li className="row"> <span>Wicket(Excluding Runout)</span>  <span className="box"> 25</span>  </li>
                <li className="row"> <span>Bonnus(LBW/Bowled) </span> <span className="box"> +8</span>  </li>
                <li className="row"> <span> 3 WicketBonus </span> <span className="box"> +4</span> </li>
                <li className="row"> <span>4 WicketBonus</span> <span className="box">+8</span>  </li>
                <li className="row"> <span>5 WicketBonus</span> <span className="box"> 16 </span>  </li>
                <li className="row"> <span>Maiden Over</span> <span className="box">12</span>  </li>
             </ul>  
        </div>
        <div className="field">
            <img className="jr"
            src="https://im.indiatimes.in/content/2020/Jul/fb_5f1e6ec07bf08.jpg?w=1200&h=900&cc=1" alt="Fielder"></img>
            <h1>Fielding Points</h1>
                <ul>
                    <li className="row"> <span>Catch  </span> <span className="box"> +8</span>  </li>
                    <li className="row"> <span>3 Catch Bonus</span> <span className="box">+4</span>  </li>
                    <li className="row"> <span> Stumping</span> <span className="box">12</span>  </li>
                    <li className="row"> <span>Run-Out(DirectHit)</span> <span className="box">16</span>  </li>
                    <li className="row"><span>Run-Out(Not a DirectHit)</span> <span className="box">+6</span>  </li>
                    <li className="row"> <span> Catch-miss </span>  <span className="box">-2</span>  </li>
                </ul>
        </div>
    </div>
    );
}
export default CreateRecepie; 