import React from 'react';
import { TimelineMax, Linear } from "gsap/all";
import ScrollMagic from "./ScrollMagic";

const Content=()=> {
    var controller2 = new ScrollMagic.Controller();
    var t2 = new TimelineMax();
    t2.fromTo(
        ".content",
        1,
        { yPercent: 0, opacity:1 },
        { yPercent: -100, opacity:0, ease: Linear.easeNone },
        "+=1"
    );
    const sc1 = new ScrollMagic.Scene({
        triggerElement: ".content",
        triggerHook: "onLeave",
        duration: "500%"
      });
      sc1.setPin(".content").setTween(t2).addTo(controller2);
    return (
        <div className="content">content</div>
    );
}
 
export default Content;