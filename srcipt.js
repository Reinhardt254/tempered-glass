function loco(){
   gsap.registerPlugin(ScrollTrigger);
 
 
 
 const locoScroll = new LocomotiveScroll({
 el: document.querySelector("#main"),
 smooth: true
 });
 // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
 locoScroll.on("scroll", ScrollTrigger.update);
 
 // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
 ScrollTrigger.scrollerProxy("#main", {
 scrollTop(value) {
   return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
 }, // we don't have to define a scrollLeft because we're only scrolling vertically.
 getBoundingClientRect() {
   return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
 },
 // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
 pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
 });
 
 
 
 
 
 // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
 ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
 
 // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
 ScrollTrigger.refresh();
 
 }
 loco()
 
gsap.to("#main",{
   backgroundcolor:"#000",
   ScrollTrigger:{
       trigger:"#main",
       scroller:"#main",
       marker:true,
       start:"top-25%",
       end:"top-70%",
       scrub:2
   }

})
gsap.from(".card",{
   scale:0.8,
   opacity: 0,
   duration: 1,
   scrollTrigger: {
       trigger: ".card",
       scroller: "#main",
       start: "top 70%",
       end: "top 65%",
       scrub: 1,
       opacity: 1
   }
})
gsap.from("#page5",{
 scale:0.8,
 opacity: 0,
 duration: 1,
 scrollTrigger: {
     trigger: "#page5",
     scroller: "#main",
     start: "top 70%",
     end: "top 65%",
     scrub: 1,
     opacity: 1
 }
})

