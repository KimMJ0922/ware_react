import React, { useRef, useEffect,useState } from "react";
import { TimelineMax, Linear, TimelineLite } from "gsap/all";
import ScrollMagic from "./ScrollMagic"
import * as THREE from "three";

import img1 from '../image/1.jpg';
import img2 from '../image/2.jpg';
import img3 from '../image/3.jpg';
import img4 from '../image/4.jpg';
import img5 from '../image/5.jpg';
import img6 from '../image/6.png';
import img7 from '../image/7.jpg';
import img8 from '../image/8.jpg';

import img9 from '../image/9.png';
import img10 from '../image/10.png';
import img11 from '../image/11.png';

import './Main.css';

import FloatForm from './FloatForm';


const Main = (props) => {
  /*three애니메이션*/
  const [isLoding, setIsLoding]=useState(false);
  const ment1 = useRef(null);
  var scene = new THREE.Scene();
  
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
  
  var renderer = new THREE.WebGLRenderer();
  var geometry = new THREE.SphereGeometry(250, 14, 10);
	var material = new THREE.MeshBasicMaterial();
  var sphere = new THREE.Mesh(geometry, material);
  
  // squares
  var parent_obj = new THREE.Object3D();
  const loader = new THREE.TextureLoader();

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
  const init=()=>{
    /*three애니메이션*/
    scene.background = new THREE.Color( 0xffffff );
    camera.position.z = 5;
    renderer.setSize(window.innerWidth, window.innerHeight);
        
    //var geometry = new THREE.SphereGeometry(9, 14, 10, 0, 6.283, 0.9, 1.3);
    
    scene.add(sphere);

    // squares1
    var square_geom = new THREE.PlaneGeometry(13, 8);
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
    var square_geom = new THREE.PlaneGeometry(13, 8);
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
    var square_geom = new THREE.PlaneGeometry(13, 8);
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
    var square_geom = new THREE.PlaneGeometry(13, 8);
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
    var square_geom = new THREE.PlaneGeometry(13, 8);
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
    var square_geom = new THREE.PlaneGeometry(13, 8);
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
    var square_geom = new THREE.PlaneGeometry(13, 8);
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
    var square_geom = new THREE.PlaneGeometry(13, 8);
    var square_material = new THREE.MeshBasicMaterial({
      map: loader.load(img8),
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
    setIsLoding(true);
  }
  useEffect(() => {
    init();
    //mount.current.appendChild(renderer.domElement);
    if(isLoding){
      document.getElementById("sphere").appendChild(renderer.domElement);
    }
    
    animate();

    //var ment_1 = ment1.current.innerText;
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
      "#pinContainer",
      1,
      { opacity:0, ease: Linear.easeOut },
      "+=1"
    );
    tl.fromTo(
      ".Container",
      1,
      { opacity:0 },
      { opacity:1, ease: Linear.easeNone },
      "+=1"
    );
    // tl.fromTo(
    //   ".FloatContainer",
    //   1,
    //   { yPercent: 100, opacity:0 },
    //   { yPercent: -20, opacity:1, ease: Linear.easeNone },
    //   "+=1"
    // );
    tl.fromTo(
      "#floatitem1",
      1,
      { yPercent: 50, opacity:0 },
      { yPercent: 0, opacity:1, ease: Linear.easeNone },
      "+=1"
    );
    tl.fromTo(
      "#floatitem2",
      1,
      { yPercent: 50, opacity:0 },
      { yPercent: 0, opacity:1, ease: Linear.easeNone },
      "+=1"
    );
    tl.fromTo(
      "#floatitem3",
      1,
      { yPercent: 50, opacity:0 },
      { yPercent: 0, opacity:1, ease: Linear.easeNone },
      "+=1"
    );
    tl.fromTo(
      ".FloatForm",
      1,
      { yPercent: 100, opacity:0 },
      { yPercent: 0, opacity:1, ease: Linear.easeNone },
      "+=1"
    );
    let sc = new ScrollMagic.Scene({
      triggerElement: "#pinMaster",
      triggerHook: 0,
      duration: "700%"
    });
    sc.setPin("#pinMaster").setTween(tl).addTo(controller);

    window.addEventListener('resize', onResize);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', onResize);
    }
  }, [isLoding]);

  const onWheel=(e)=> {
    cancelAnimationFrame(animate);
    update(e.deltaY);
  };

  const onResize=()=> {

    camera.aspect = window.innerWidth / window.innerHeight;

    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.render();

  }

  const MainstartBtn=(data)=>{
    props.startBtn(data);
  }

  if(isLoding){
    return (
      <div className="main">
        <div id="pinMaster">
          <div id="pinContainer">
            <div className="wrapper" id="js-wrapper">
              <div className="cube" id="sphere" onWheel={onWheel}>
                <section className="section">
                  <span className="logo">Ware.gg</span>
                  <span className="ment" id="ment0">Scroll -></span>
                  <span className="ment" id="ment1" ref={ment1}>나만의 암기법을 공유하세요!</span>
                  <span className="ment" id="ment2">나만의 학습세트를 만들어보세요!</span>
                  <span className="ment" id="ment3">외우려고 노력하지 않아도 암기를 도와드립니다!</span>
                </section>
              </div>
            </div>
          </div>
          <div className="Container">
            <div className="FloatContainer">
              <div className="floatitem" id="floatitem1">
                <img src={img9} className="introimg" alt=''></img>
                <br /><span>나만의 학습세트를 만들어 학습하세요!</span>
              </div>
              <div className="floatitem" id="floatitem2">
                <img src={img10} className="introimg" alt=''></img>
                <span>학습한 내역을 다이어그램으로</span><span>한눈에 확인 시켜드립니다!</span>
              </div>
              <div className="floatitem" id="floatitem3">
                <img src={img11} className="introimg" alt=''></img>
                <span>장터에서 사용자들과 학습법을 공유하고</span><span>포인트를 모아보세요!</span>
              </div>
            </div>
            <FloatForm MainstartBtn={MainstartBtn} />
          </div>
        </div>
      </div>
    );
  }else{
    return(
      <div>로딩중...</div>
    )
  }
};

export default Main;