import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

interface Props {
    leftSideActionHandler?: () => void;
    rightSideActionHandler?: () => void;
}

interface EventListenerData {
    target: HTMLElement | Document;
    event: string;
    handler: (e: Event) => void;
}

const useSideActions = ({
    leftSideActionHandler,
    rightSideActionHandler,
}: Props) => {
    useEffect(() => {
        const body = document.querySelector('body');
        const eventListenerData: EventListenerData = isMobile
            ? {
                  target: body,
                  event: 'mouseup',
                  handler: (e: Event) => {
                      const divWidth = body.getBoundingClientRect().width;
                      const halfDivWidth = divWidth / 2;
                      const mouseXPos = (e as MouseEvent).offsetX;

                      if (mouseXPos <= halfDivWidth) {
                          leftSideActionHandler?.();
                      } else {
                          rightSideActionHandler?.();
                      }
                  },
              }
            : {
                  target: document,
                  event: 'keydown',
                  handler: (e: Event) => {
                      if ((e as KeyboardEvent).code === 'ArrowLeft') {
                          leftSideActionHandler?.();
                      } else if ((e as KeyboardEvent).code === 'ArrowRight') {
                          rightSideActionHandler?.();
                      }
                  },
              };

        const timeoutId = setTimeout(() => {
            eventListenerData.target.addEventListener(
                eventListenerData.event,
                eventListenerData.handler
            );
        }, 100);

        return () => {
            clearTimeout(timeoutId);

            eventListenerData.target.removeEventListener(
                eventListenerData.event,
                eventListenerData.handler
            );
        };
    }, [leftSideActionHandler, rightSideActionHandler]);
};

export default useSideActions;
