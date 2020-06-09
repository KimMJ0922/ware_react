import React, { useRef, useEffect } from "react";
import MainTop from '../top/MainTop';
import { TimelineMax, TweenMax, Linear } from "gsap/all";
import ScrollMagic from "./ScrollMagic"
import * as THREE from "three";
import img1 from '../image/1.gif';
import img2 from '../image/2.gif';
import img3 from '../image/3.gif';
import img4 from '../image/4.gif';
import img5 from '../image/5.gif';
import img6 from '../image/6.gif';
import img7 from '../image/7.gif';
//import img8 from '../image/8.gif';
import img9 from '../image/9.gif';
//import img10 from '../image/10.gif';
import './Main.css';
import { GpsFixed } from "@material-ui/icons";

const Main = () => {
  /*three애니메이션*/
  const mount = useRef(null);
  var scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 5;
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
      
  //var geometry = new THREE.SphereGeometry(9, 14, 10, 0, 6.283, 0.9, 1.3);
  var geometry = new THREE.SphereGeometry(250, 14, 10);
	var material = 
	new THREE.MeshBasicMaterial();
	var sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

	// squares
  var parent_obj = new THREE.Object3D();
  const loader = new THREE.TextureLoader();

  // squares1
	var square_geom = new THREE.PlaneGeometry(10, 6);
  var square_material = new THREE.MeshBasicMaterial({
    map: loader.load(img1),
    side: THREE.DoubleSide,
    transparent: true
  });
  var mesh = new THREE.Mesh(square_geom, square_material);
  // position square
  mesh.position.set(18,9,0);
  // rotate square to face target
  mesh.lookAt(sphere.position);
  parent_obj.add(mesh);

  // squares2
  var square_geom = new THREE.PlaneGeometry(10, 6);
  var square_material = new THREE.MeshBasicMaterial({
    map: loader.load(img2),
    side: THREE.DoubleSide,
    transparent: true
  });
  var mesh = new THREE.Mesh(square_geom, square_material);
  // position square
  mesh.position.set(18,-9,15);
  // rotate square to face target
  mesh.lookAt(sphere.position);
  parent_obj.add(mesh);

  // squares3
  var square_geom = new THREE.PlaneGeometry(10, 6);
  var square_material = new THREE.MeshBasicMaterial({
    map: loader.load(img3),
    side: THREE.DoubleSide,
    transparent: true
  });
  var mesh = new THREE.Mesh(square_geom, square_material);
  // position square
  mesh.position.set(4,8,24);
  // rotate square to face target
  mesh.lookAt(sphere.position);
  parent_obj.add(mesh);

  // squares4
  var square_geom = new THREE.PlaneGeometry(10, 6);
  var square_material = new THREE.MeshBasicMaterial({
    map: loader.load(img4),
    side: THREE.DoubleSide,
    transparent: true
  });
  var mesh = new THREE.Mesh(square_geom, square_material);
  // position square
  mesh.position.set(15,-5,-13);
  // rotate square to face target
  mesh.lookAt(sphere.position);
  parent_obj.add(mesh);

  // squares5
  var square_geom = new THREE.PlaneGeometry(10, 6);
  var square_material = new THREE.MeshBasicMaterial({
    map: loader.load(img5),
    side: THREE.DoubleSide,
    transparent: true
  });
  var mesh = new THREE.Mesh(square_geom, square_material);
  // position square
  mesh.position.set(8,12,-25);
  // rotate square to face target
  mesh.lookAt(sphere.position);
  parent_obj.add(mesh);

  // squares6
  var square_geom = new THREE.PlaneGeometry(10, 6);
  var square_material = new THREE.MeshBasicMaterial({
    map: loader.load(img6),
    side: THREE.DoubleSide,
    transparent: true
  });
  var mesh = new THREE.Mesh(square_geom, square_material);
  // position square
  mesh.position.set(-18,9,0);
  // rotate square to face target
  mesh.lookAt(sphere.position);
  parent_obj.add(mesh);
  
  // squares7
  var square_geom = new THREE.PlaneGeometry(10, 6);
  var square_material = new THREE.MeshBasicMaterial({
    map: loader.load(img7),
    side: THREE.DoubleSide,
    transparent: true
  });
  var mesh = new THREE.Mesh(square_geom, square_material);
  // position square
  mesh.position.set(-18,-9,15);
  // rotate square to face target
  mesh.lookAt(sphere.position);
  parent_obj.add(mesh);

  // squares8
  var square_geom = new THREE.PlaneGeometry(10, 6);
  var square_material = new THREE.MeshBasicMaterial({
    map: loader.load(img9),
    side: THREE.DoubleSide,
    transparent: true
  });
  var mesh = new THREE.Mesh(square_geom, square_material);
  // position square
  mesh.position.set(-15,-5,-20);
  // rotate square to face target
  mesh.lookAt(sphere.position);
  parent_obj.add(mesh);
  
  scene.add(parent_obj);
      
  const animate=()=>{
      requestAnimationFrame(animate);
      parent_obj.rotation.y += 0.0035;
      renderer.render(scene, camera);
  }

  const update = (y) => {
      if(y<0){
        parent_obj.rotation.y -= 0.2;
      }else{
        parent_obj.rotation.y += 0.2;
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
        tl.to(
          ".logo",
          1,
          { yPercent: -100, opacity:0, ease: Linear.easeNone },
          "+=1"
        );
        tl.to(
          "#pinMaster",
          1,
          { opacity:0, ease: Linear.easeOut },
          "+=1"
        );
        tl.fromTo(
          ".Container",
          1,
          { yPercent: 0, opacity:0 },
          { opacity:1, position:"fixed", ease: Linear.easeNone },
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

    const moveTop=()=>{

    }
    return (
      <div className="main">
        <div id="pinMaster">
            <div id="pinContainer">
              <div className="wrapper" id="js-wrapper">
                <div className="cube" onWheel={onWheel} ref={mount}>
                  <section className="section">
                    <span className="logo">Ware.gg</span>
                    <span className="ment" id="ment0">Scroll -></span>
                    <span className="ment" id="ment1">나만의 암기법을 공유하세요!</span>
                    <span className="ment" id="ment2">나만의 학습세트를 만들어보세요!</span>
                    <span className="ment" id="ment3">외우려고 노력하지 않아도 암기를 도와드립니다!</span>
                  </section>
                </div>
              </div>
            </div>
        </div>
        <div className="Container">
          enter the email
        </div>
      </div>
    );
};
  
  export default Main;