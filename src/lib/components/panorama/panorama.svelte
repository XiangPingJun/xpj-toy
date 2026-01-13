<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";
  import CameraControls from "camera-controls";
  import {
    activeLine,
    subjectUrl,
    mode,
    activeLineIndex,
  } from "$lib/stores/store";

  const props = $props();

  let container: HTMLDivElement;

  // State
  let canvasElement: HTMLCanvasElement;
  let zoom = 1;
  let width = $state(800);
  let height = $state(600);

  // THREE.js objects
  let scene: THREE.Scene;
  let renderer: THREE.WebGLRenderer;
  let camera: THREE.PerspectiveCamera;
  let cameraControls: CameraControls;
  let environmentSphere: THREE.Mesh;
  let animationId: number;

  const clock = new THREE.Clock();
  const animationSpeed = 0.15;

  $effect(() => {
    if ($activeLine?.pov && cameraControls) {
      cameraControls.fromJSON($activeLine.pov, true);
    }
  });

  function createScene() {
    scene = new THREE.Scene();
    scene.add(environmentSphere);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasElement,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(
      typeof window !== "undefined" ? window.devicePixelRatio : 1,
    );
    renderer.setSize(width, height);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.2, 2000);

    CameraControls.install({ THREE });
    cameraControls = new CameraControls(camera, canvasElement);
    cameraControls.smoothTime = 0.04;
    cameraControls.restThreshold = 1;

    cameraControls.setPosition(0, 0, -500, true);
    cameraControls.rotateTo(rad(200), rad(0), true);
    zoom = 0.15;
    cameraControls.zoomTo(zoom, true);
    cameraControls.azimuthRotateSpeed = 0.2;

    startAnimation();
  }

  function onWheel(event: WheelEvent) {
    if (!cameraControls || !localStorage.debug) return;

    event.preventDefault();
    zoom += event.deltaY * -0.0002;
    cameraControls.zoomTo(zoom);
  }

  function startAnimation() {
    function onFrameRequest() {
      if (!cameraControls || !renderer || !scene || !camera) return;

      const delta = clock.getDelta();
      const cameraChanged = cameraControls.update(delta * animationSpeed);

      if (cameraChanged) {
        renderer.render(scene, camera);
      }

      animationId = requestAnimationFrame(onFrameRequest);
    }

    onFrameRequest();
  }

  async function createEnvironmentSphere() {
    try {
      const panTexture = await new THREE.TextureLoader().loadAsync($subjectUrl);

      panTexture.mapping = THREE.EquirectangularReflectionMapping;
      panTexture.colorSpace = THREE.SRGBColorSpace;
      panTexture.wrapS = THREE.RepeatWrapping;
      panTexture.repeat.x = -1;

      environmentSphere = new THREE.Mesh(
        new THREE.SphereGeometry(500, 100, 50),
        new THREE.MeshBasicMaterial({
          map: panTexture,
          side: THREE.BackSide,
        }),
      );
    } catch (error) {
      console.error("Failed to load panorama texture:", error);
      throw error;
    }
  }

  async function loadPanorama() {
    if (!canvasElement) return;

    try {
      await createEnvironmentSphere();
      createScene();
      handleResize();
      if ($activeLine?.pov) {
        cameraControls.fromJSON($activeLine.pov, true);
      }
    } catch (error) {
      console.error("Failed to load panorama:", error);
    }
  }

  function rad(deg: number) {
    return THREE.MathUtils.degToRad(deg);
  }

  function handleResize() {
    if (!cameraControls || !camera || !renderer) return;

    cameraControls.saveState();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    cameraControls.reset(false);
    renderer.setSize(width, height);
  }

  let lastSavedPov: string | undefined;

  async function saveCameraState() {
    const povToSave = cameraControls.toJSON();

    if (lastSavedPov !== povToSave) {
      lastSavedPov = povToSave;
      console.info(povToSave);
    }
  }

  let saveInterval: number | undefined;

  onMount(() => {
    // Set initial dimensions on client side
    if (typeof window !== "undefined") {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    loadPanorama();

    saveInterval = setInterval(saveCameraState, 1000);
  });

  onDestroy(() => {
    // Cleanup
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    if (renderer) {
      renderer.dispose();
    }

    if (cameraControls) {
      cameraControls.dispose();
    }

    // Dispose geometries and materials
    if (environmentSphere) {
      environmentSphere.geometry.dispose();
      if (environmentSphere.material instanceof THREE.Material) {
        environmentSphere.material.dispose();
      }
    }

    clearInterval(saveInterval);
  });
</script>

<div
  class={[
    "panorama-container w-100vw h-100dvh fixed z--1",
    $mode === "Inspect" ? "cursor-grab" : "pointer-events-none",
  ]}
  bind:this={container}
>
  <canvas
    bind:this={canvasElement}
    {width}
    {height}
    onwheel={onWheel}
    class={[
      "panorama-canvas w-full h-[100dvh] transition-all",
      !$activeLineIndex && "blur-sm brightness-60",
      props.class,
    ]}
  ></canvas>
</div>

<style>
  .panorama-container {
    animation: breathe 30s ease-in-out infinite;
  }

  @keyframes breathe {
    0%,
    100% {
      scale: 1.1;
    }
    50% {
      scale: 1;
    }
  }
</style>
