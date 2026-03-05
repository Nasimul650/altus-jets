import { MotionValue } from 'framer-motion';
import { RefObject, useEffect } from 'react';

export function useCanvasScroll(
    canvasRef: RefObject<HTMLCanvasElement>,
    images: HTMLImageElement[],
    scrollProgress: MotionValue<number>,
    options: { scaleMultiplier?: number, objectFit?: 'cover' | 'contain' } = {}
) {
    const { scaleMultiplier = 1, objectFit = 'cover' } = options;

    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number | null = null;
        let lastRenderedIndex = -1;

        const render = (progress: number) => {
            if (images.length === 0) return;

            // Map progress to image index
            const index = Math.max(0, Math.min(images.length - 1, Math.floor(progress * (images.length - 1))));

            // Optimization: Skip if already rendered this frame
            if (index === lastRenderedIndex) return;
            lastRenderedIndex = index;

            const img = images[index];
            if (!img) return;

            const { width: cw, height: ch } = canvas;
            const { width: iw, height: ih } = img;

            // Scale logic
            let scale = 1;
            if (objectFit === 'cover') {
                scale = Math.max(cw / iw, ch / ih);
            } else if (objectFit === 'contain') {
                scale = Math.min(cw / iw, ch / ih);
            }

            scale *= scaleMultiplier;

            const newWidth = iw * scale;
            const newHeight = ih * scale;
            const offsetX = (cw - newWidth) / 2;
            const offsetY = (ch - newHeight) / 2;

            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            lastRenderedIndex = -1; // Force re-render on resize
            render(scrollProgress.get());
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const unsubscribe = scrollProgress.on('change', (latest) => {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
            }
            animationFrameId = requestAnimationFrame(() => {
                render(latest);
                animationFrameId = null;
            });
        });

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [canvasRef, images, scrollProgress, scaleMultiplier, objectFit]);
}
