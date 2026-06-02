import type { KonvaEventObject } from "konva/lib/Node";
import type { RefObject } from "react";
import { useCallback, useRef } from "react";

import { useUploadThing } from "@/shared/lib/uploadthing";

import { useBoardStore } from "../core";
import { screenToCanvas } from "../lib";
import { createImage } from "../types";

const MAX_IMAGE_EDGE = 320;

const getImageDimensions = async (src: string) => {
  const image = new window.Image();

  image.src = src;

  await image.decode();

  return {
    width: image.naturalWidth || image.width,
    height: image.naturalHeight || image.height,
  };
};

const fitToMaxEdge = (width: number, height: number, maxEdge: number) => {
  const scale = Math.min(maxEdge / width, maxEdge / height, 1);

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
};

const createInput = (ref: RefObject<HTMLInputElement | null>) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.style.display = "none";
  document.body.appendChild(input);
  ref.current = input;
  return input;
};

const removeInput = (ref: RefObject<HTMLInputElement | null>) => {
  if (!ref.current) return;
  document.body.removeChild(ref.current);
  ref.current = null;
};

export const useImageDrawing = () => {
  const originRef = useRef({ x: 0, y: 0 });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { startUpload } = useUploadThing("canvasImageUploader");

  const uploadImage = useCallback(
    async (elementId: string, file: File, previewUrl: string) => {
      const { clearImageUploadState, setImageUploadState, updateElement } =
        useBoardStore.getState();

      try {
        const uploaded = await startUpload([file]);
        const uploadedUrl = uploaded?.[0]?.ufsUrl;

        if (!uploadedUrl) {
          throw new Error("Upload finished without a file URL");
        }

        updateElement(elementId, { imageUrl: uploadedUrl });
        clearImageUploadState(elementId);
        URL.revokeObjectURL(previewUrl);
      } catch (error) {
        console.error("Image upload failed", error);
        setImageUploadState(elementId, {
          status: "failed",
          error: error instanceof Error ? error.message : "Upload failed",
        });
      }
    },
    [startUpload],
  );

  const setToolAndSelect = useCallback((shapeId: string) => {
    const { setTool, pureSelect, setSelectionType } = useBoardStore.getState();

    setTool("select");
    pureSelect(shapeId);
    setSelectionType("transform");
  }, []);

  const requestImage = useCallback(() => {
    const input = createInput(inputRef);
    input.click();

    const handleUpload = () => {
      const file = inputRef.current?.files?.[0];
      if (!file) return;

      input.removeEventListener("change", handleUpload);
      input.removeEventListener("cancel", handleAbort);
      removeInput(inputRef);

      const previewUrl = URL.createObjectURL(file);
      const dimensionsPromise = getImageDimensions(previewUrl);

      void dimensionsPromise.then((dimensions) => {
        const size = fitToMaxEdge(
          dimensions.width,
          dimensions.height,
          MAX_IMAGE_EDGE,
        );

        const shape = createImage({
          x: originRef.current.x,
          y: originRef.current.y,
          width: size.width,
          height: size.height,
          imageUrl: previewUrl,
        });

        useBoardStore.getState().addElement(shape);
        useBoardStore.getState().setImageUploadState(shape.id, {
          status: "uploading",
        });

        setToolAndSelect(shape.id);
        void uploadImage(shape.id, file, previewUrl);
      });
    };

    const handleAbort = () => {
      input.removeEventListener("change", handleUpload);
      input.removeEventListener("cancel", handleAbort);
      removeInput(inputRef);
    };

    input.addEventListener("change", handleUpload, { once: true });
    input.addEventListener("cancel", handleAbort, { once: true });
  }, [setToolAndSelect, uploadImage]);

  const beginDraw = useCallback(
    (layerX: number, layerY: number) => {
      const { viewport } = useBoardStore.getState();

      const [cx, cy] = screenToCanvas(layerX, layerY, viewport);
      originRef.current = { x: cx, y: cy };

      requestImage();
    },
    [requestImage],
  );

  const containerRectRef = useRef<DOMRect | null>(null);

  const startPointerImageDraw = useCallback(
    (e: KonvaEventObject<PointerEvent>) => {
      if (e.evt.pointerType === "touch") return;

      const stage = e.target.getStage();
      if (!stage) return;

      const rect = stage.container().getBoundingClientRect();
      containerRectRef.current = rect;

      beginDraw(e.evt.clientX - rect.left, e.evt.clientY - rect.top);
    },
    [beginDraw],
  );

  const startTouchImageDraw = useCallback(
    (e: KonvaEventObject<TouchEvent>) => {
      const touch = e.evt.touches[0];
      if (!touch) return;

      const stage = e.target.getStage();
      if (!stage) return;

      const rect = stage.container().getBoundingClientRect();
      containerRectRef.current = rect;

      beginDraw(touch.clientX - rect.left, touch.clientY - rect.top);
    },
    [beginDraw],
  );

  return {
    startPointerImageDraw,
    startTouchImageDraw,
  };
};
