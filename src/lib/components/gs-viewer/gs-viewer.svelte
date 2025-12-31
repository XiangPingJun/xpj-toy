<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as pc from "playcanvas";
  import { CameraControls } from "./gs-camera-controls.js";
  import { subjectUrl, activeLine, mode } from "$lib/stores/store";

  const props = $props();

  let canvas: HTMLCanvasElement;
  let app: pc.Application;
  let camera: pc.Entity;
  let lastSavedPov: string | undefined;

  export const saveCameraState = async () => {
    if (!camera?.script?.cameraControls) {
      return null;
    }
    const {
      _pose: { position, angles, distance },
    } = camera.script.cameraControls;

    const povToSave = JSON.stringify(
      [...position.toArray(), ...angles.toArray(), distance].map(
        (n) => Math.round(n * 100000) / 100000,
      ),
    );

    if (lastSavedPov !== povToSave) {
      console.info(povToSave);
    }
  };

  export const setCameraState = (data: any[]) => {
    camera?.script?.cameraControls?._controller.attach(
      new pc.Pose(
        new pc.Vec3(...data.slice(0, 3)),
        new pc.Vec3(...data.slice(3, 6)),
        data[6],
      ),
    );
  };

  let saveInterval: ReturnType<typeof setInterval>;
  let handleResize: () => void;

  onMount(async () => {
    if (!canvas) return;

    // Create application
    app = new pc.Application(canvas, {
      graphicsDeviceOptions: {
        deviceTypes: ["webgl2"],
        antialias: false,
        depth: false,
        stencil: false,
        xrCompatible: false,
        powerPreference: "high-performance",
        alpha: true,
      },
    });

    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.start();

    // Register CameraControls
    pc.registerScript(CameraControls, "cameraControls");

    // Resize handler
    handleResize = () => canvas && app.resizeCanvas();
    window.addEventListener("resize", handleResize, { passive: false });

    // Load assets
    const assets = [
      new pc.Asset("toy", "gsplat", {
        url: $subjectUrl,
      }),
    ];

    const loader = new pc.AssetListLoader(assets, app.assets);
    await new Promise<void>((resolve) => loader.load(() => resolve()));

    // Create camera entity
    camera = new pc.Entity("Camera");
    camera.setPosition(0, 0, 2.5);
    camera.addComponent("camera", {
      clearColor: new pc.Color(0, 0, 0, 0),
    });
    camera.addComponent("script");
    camera.script?.create("cameraControls");
    app.root.addChild(camera);
    camera.script.cameraControls.focusDamping = 0.99;
    camera.script.cameraControls.moveDamping = 0.99;
    camera.script.cameraControls.rotateDamping = 0.99;
    camera.script.cameraControls.zoomDamping = 0.99;

    // Create splat entity
    const splat = new pc.Entity("toy");
    splat.setPosition(0, 0, 0);
    splat.setEulerAngles(0, 0, 180);
    splat.addComponent("gsplat", { asset: assets[0] });
    app.root.addChild(splat);

    setCameraState(JSON.parse($activeLine.pov));

    saveInterval = setInterval(saveCameraState, 1000);
  });

  $effect(() => {
    setCameraState(JSON.parse($activeLine.pov));
  });

  onDestroy(() => {
    clearInterval(saveInterval);
    window.removeEventListener("resize", handleResize);
    app?.destroy();
  });
</script>

<canvas
  bind:this={canvas}
  class={[
    "w-full h-[100dvh]",
    $mode === "Story" ? "pointer-events-none" : "cursor-grab",
    props.class,
  ]}
></canvas>
