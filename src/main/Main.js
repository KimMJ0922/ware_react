import React, { useRef, useEffect } from "react";
import { TimelineMax, TweenMax, Linear } from "gsap/all";
import ScrollMagic from "./ScrollMagic"
import * as THREE from "three";
import img1 from './image/4.gif';
import './Main.css';

const Main = () => {
  /*three애니메이션*/
  const mount = useRef(null);
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
  );
  
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
      

  var geometry = new THREE.SphereGeometry(9, 14, 5, 0, 6.283, 0.9, 1.3);
  var material = new THREE.MeshBasicMaterial({ color: 0xf00000, wireframe: true});
  
  // var geometry = new THREE.BoxGeometry( 10, 10, 10 );
  // const loader = new THREE.TextureLoader();
  
  // const material = [
  //   new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg'), side:THREE.BackSide}),
  //   new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-2.jpg'), side:THREE.BackSide}),
  //   new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-3.jpg'), side:THREE.BackSide}),
  //   new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-4.jpg'), side:THREE.BackSide}),
  //   new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-5.jpg'), side:THREE.BackSide}),
  //   new THREE.MeshBasicMaterial({map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-6.jpg'), side:THREE.BackSide}),
  // ];
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
      
  camera.position.z = 35;

  var parent_obj = new THREE.Object3D();
  let image_geom = new THREE.PlaneGeometry(30,30);
  let image_meterial = new THREE.MeshBasicMaterial({
    color:0xffffff,
    side: THREE.DoubleSide,
    transparent:true
  });
  let mesh = new THREE.Mesh(image_geom, image_meterial);
  
  mesh.position.set(100,100,-100);

  mesh.lookAt(cube.position);

  parent_obj.add(mesh);

  const animate=()=>{
      requestAnimationFrame(animate);
      cube.rotation.y += 0.0025;
      renderer.render(scene, camera);
  }

  const update = (y) => {
      if(y<0){
          cube.rotation.y -= 0.1;
      }else{
          cube.rotation.y += 0.1;
      }
      
      renderer.render(scene, camera);
  };
    
    useEffect(() => {

        /*three애니메이션*/
        mount.current.appendChild(renderer.domElement);
        animate();

        var controller = new ScrollMagic.Controller();
        var tl = new TimelineMax();
        tl.fromTo(
          "#ment0",
          1,
          { yPercent: 0, opacity:1 },
          { yPercent: -100, opacity:0, ease: Linear.easeNone },
          "+=1"
        );
        tl.fromTo(
          "#ment1",
          1,
          { yPercent: 100, opacity:0 },
          { yPercent: 0, opacity:1, ease: Linear.easeNone },
          "+=1"
        );
        tl.to(
            "#ment1",
            1,
            { yPercent: -100, opacity:0, ease: Linear.easeNone },
            "+=1"
        );
        tl.fromTo(
          "#ment2",
          1,
          { yPercent: 100, opacity:0 },
          { yPercent: 0, opacity:1, ease: Linear.easeNone },
          "+=1"
        );
        tl.to(
            "#ment2",
            1,
            { yPercent: -100, opacity:0, ease: Linear.easeNone },
            "+=1"
        );
        tl.fromTo(
            "#ment3",
            1,
            { yPercent: 100, opacity:0 },
            { yPercent: 0, opacity:1, ease: Linear.easeNone },
            "+=1"
        );
        tl.to(
            "#ment3",
            1,
            { yPercent: -100, opacity:0, ease: Linear.easeNone },
            "+=1"
        );
        const sc = new ScrollMagic.Scene({
          triggerElement: "#pinMaster",
          triggerHook: "onLeave",
          duration: "700%"
        });
        sc.setPin("#pinMaster")
          .setTween(tl)
          .addTo(controller);

          window.addEventListener('resize', onResize);

          // clean up function
          return () => {
            // remove resize listener
            window.removeEventListener('resize', onResize);
          }
    }, []);
    const onWheel=(e)=> {
      cancelAnimationFrame(animate);
      update(e.deltaY);
    };

    const onResize=()=> {

      camera.aspect = window.innerWidth / window.innerHeight;

      renderer.setSize( window.innerWidth, window.innerHeight );

      renderer.render();

    }
    return (
      <div className="main">
        <div id="pinMaster">
            <div id="pinContainer">
              <div className="wrapper" id="js-wrapper">
                <div className="sections" id="js-slideContainer">
                  <section className="section">
                    <img src={img1} className="imagePos1"></img>
                    <span className="ment" id="ment0">Ware.gg<br/>Scroll -></span>
                    <span className="ment" id="ment1">나만의 암기법을 공유하세요!</span>
                    <span className="ment" id="ment2">나만의 학습세트를 만들어보세요!</span>
                    <span className="ment" id="ment3">외우려고 노력하지 않아도 암기를 도와드립니다!</span>
                  </section>
                </div>
                <div className="cube" onWheel={onWheel} ref={mount}></div>
              </div>
            </div>
            <section className="spacer">Content</section>
            <footer>Footer</footer>
        </div>
      </div>
    );
};
  
  export default Main;