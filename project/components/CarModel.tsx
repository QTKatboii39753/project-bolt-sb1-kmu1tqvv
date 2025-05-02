import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { Asset } from 'expo-asset';

// Mock car movement values
interface CarPosition {
  x: number;
  y: number;
  z: number;
  rotationY: number;
  wheelRotation: number;
  speed: number;
}

interface CarModelProps {
  position?: CarPosition;
  style?: any;
}

export default function CarModel({ 
  position = { x: 0, y: 0, z: 0, rotationY: 0, wheelRotation: 0, speed: 0 },
  style 
}: CarModelProps) {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const glViewRef = useRef<GLView>(null);

  // This is a simplified representation since we can't load actual 3D models
  // In a real app, you would use proper 3D models loaded from .glb or .obj files
  const onContextCreate = async (gl: any) => {
    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    // Create a simple car body
    const carBody = new THREE.Group();
    
    // Main body
    const bodyGeometry = new THREE.BoxGeometry(2, 0.5, 4);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x0078FF,
      metalness: 0.8,
      roughness: 0.2
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    carBody.add(body);
    
    // Cabin
    const cabinGeometry = new THREE.BoxGeometry(1.5, 0.5, 2);
    const cabinMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x202A66,
      metalness: 0.5,
      roughness: 0.1
    });
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    cabin.position.y = 1;
    cabin.position.z = -0.2;
    carBody.add(cabin);
    
    // Create wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    
    const frontLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontLeftWheel.rotation.z = Math.PI / 2;
    frontLeftWheel.position.set(-1, 0.4, -1.2);
    carBody.add(frontLeftWheel);
    
    const frontRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontRightWheel.rotation.z = Math.PI / 2;
    frontRightWheel.position.set(1, 0.4, -1.2);
    carBody.add(frontRightWheel);
    
    const rearLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rearLeftWheel.rotation.z = Math.PI / 2;
    rearLeftWheel.position.set(-1, 0.4, 1.2);
    carBody.add(rearLeftWheel);
    
    const rearRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rearRightWheel.rotation.z = Math.PI / 2;
    rearRightWheel.position.set(1, 0.4, 1.2);
    carBody.add(rearRightWheel);
    
    // Add headlights
    const headlightGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 16);
    const headlightMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFFFF,
      emissive: 0xFFFFAA,
      emissiveIntensity: 1
    });
    
    const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    leftHeadlight.rotation.x = Math.PI / 2;
    leftHeadlight.position.set(-0.6, 0.5, -2);
    carBody.add(leftHeadlight);
    
    const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    rightHeadlight.rotation.x = Math.PI / 2;
    rightHeadlight.position.set(0.6, 0.5, -2);
    carBody.add(rightHeadlight);
    
    // Add car to scene
    scene.add(carBody);
    
    // Create a ground plane
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);

    // Animation loop
    function animate() {
      timeout.current = requestAnimationFrame(animate);
      
      // Update car position based on props
      carBody.position.set(position.x, position.y, position.z);
      carBody.rotation.y = position.rotationY;
      
      // Rotate wheels based on speed
      frontLeftWheel.rotation.x += position.speed * 0.01;
      frontRightWheel.rotation.x += position.speed * 0.01;
      rearLeftWheel.rotation.x += position.speed * 0.01;
      rearRightWheel.rotation.x += position.speed * 0.01;
      
      // Turn front wheels based on wheel rotation
      frontLeftWheel.rotation.y = position.wheelRotation;
      frontRightWheel.rotation.y = position.wheelRotation;
      
      renderer.render(scene, camera);
      gl.endFrameEXP();
    }
    
    animate();
  };

  useEffect(() => {
    return () => {
      if (timeout.current) {
        cancelAnimationFrame(timeout.current);
      }
    };
  }, []);

  return (
    <View style={[styles.container, style]}>
      <GLView 
        ref={glViewRef}
        style={styles.glView} 
        onContextCreate={onContextCreate} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  glView: {
    flex: 1,
  },
});