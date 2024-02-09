import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

interface Props {
    leftTapHandler?: () => void;
    rightTapHandler?: () => void;
}

const useSideTaps = ({ leftTapHandler, rightTapHandler }: Props) => {
    useEffect(() => {
        const body = document.querySelector('body');
        const handleTap = (e: MouseEvent) => {
            const divWidth = body.getBoundingClientRect().width;
            const halfDivWidth = divWidth / 2;
            const mouseXPos = e.offsetX;

            if (mouseXPos <= halfDivWidth) {
                leftTapHandler && leftTapHandler();
            } else {
                rightTapHandler && rightTapHandler();
            }
        };

        if (isMobile) {
            body.addEventListener('click', handleTap);
        }

        return () => body.removeEventListener('click', handleTap);
    }, []);
};

export default useSideTaps;
