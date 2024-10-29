import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { degToRad } from 'three/src/math/MathUtils.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// SCENE RELATED CODES
// TODO : Change the scene setup with babylon.js sandbox page
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a simple plane for the floor
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to lay flat
scene.add(floor);

// Add a backdrop (optional)
const backdropGeometry = new THREE.PlaneGeometry(10, 5);
const backdropMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const backdrop = new THREE.Mesh(backdropGeometry, backdropMaterial);
backdrop.position.set(0, 2.5, -5);
backdrop.rotation.x = -Math.PI / 4; // Tilt the backdrop
scene.add(backdrop);

// Load the UR5e
let shoulder, upperarm, forearm, wrist1, wrist2, wrist3;
const loader = new GLTFLoader();
loader.load('public/ur5_e/ur5_e_v1.glb', function (gltf) {
    gltf.scene.scale.set(1, 1, 1); // Adjust scale as needed
    gltf.scene.position.set(0, 0, 0); // Center the model
    scene.add(gltf.scene);

    gltf.scene.traverse((child) => {
        // Forearm is mesh somehow
        // Other variables are groups
        if (child.name.includes("shoulder")) shoulder = child;
        else if (child.name.includes("upperarm")) upperarm = child;
        else if (child.name.includes("forearm")) forearm = child;  
        else if (child.name.includes("wrist1")) wrist1 = child;
        else if (child.name.includes("wrist2")) wrist2 = child;
        else if (child.name.includes("wrist3")) wrist3 = child;
    })

    // Set the base pose
    const zAxis = new THREE.Vector3(0, 0, 1);
    const yAxis = new THREE.Vector3(0, 1, 0);
    // shoulder.rotateOnAxis(yAxis, degToRad(0));
    // upperarm.rotateOnAxis(zAxis, degToRad(30));
    // forearm.rotateOnAxis(zAxis, degToRad(105));
    // wrist1.rotateOnAxis(zAxis, degToRad(-120)); // -120< up, -120> down
    // wrist2.rotateOnAxis(yAxis, degToRad(90)); // >90 right, <90 left
    // wrist3.rotateOnAxis(zAxis, degToRad(0));

}, undefined, function (error) {
    console.error("Error loading model:", error);
});

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Stronger light
directionalLight.position.set(5, 10, 5); // Position it above and in front of the product
directionalLight.castShadow = true; // Enable shadows
scene.add(directionalLight);

// Optional: Add a hemisphere light for a soft, natural effect
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.3);
scene.add(hemiLight);

// Camera positioning
camera.position.set(-2, 2, 0);
camera.lookAt(0, 0, 0);
const controls = new OrbitControls( camera, renderer.domElement );

// Add Axes Helper
const axesHelper = new THREE.AxesHelper(5); // Length of the axes
scene.add(axesHelper);


// ROBOT RELATED OPERATIONS

const breathe_params = {
    cr: 60,  // control rate in real robot
    amp: 1, // amplitude
    bps: 0.25, // breathe per second
    velocity_profile: Math.sin // velocity profile
}

var breathe_counter = 0;

function breatheSin(i) {
    const bps = breathe_params["bps"];
    const cr = breathe_params["cr"]; 
    var angle = breathe_params["velocity_profile"](2*Math.PI*bps/cr * i)*bps;
    upperarm.rotateZ(angle/25);
    forearm.rotateZ(-angle/20);
}

function forward_kinematics_head(joint_angles){
    q0 = joint_angles[0];
    q1 = joint_angles[1];
    q2 = joint_angles[2];
    
    cq0 = Math.cos(q0);
    cq1 = Math.cos(q1);
    cq2 = Math.cos(q2);

    sq0 = Math.sin(q0);
    sq1 = Math.sin(q1);
    sq2 = Math.sin(q2);

    T_2_b = [
        [ // First row
            cq0 * cq1 * cq2 - cq0 * sq1 * sq2,
            - cq0 * cq1 * sq2 - cq0 * sq1 * sq2,
            sq0,
            -425 * cq0 * sq1 - 133 * sq0
        ],
        [ // Second row
            sq1 * cq2 + cq1 * sq2,
            -sq1 * sq2 + cq1 * cq2,
            0,
            425 * cq1 + 162.5  
        ],
        [ // Third row
            -sq0 * cq1 * cq2 + sq0 * sq1 * sq2,
            sq0 * sq1 * sq2 + sq0 * sq1 * cq2,
            cq0,
            425 * sq0 * sq1 - 133 * cq0,
            0
        ],
        [ // Fourth row
            0,
            0,
            0,
            1
        ]
    ]
}

// TODO : Add matrix multiplication

// TODO : Add object creation for joints to check it works 

// Animation loop
function animate() {
    setTimeout( function() {

        requestAnimationFrame( animate );

    }, 1000 / breathe_params["cr"]);
    
    // breatheSin(breathe_counter);
    breathe_counter += 1;
    breathe_counter = breathe_counter % (breathe_params["cr"] / breathe_params["bps"]);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    
    renderer.render(scene, camera);
}

// Resize handling
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

animate();