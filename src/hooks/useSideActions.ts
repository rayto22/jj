import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

interface Props {
    leftTapHandler?: () => void;
    rightTapHandler?: () => void;
    leftArrowDownHandler?: () => void;
    rightArrowDownHandler?: () => void;
}

interface EventListenerData {
    target: HTMLElement | Document;
    event: string;
    handler: (e: Event) => void;
}

const useSideActions = ({
    leftTapHandler,
    rightTapHandler,
    leftArrowDownHandler,
    rightArrowDownHandler,
}: Props) => {
    useEffect(() => {
        const body = document.querySelector('body');
        const eventListenerData: EventListenerData = isMobile
            ? {
                  target: body,
                  event: 'click',
                  handler: (e: Event) => {
                      const divWidth = body.getBoundingClientRect().width;
                      const halfDivWidth = divWidth / 2;
                      const mouseXPos = (e as MouseEvent).offsetX;

                      if (mouseXPos <= halfDivWidth) {
                          leftTapHandler && leftTapHandler();
                      } else {
                          rightTapHandler && rightTapHandler();
                      }
                  },
              }
            : {
                  target: document,
                  event: 'keydown',
                  handler: (e: Event) => {
                      if ((e as KeyboardEvent).code === 'ArrowLeft') {
                          leftArrowDownHandler && leftArrowDownHandler();
                      } else if ((e as KeyboardEvent).code === 'ArrowRight') {
                          rightArrowDownHandler && rightArrowDownHandler();
                      }
                  },
              };

        eventListenerData.target.addEventListener(
            eventListenerData.event,
            eventListenerData.handler
        );

        return () => {
            eventListenerData.target.removeEventListener(
                eventListenerData.event,
                eventListenerData.handler
            );
        };
    }, []);
};

export default useSideActions;
