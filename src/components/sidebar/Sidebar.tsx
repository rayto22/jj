import { FC, MouseEvent, PropsWithChildren, useState } from 'react';
import { styled } from 'styled-components';

interface Props extends PropsWithChildren {
    sidebarIndex?: number;
}

const Sidebar: FC<Props> = ({ sidebarIndex = 0, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsOpen((state) => !state);
    };

    return (
        <SidebarWrapper $isOpen={isOpen}>
            <SidebarContent>{children}</SidebarContent>
            <SidebarButton $buttonIndex={sidebarIndex} onClick={toggleIsOpen}>
                {isOpen ? '<<' : '>>'}
            </SidebarButton>
        </SidebarWrapper>
    );
};

const SidebarWrapper = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 70vw;
    margin-left: -70vw;

    ${(props) =>
        props.$isOpen &&
        `
        margin-left: 0;
        z-index: 1;
    `}
`;

const SidebarContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: inherit;
    width: 70vw;
    background-color: #edd1b0;
    border-right: 1px solid black;
`;

const SidebarButton = styled.div<{ $buttonIndex: number }>`
    width: 40px;
    height: 40px;
    position: absolute;
    ${(props) =>
        `top: ${
            props.$buttonIndex * 40 + 12 + (props.$buttonIndex > 0 ? 5 : 0)
        }px`};
    right: -20px;

    background-color: #edd1b0;
    border: 1px solid black;
    border-radius: 20px;
    text-align: center;
    vertical-align: middle;
    line-height: 40px;
`;

export default Sidebar;
