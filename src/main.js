import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { degToRad } from 'three/src/math/MathUtils.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// SCENE RELATED CODES
// TODO : Change the scene setup with babylon.js sandbox page
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let exrCubeRenderTarget

THREE.DefaultLoadingManager.onLoad = function ( ) {

    pmremGenerator.dispose();

};

// Load EXR file as background
const loaderEXR = new THREE.EXRLoader().load( 'public/studio_small_02_4k.exr', function ( texture ) {

    texture.mapping = THREE.EquirectangularReflectionMapping;
    exrCubeRenderTarget = pmremGenerator.fromEquirectangular( texture );
    floorMaterial.envMap = exrCubeRenderTarget.texture;
    floorMaterial.needsUpdate = true;
    scene.background = texture;
} );

const pmremGenerator = new THREE.PMREMGenerator( renderer );
pmremGenerator.compileEquirectangularShader();


let breathe_params = {
    cr: 60,  // control rate in real robot
    amp: 500, // amplitude
    bps: 0.25, // breathe per second
    velocity_profile: base_vel_at_t, // velocity profile
    direction: [1, 1, 0]
}

// Initialize the GUI
const gui = new dat.GUI();

// Add GUI controls for each parameter
let breathe_params_gui = {
    cr: 60,  // control rate in real robot
    amp: 500, // amplitude
    bps: 0.25, // breathe per second
    velocity_profile: base_vel_at_t, // velocity profile
    direction: [1, 1, 0]
}

// Amplitude (amp)
gui.add(breathe_params_gui, "amp", 0, 1000).step(10).name("Amplitude");

// Breathe Per Second (bps)
gui.add(breathe_params_gui, "bps", 0.1, 1.0).step(0.01).name("Breaths per Second");

// Velocity Profile (dropdown or text display)
gui.add(breathe_params_gui, "velocity_profile").name("Velocity Profile");

// Direction (use separate controls for each axis)
const directionFolder = gui.addFolder("Direction");
directionFolder.add(breathe_params_gui.direction, 0, -1, 1).step(0.1).name("X Axis");
directionFolder.add(breathe_params_gui.direction, 1, -1, 1).step(0.1).name("Y Axis");
directionFolder.add(breathe_params_gui.direction, 2, -1, 1).step(0.1).name("Z Axis");

// Optional: Open the direction folder by default
directionFolder.open();

const actions = {
    set_new_params : set_new_params_funct
};

function set_new_params_funct()
{
    breathe_params["amp"] = breathe_params_gui["amp"];
    breathe_params["bps"] = breathe_params_gui["bps"];
    breathe_params["direction"][0] = breathe_params_gui["direction"][0];
    breathe_params["direction"][1] = breathe_params_gui["direction"][1];
    breathe_params["direction"][2] = breathe_params_gui["direction"][2];
    
    robot_joint_state = [0, 30, 105, -130, 90, 0].map(angle => degToRad(angle));
    set_joint_state(robot_joint_state);
    breathe_counter = 0;
}

gui.add(actions, 'set_new_params').name("RESET");

// Create a simple plane for the floor
let floorGeometry = new THREE.PlaneGeometry(10, 10);
let floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xaaaaaa, 
    roughness: 0.0,
    metalness: 1.0,
    envMapIntensity: 1.0,
 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to lay flat
scene.add(floor);

// Load the UR5e
let shoulder, upperarm, forearm, wrist1, wrist2, wrist3;
let robot_joint_state = [0, 30, 105, -130, 90, 0].map(angle => degToRad(angle));
// let robot_joint_state = [0, 0, 0, 0, 0, 0].map(angle => degToRad(angle));

const loader = new GLTFLoader();
loader.load('public/ur5_e/ur5_e_v4.glb', function (gltf) {
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
        

        if (child.isMesh) console.log(child.name);
        if(child.isMesh && child.name.includes("Actor"))
        {
            child.material.envMapIntensity = 1.0;
            child.material.color.set(0xdddddd);
            child.material.metalness = 1;
            child.material.roughness = 0.2;
            child.material.envMap = exrCubeRenderTarget.texture;
            child.material.needsUpdate = true;
        }

        if (child.isMesh && 
            (child.name.includes("4001") 
            || child.name.includes("1008"))
        ){
            child.material.metalness = 0.0;
            child.material.roughness = 0.2;
            child.material.color.set(0x00c5ff);
            // console.log(child.material.blendColor);
        }
    })

    // Set the base pose
    const zAxis = new THREE.Vector3(0, 0, 1);
    const yAxis = new THREE.Vector3(0, 1, 0);
    set_joint_state(robot_joint_state);

}, undefined, function (error) {
    console.error("Error loading model:", error);
});

function set_joint_state(joint_state)
{
    shoulder.rotation.y = joint_state[0];
    upperarm.rotation.z = joint_state[1];
    forearm.rotation.z = joint_state[2];
    wrist1.rotation.z = joint_state[3];
    wrist2.rotation.y = joint_state[4];
    wrist3.rotation.z = joint_state[5];
}

// Add lighting
// SET TO HDRI
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
const EPS = 1e-6;
let breathing_data;
fetch('breathing_data.json')
    .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
        return response.json(); // Parse the JSON data from the response
    })
    .then(data => {
        breathing_data = data;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

function normalize(vector)
{
    let magnitude = vector.reduce((accumulator, currentValue) => accumulator + currentValue * currentValue, 0);
    magnitude = Math.sqrt(magnitude);
    if (magnitude == 0) return;
    return vector.map(elem => elem / magnitude);
}

breathe_params["direction"] = breathe_params["direction"]

var breathe_counter = 0;

function breatheSin(i) {
    const bps = breathe_params["bps"];
    const cr = breathe_params["cr"]; 
    var angle = breathe_params["velocity_profile"](2*Math.PI*bps/cr * i)*bps;
    upperarm.rotateZ(angle/25);
    forearm.rotateZ(-angle/20);
}

function jacobian_body(joint_angles){
    let q0 = joint_angles[0];
    let q1 = joint_angles[1];
    let q2 = joint_angles[2];
    
    let cq0 = Math.cos(q0);
    let cq1 = Math.cos(q1);
    let cq2 = Math.cos(q2);

    let sq0 = Math.sin(q0);
    let sq1 = Math.sin(q1);
    let sq2 = Math.sin(q2);

    let der_x_q0 = 392.2 * sq0 * cq1 * sq2 
        + 392.2 * sq0 * sq1 * cq2 
        + 425 * sq0 * sq1;
    
    let der_x_q1 = 392.2 * cq0 * sq1 * sq2
        - 392.2 * cq0 * cq1 * cq2
        - 425 * cq0 * cq1;
        
    let der_x_q2 = -392.2 * cq0 * cq1 * cq2
        + 392.2 * cq0 * sq1 * sq2;

    let der_y_q0 = 0;

    let der_y_q1 = -392.2 * cq1 * sq2
        - 392.2 * sq1 * cq2
        - 425 * sq1;

    let der_y_q2 = -392.2 * sq1 * cq2 
        - 392.2 * cq1 * sq2;

    let der_z_q0 = 392.2 * cq0 * sq1 * sq2
        + 392.2 * cq0 * sq1 * cq2
        + 23.85 * sq0
        + 425 * cq0 * sq1;

    let der_z_q1 = 392.2 * sq0 * sq1 * sq2
        + 392.2 * sq0 * sq1 * cq2
        + 425 * sq0 * cq1;

    let der_z_q2 = 392.2 * sq0 * sq1 * cq2
        - 392.2 * sq0 * sq1 * sq2;

    let jacobian = [[der_x_q0, der_x_q1, der_x_q2],
                    [der_y_q0, der_y_q1, der_y_q2],
                    [der_z_q0, der_z_q1, der_z_q2]];
    return jacobian;
}

function forward_kinematics_body(joint_angles){
    let q0 = joint_angles[0];
    let q1 = joint_angles[1];
    let q2 = joint_angles[2];
    
    let cq0 = Math.cos(q0);
    let cq1 = Math.cos(q1);
    let cq2 = Math.cos(q2);

    let sq0 = Math.sin(q0);
    let sq1 = Math.sin(q1);
    let sq2 = Math.sin(q2);

    // ur5e vs u5
    // 133 vs 109
    // 162.5 vs 89.1
    // 425 vs 425
    // 392.2 vs 392.2

    let T_2_b = [
        [ // First row
            cq0 * cq1 * cq2 - cq0 * sq1 * sq2,
            - cq0 * cq1 * sq2 - cq0 * sq1 * cq2,
            sq0,
            -425 * cq0 * sq1 - 109.15 * sq0
        ],
        [ // Second row
            sq1 * cq2 + cq1 * sq2,
            -sq1 * sq2 + cq1 * cq2,
            0,
            425 * cq1 + 89.159  
        ],
        [ // Third row
            -sq0 * cq1 * cq2 + sq0 * sq1 * sq2,
            sq0 * sq1 * sq2 + sq0 * sq1 * cq2,
            cq0,
            425 * sq0 * sq1 - 109.15 * cq0
        ],
        [ // Fourth row
            0,
            0,
            0,
            1
        ]
    ];

    // end of last link wrt joint affecting it in the joint's frame
    // let head_forearm =[[0], [392.2], [109.15], [1]];
    let head_forearm = [[1, 0, 0, 0],
                        [0, 1, 0, 392.2],
                        [0, 0, 1, 109.15],
                        [0, 0, 0, 1]];
    let head_base = matmul(T_2_b, head_forearm);
    
    // const geometry = new THREE.SphereGeometry(0.05, 32, 32);
    // const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: false });
    // let sphere = new THREE.Mesh(geometry, material);
    // sphere.position.set(head_base[0][3]/1000, head_base[1][3]/1000, head_base[2][3]/1000);
    // scene.add(sphere);

    return head_base;
}

function matmul(lhs, rhs){
    if (lhs[0].length != rhs.length)
    {
        console.log("dimension mismatch: ", lhs[0].length, rhs.length);
        return;
    }

    let [m, n, r] = [lhs.length, lhs[0].length, rhs[0].length]; // mxn and nxr
    
    let result = new Array();
    for (let i = 0; i < m; i++)
    {
        let row_result = new Array(r);
        row_result.fill(0);
        for (let j = 0; j < n; j++)
        {
            let row_comb_mult = lhs[i][j];
            for (let k = 0; k < r; k++)
            {
                row_result[k] += rhs[j][k] * row_comb_mult;
            }
        }
        result.push(row_result);
    }

    return result;
}

function inv(matrix){
    // TODO : Check if the matrix is invertible
    // TODO : Implement pseudo inverse for rectangle matrices

    // identity to operate row reductions simultaneously
    let identity = Array(matrix.length);
    for (let i = 0; i < identity.length; i++)
    {
        let row = Array(matrix[0].length).fill(0);
        row[i] = 1;
        identity[i] = row;
    }
    
    for (let pivot = 0; pivot < matrix.length; pivot++){
        let pivot_divider = matrix[pivot][pivot];
        if (pivot_divider < EPS)
        {
            // Permutate the rows
            for (let k = pivot+1; k < matrix.length; k++)
            {
                if (matrix[k][0] > EPS || matrix[k][0] < -EPS)
                {
                    const temp_row = matrix[k];
                    matrix[k] = matrix[pivot];
                    matrix[pivot] = temp_row;
                    pivot_divider = matrix[pivot][pivot];
                }
            }
        }

        // Make the pivot 1.
        matrix[pivot] = matrix[pivot].map(elem => elem / pivot_divider);
        identity[pivot] = identity[pivot].map(elem => elem/pivot_divider);

        // Make echelon form
        for (let k = pivot+1; k < matrix.length; k++)
        {
            let row_multiplier = matrix[k][pivot];
            matrix[k] = matrix[k].map((elem, colIndex) => elem - row_multiplier * matrix[pivot][colIndex]);
            identity[k] = identity[k].map((elem, colIndex) => elem - row_multiplier * identity[pivot][colIndex]);        
        }
    }

    // Substract in the reverse order to get Identity
    for (let pivot = matrix.length - 1; pivot > 0; pivot--)
    {
        for (let k = pivot - 1; k >= 0; k--)
        {
            let column_multiplier = matrix[k][pivot];
            matrix[k][pivot] = 0;
            identity[k] = identity[k].map((elem, colIndex) => elem - column_multiplier * identity[pivot][colIndex]);
        }
    }

    return identity;
}

function linear_interpolation(data, index)
{
    if (index > data.length - 1) return null;
    let int_part = Math.floor(index);
    let result = data[int_part] * (1 - (index - int_part)) + data[int_part+1] * (index - int_part);
    return result;
}

function base_vel_at_t(loop_index)
{
    if (breathing_data == null) return -1;
    let index = breathing_data.length * loop_index * breathe_params["bps"] / breathe_params["cr"];
    return linear_interpolation(breathing_data, index);
}

function transpose(matrix)
{
    if (!Array.isArray(matrix)) {
        throw new Error("Input must be an array");
      }
      
      // Check if matrix is 1D or 2D
      if (!Array.isArray(matrix[0])) {
        // Handle 1D array by converting it to a single-column 2D array
        return matrix.map(element => [element]);
      } else {
        // Handle 2D array by transposing it
        return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
      }
}

function compute_next_joint_state(loop_index)
{
    let vel_profile_interpolated = breathe_params["velocity_profile"](loop_index);
    
    let modulated_vel = breathe_params["bps"] * breathe_params["amp"] * vel_profile_interpolated;
    let vel_task_space = breathe_params["direction"].map(num => num * modulated_vel);

    let jacobian = jacobian_body(robot_joint_state);
    let inv_jacobian = inv(jacobian);

    let breathing_vels = matmul(inv_jacobian, transpose(vel_task_space));
    const dt = 1 / breathe_params["cr"];
    
    let gazing_vels = [0, 0, 0];
    let joint_vels = transpose(breathing_vels).flat().concat(gazing_vels)
    
    robot_joint_state = robot_joint_state.map((q, ind) => q + joint_vels[ind] * dt);
    // robot_joint_state = robot_joint_state.map(q => q + 0.01 * dt);
    set_joint_state(robot_joint_state);
}

function get_forward_kinematics_head(robot_joint_state)
{
    let q4 = robot_joint_state[3];
    let q5 = robot_joint_state[4];
    let q6 = robot_joint_state[5];

    let cq4 = Math.cos(q4);
    let cq5 = Math.cos(q5);
    let cq6 = Math.cos(q6);

    let sq4 = Math.sin(q4);
    let sq5 = Math.sin(q5);
    let sq6 = Math.sin(q6);


    let T_w0_w1 = [[cq4, -sq4, 0, 0],
                [sq4, cq4, 0, 0],
                [0, 0, 1, -113],  // Decreased 20 mm
                [0, 0, 0, 1]];

    let T_w1_w2 = [[cq5, 0, sq5, 0],
                [0, 1, 0, 87.7], // original is 99.7 mm but current mesh does not fit
                [-sq5, 0, cq5, 0],
                [0, 0, 0, 1]];

    let T_w2_w3 = [[cq6, -sq6, 0, 0],
                [sq6, cq6, 0, 0],
                [0, 0, 1, -133],
                [0, 0, 0, 1]];
    
    let T_b_w0 = forward_kinematics_body(robot_joint_state);
    
    let T_b_w1 = matmul(T_b_w0, T_w0_w1);    
    let T_b_w2 = matmul(T_b_w1, T_w1_w2);
    let T_b_w3 = matmul(T_b_w2, T_w2_w3);
    
    return [T_b_w1, T_b_w2, T_b_w3];
}

let gazing_target = [-1, 0.5, 0];
const geometry = new THREE.SphereGeometry(0.05, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: false });
let sphere = new THREE.Mesh(geometry, material);
sphere.position.set(gazing_target[0], gazing_target[1], gazing_target[2]);
scene.add(sphere);

let first_time = true;
function draw_line(dir, orig) {
    if (!first_time) return;
    if (first_time){
        first_time = false;
    }
    const dir_tjs = new THREE.Vector3(dir[0], dir[1], dir[2]);
    const orig_tjs = new THREE.Vector3(orig[0], orig[1], orig[2]);

    const length = 1;
    const color = 0xff0000;
    const arrowHelper = new THREE.ArrowHelper(dir_tjs, orig_tjs, length, color);
    scene.add(arrowHelper);  
}

function gaze_distance(x){
    let current_js = structuredClone(robot_joint_state);
    current_js[3] = x[0];
    current_js[4] = x[1];
    let fws = get_forward_kinematics_head(current_js);
    let g = [fws[2][0][3] - fws[1][0][3], fws[2][1][3] - fws[1][1][3], fws[2][2][3] - fws[1][2][3], 1];
    let g_des = [gazing_target[0] - fws[1][0][3]/1000, gazing_target[1] - fws[1][1][3]/1000, gazing_target[2] - fws[1][2][3]/1000, 1/1000];

    g = normalize(g);
    g_des = normalize(g_des);
    
    const origin = [fws[1][0][3]/1000, fws[1][1][3]/1000, fws[1][2][3]/1000]; 
    // draw_line(g, origin);
    // draw_line(g_des, origin);
    

    let cos_theta = g.reduce((sum, ai, i) => sum + ai * g_des[i], 0);

    return Math.acos(cos_theta);
}

function animate_gazing() {
    const initial_guess =[robot_joint_state[3], robot_joint_state[4]];

    const result = fmin.nelderMead(gaze_distance, initial_guess);
    robot_joint_state[3] = result.x[0];
    robot_joint_state[4] = result.x[1];
    set_joint_state(robot_joint_state);

}

// Function to handle keypresses
const moveSpeed = 0.1;
function moveSphere(event) {
  switch (event.key) {
    case "ArrowUp":
      sphere.position.y += moveSpeed;
      break;
    case "ArrowDown":
      sphere.position.y -= moveSpeed;
      break;
    case "ArrowLeft":
      sphere.position.z -= moveSpeed;
      break;
    case "ArrowRight":
      sphere.position.z += moveSpeed;
      break;
  }
  gazing_target[0] = sphere.position.x;
  gazing_target[1] = sphere.position.y;
  gazing_target[2] = sphere.position.z;

}

// Listen for keydown events
window.addEventListener("keydown", moveSphere);


// Animation loop
function animate() {
    setTimeout( function() {

        requestAnimationFrame( animate );
    }, 1000 / breathe_params["cr"]);
    
    animate_gazing();

    // breatheSin(breathe_counter);
    breathe_counter += 1;
    breathe_counter = breathe_counter % (breathe_params["cr"] / breathe_params["bps"]);
    compute_next_joint_state(breathe_counter);

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