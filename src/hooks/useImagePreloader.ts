import { useEffect, useState } from 'react';

export function useImagePreloader(
    basePath: string,
    frameCount: number,
    padLength: number = 4,
    prefix: string = '',
    extension: string = '.jpg'
) {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;
        const loadedImages: HTMLImageElement[] = [];

        const loadImages = async () => {
            for (let i = 1; i <= frameCount; i++) {
                if (isCancelled) return;
                const numStr = String(i).padStart(padLength, '0');
                const src = `${basePath}/${prefix}${numStr}${extension}`;

                const img = new Image();
                img.src = src;

                await new Promise<void>((resolve) => {
                    img.onload = () => resolve();
                    img.onerror = () => resolve(); // continue on error to not block whole sequence
                });

                loadedImages.push(img);
            }

            if (!isCancelled) {
                setImages(loadedImages);
                setLoading(false);
            }
        };

        loadImages();

        return () => {
            isCancelled = true;
        };
    }, [basePath, frameCount, padLength]);

    return { images, loading };
}
