import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

export default function Lucario() {
  const canvasRef = useRef(null);
  const mouseDownRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.y = 0.5;
    camera.position.x = -2;
    camera.position.z = 2.5;
    scene.add(camera);

    // Resize
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;

      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Lights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    const ambientLight = new THREE.AmbientLight(0x404040);
    directionalLight.position.set(0, 0, 2);
    scene.add(ambientLight, directionalLight);

    // Load the GLTF model
    const loader = new GLTFLoader();
    let lucarioModel;

    loader.load("/src/components/lucario/scene.gltf", function (gltf) {
      lucarioModel = gltf.scene;
      scene.add(lucarioModel);
    });

    // Event listeners
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    function handleMouseDown() {
      mouseDownRef.current = true;
    }

    function handleMouseMove(event) {
      if (mouseDownRef.current) {
        const rotationAmount = event.movementX * 0.01;

        if (lucarioModel) {
          lucarioModel.rotation.y += rotationAmount;
        }
      }
    }

    function handleMouseUp() {
      mouseDownRef.current = false;
    }

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(sizes.width, sizes.height);

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      if (lucarioModel) {
        lucarioModel.position.x = -3;
        lucarioModel.rotation.y += 0.001;
        // Adjust the rotation speed as desired
      }

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      // Cleanup
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <canvas
      className="z-1 absolute top-28 left-0 hover:cursor-grab "
      ref={canvasRef}
    />
  );
}
