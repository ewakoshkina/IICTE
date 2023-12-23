import * as THREE from '../../js/three/three.module.js';
import {ARButton} from '../../js/three/ARButton.js';


document.addEventListener("DOMContentLoaded", () => {
	const initialize = async() => {
		let scene = new THREE.Scene();
	    let camera = new THREE.PerspectiveCamera();

		let renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
	    renderer.setSize(window.innerWidth, window.innerHeight);
	    renderer.setPixelRatio(window.devicePixelRatio);
		document.body.appendChild(renderer.domElement);

		var towers = [];
		var rings = [];

		function createTower (x, y, z, radius, height, color) {
		  var towerGeometry = new THREE.CylinderBufferGeometry (radius, radius, height, 32);
		  var towerMaterial = new THREE.MeshStandardMaterial ({color: color});
		  var tower = new THREE.Mesh (towerGeometry, towerMaterial);
		  tower.position.set (x, y, z);
		  scene.add (tower);
		  towers.push (tower);
		}
		
		function createRing (x, y, z, innerRadius, outerRadius, color) {
		  var ringGeometry = new THREE.TorusBufferGeometry (outerRadius, (outerRadius - innerRadius) / 2, 16, 100);
		  var ringMaterial = new THREE.MeshStandardMaterial ({color: color});
		  var ring = new THREE.Mesh (ringGeometry, ringMaterial);
		  ring.position.set (x, y, z);
		  ring.rotation.x = Math.PI / 2;
		  rings.push (ring);
		}

		createTower (-0.5, 0.5, -1.5, 0.05, 0.5, 0xffffff); // Червона вежа
		createTower (0, 0.5, -1.5, 0.05, 0.5, 0xffffff);
		createTower (0.5, 0.5, -1.5, 0.05, 0.5, 0xffffff);
		
		createRing (-0.5, 0.65, -1.5, 0.075, 0.1, 0xff00ff); 
		createRing (-0.5, 0.6, 	-1.5, 0.1,   0.125, 0x00ffff);
		createRing (-0.5, 0.55, -1.5, 0.125, 0.15, 0xff00ff); 
		createRing (-0.5, 0.5, 	-1.5, 0.15,  0.175, 0x00ffff);
		createRing (-0.5, 0.45, -1.5, 0.175, 0.2, 0xff00ff); 
		createRing (-0.5, 0.4,  -1.5, 0.2,   0.225, 0x00ffff);
		createRing (-0.5, 0.35, -1.5, 0.225, 0.25, 0xff00ff); 
		
		function render() {
			if (rings[0].position.y < 1.55 && rings[0].position.x < 0 ) {
				rings[0].position.set(-0.5, rings[0].position.y+0.005, -1.5);
				rings[1].position.set(-0.5, rings[1].position.y+0.005, -1.5);
				rings[2].position.set(-0.5, rings[2].position.y+0.005, -1.5);
				rings[3].position.set(-0.5, rings[3].position.y+0.005, -1.5);
				rings[4].position.set(-0.5, rings[4].position.y+0.005, -1.5);
				rings[5].position.set(-0.5, rings[5].position.y+0.005, -1.5);
				rings[6].position.set(-0.5, rings[6].position.y+0.005, -1.5);
			}
			renderer.render(scene, camera);
			
			
			if (rings[6].position.y >= 1.05 && rings[0].position.x < 0 ){
				rings[0].position.set(rings[0].position.x+0.01/2, rings[0].position.y, -1.5);
				rings[1].position.set(rings[1].position.x+0.01, rings[1].position.y, -1.5);
				rings[2].position.set(rings[2].position.x+0.01/2, rings[2].position.y, -1.5);
				rings[3].position.set(rings[3].position.x+0.01, rings[3].position.y, -1.5);
				rings[4].position.set(rings[4].position.x+0.01/2, rings[4].position.y, -1.5);
				rings[5].position.set(rings[5].position.x+0.01, rings[5].position.y, -1.5);
				rings[6].position.set(rings[6].position.x+0.01/2, rings[6].position.y, -1.5);
				renderer.render(scene, camera);
			}
			renderer.render(scene, camera);
			
			if (rings[0].position.x >= 0 && rings[0].position.y > 0.65) {
				rings[0].position.set(rings[0].position.x, rings[0].position.y-0.005, -1.5);
				rings[1].position.set(rings[1].position.x, rings[1].position.y-0.005, -1.5);
				rings[2].position.set(rings[2].position.x, rings[2].position.y-0.005, -1.5);
				rings[3].position.set(rings[3].position.x, rings[3].position.y-0.005, -1.5);
				rings[4].position.set(rings[4].position.x, rings[4].position.y-0.005, -1.5);
				rings[5].position.set(rings[5].position.x, rings[5].position.y-0.005, -1.5);
				rings[6].position.set(rings[6].position.x, rings[6].position.y-0.005, -1.5);
			}
			renderer.render(scene, camera);	
		}
       
		var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

		renderer.xr.enabled = true;
		renderer.xr.addEventListener("sessionstart", (evt) => {
			renderer.setAnimationLoop(() => {
			    render();
			}); 
		});


		const arButton = ARButton.createButton(renderer, {
				optionalFeatures: ["dom-overlay"],
				domOverlay: {root: document.body},
			}
		);
		arButton.textContent = "Увійти до WebXR";
		document.body.appendChild(arButton);
	}

	initialize();
});