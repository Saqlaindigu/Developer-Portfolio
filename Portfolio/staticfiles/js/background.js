class MatrixBackground {
    constructor() {
        this.canvas = document.getElementById('particles-bg');
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.clock = new THREE.Clock();
        this.codeSnippets = [];
        this.neurons = [];
        this.synapses = [];
        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0.1);
        document.getElementById('particles-bg').appendChild(this.renderer.domElement);

        this.camera.position.z = 30;
        this.scene.fog = new THREE.FogExp2(0x000000, 0.015);

        this.createNeuralNetwork();
        this.createCodeSnippets();
        this.setupEventListeners();
        this.animate();
    }

    createCodeSnippets() {
        const snippets = [
            // Python ML/AI Snippets
            'import tensorflow as tf',
            'import torch.nn as nn',
            'from transformers import *',
            'model = Sequential()',
            'X_train, X_test = train_test_split()',
            'def train_model(self, X, y):',
            'class NeuralNetwork(nn.Module):',
            'optimizer = Adam(lr=0.001)',
            'loss = tf.keras.losses.MSE',
            'model.compile(optimizer="adam")',
            'predictions = model.predict(X)',
            'accuracy = accuracy_score(y, pred)',
            '@tf.function',
            'with torch.no_grad():',
            'class CNNModel(nn.Module):',
            
            // Data Science
            'import pandas as pd',
            'import numpy as np',
            'df = pd.DataFrame(data)',
            'plt.plot(history.history)',
            'sns.heatmap(correlation)',
            
            // Deep Learning
            'conv = Conv2D(64, (3,3))',
            'lstm = LSTM(units=128)',
            'dropout = Dropout(0.5)',
            'activation="relu"',
            'batch_size = 32',
            
            // AI/ML Concepts
            'def gradient_descent():',
            'class Transformer():',
            'def attention_mechanism():',
            'class BERT(PreTrainedModel):',
            'def forward_propagation():',
            
            // Python AI Libraries
            'import scikit-learn',
            'from keras.models import',
            'import pytorch_lightning',
            'from fastai.vision.all',
            'import huggingface_hub',
            
            // ML Operations
            'model.fit(X_train, y_train)',
            'accuracy = model.evaluate()',
            'prediction = model.predict()',
            'checkpoint = tf.train.Checkpoint()',
            'early_stopping = EarlyStopping()',
            
            // Data Processing
            'def preprocess_data():',
            'X = StandardScaler().fit_transform()',
            'embeddings = tokenizer(text)',
            'def augment_data():',
            'def clean_dataset():',
            
            // Custom ML Functions
            'def custom_loss_function():',
            'class CustomCallback():',
            'def feature_engineering():',
            'class DataGenerator():',
            'def cross_validation():'
        ];

        snippets.forEach((snippet, index) => {
            const texture = new THREE.Texture(this.createTextTexture(snippet));
            texture.needsUpdate = true;

            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            });

            const geometry = new THREE.PlaneGeometry(8, 1.5);
            const mesh = new THREE.Mesh(geometry, material);

            // Spherical distribution
            const phi = Math.acos(-1 + (2 * index) / snippets.length);
            const theta = Math.sqrt(snippets.length * Math.PI) * phi;
            const radius = 35;

            mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
            mesh.position.y = radius * Math.sin(phi) * Math.sin(theta);
            mesh.position.z = radius * Math.cos(phi);

            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;

            mesh.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01
            );

            this.codeSnippets.push(mesh);
            this.scene.add(mesh);
        });
    }

    createNeuralNetwork() {
        // Create smaller neurons
        const neuronGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const neuronMaterial = new THREE.MeshPhongMaterial({
            color: 0x8B5CF6,
            emissive: 0x4B0082,
            shininess: 100,
            transparent: true,
            opacity: 0.8
        });

        // Create more neurons for better network effect
        for (let i = 0; i < 70; i++)
            const neuron = new THREE.Mesh(neuronGeometry, neuronMaterial);
            neuron.position.set(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40
            );
            neuron.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            );
            neuron.initialPosition = neuron.position.clone();
            this.neurons.push(neuron);
            this.scene.add(neuron);

        // Create synapses with improved visuals
        const synapseMaterial = new THREE.LineBasicMaterial({
            color: 0x8B5CF6,
            transparent: true,
            opacity: 0.2,
            linewidth: 1
        });

        // Increase connection distance for more visible connections
        const maxDistance = 20;
        for (let i = 0; i < this.neurons.length; i++) {
            for (let j = i + 1; j < this.neurons.length; j++) {
                const distance = this.neurons[i].position.distanceTo(this.neurons[j].position);
                if (distance < maxDistance) {
                    const geometry = new THREE.BufferGeometry().setFromPoints([
                        this.neurons[i].position,
                        this.neurons[j].position
                    ]);
                    const line = new THREE.Line(geometry, synapseMaterial.clone());
                    this.synapses.push({
                        line,
                        start: i,
                        end: j,
                        pulsePhase: Math.random() * Math.PI * 2,
                        initialOpacity: 0.2 - (distance / maxDistance) * 0.15
                    });
                    this.scene.add(line);
                }
            }
        }

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x444444);
        this.scene.add(ambientLight);

        // Add point lights
        const lights = [
            { color: 0x4B0082, position: [20, 20, 20] },
            { color: 0x8A2BE2, position: [-20, -20, 20] }
        ];

        lights.forEach(light => {
            const pointLight = new THREE.PointLight(light.color, 1, 100);
            pointLight.position.set(...light.position);
            this.scene.add(pointLight);
        });
    }

    createTextTexture(text) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 128;

        // Background
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Text with gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, '#8B5CF6');    // Purple
        gradient.addColorStop(1, '#EC4899');    // Pink

        // Main text
        ctx.font = 'bold 40px "Fira Code", Consolas, monospace';
        ctx.fillStyle = gradient;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        // Glow effect
        ctx.shadowColor = '#8B5CF6';
        ctx.shadowBlur = 10;
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

        return canvas;
    }

    setupEventListeners() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(() => {
                    this.onWindowResize();
                    resizeTimeout = null;
                }, 100);
            }
        });

        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        
        // Performance optimizations
        document.addEventListener('visibilitychange', () => {
            this.isVisible = document.visibilityState === 'visible';
        });
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        if (!this.isVisible) return;

        // Calculate mouse position in normalized device coordinates (-1 to +1)
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        // Create a vector representing the mouse position
        const mouseVector = new THREE.Vector3(mouseX * 30, mouseY * 30, 0);
        
        // Update neurons based on mouse position
        this.neurons.forEach(neuron => {
            const distanceToMouse = neuron.position.distanceTo(mouseVector);
            const maxDistance = 10;
            
            if (distanceToMouse < maxDistance) {
                // Calculate repulsion force
                const force = new THREE.Vector3()
                    .subVectors(neuron.position, mouseVector)
                    .normalize()
                    .multiplyScalar(1 - distanceToMouse / maxDistance);
                
                // Apply force to velocity
                neuron.velocity.add(force.multiplyScalar(0.01));
                
                // Highlight nearby neurons
                neuron.material.emissiveIntensity = 1 - distanceToMouse / maxDistance;
            } else {
                // Return to normal state
                neuron.material.emissiveIntensity = 0.5;
                
                // Add slight attraction to original position
                const attractionForce = new THREE.Vector3()
                    .subVectors(neuron.initialPosition, neuron.position)
                    .multiplyScalar(0.001);
                neuron.velocity.add(attractionForce);
            }
        });

        // Subtle scene rotation
        this.scene.rotation.x = mouseY * 0.03;
        this.scene.rotation.y = mouseX * 0.03;
    }

    updateScene() {
        const time = this.clock.getElapsedTime();

        // Update neurons with improved physics
        this.neurons.forEach(neuron => {
            // Apply velocity with damping
            neuron.position.add(neuron.velocity);
            neuron.velocity.multiplyScalar(0.98); // Damping factor
            
            // Bounce off boundaries with more natural feel
            ['x', 'y', 'z'].forEach(axis => {
                if (Math.abs(neuron.position[axis]) > 20) {
                    neuron.velocity[axis] *= -0.8;
                    neuron.position[axis] = Math.sign(neuron.position[axis]) * 20;
                }
            });

            // Smooth pulse effect
            neuron.material.opacity = 0.6 + Math.sin(time * 1.5 + neuron.position.x) * 0.2;
        });

        // Update synapses with improved effects
        this.synapses.forEach(synapse => {
            const startNeuron = this.neurons[synapse.start];
            const endNeuron = this.neurons[synapse.end];
            
            // Update positions
            const positions = new Float32Array([
                startNeuron.position.x, startNeuron.position.y, startNeuron.position.z,
                endNeuron.position.x, endNeuron.position.y, endNeuron.position.z
            ]);
            synapse.line.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            // Dynamic opacity based on distance and time
            const distance = startNeuron.position.distanceTo(endNeuron.position);
            const pulseSpeed = 1.5;
            const basePulse = Math.sin(time * pulseSpeed + synapse.pulsePhase);
            const distanceFactor = Math.max(0, 1 - distance / 20);
            synapse.line.material.opacity = (synapse.initialOpacity + basePulse * 0.1) * distanceFactor;
        });

        // Update code snippets
        this.codeSnippets.forEach(snippet => {
            snippet.position.add(snippet.velocity);
            snippet.rotation.x += 0.0003;
            snippet.rotation.y += 0.0003;

            // Subtle pulsing effect
            const pulse = Math.sin(time + snippet.position.x) * 0.1;
            snippet.material.opacity = 0.2 + pulse;

            // Bounce off boundaries with damping
            ['x', 'y', 'z'].forEach(axis => {
                if (Math.abs(snippet.position[axis]) > 25) {
                    snippet.velocity[axis] *= -0.9;
                    snippet.position[axis] = Math.sign(snippet.position[axis]) * 25;
                }
            });
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        if (document.visibilityState === 'visible') {
            this.updateScene();
            this.renderer.render(this.scene, this.camera);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MatrixBackground();
}); 