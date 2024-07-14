import { FC, PropsWithChildren, useState } from 'react';
import { styled } from 'styled-components';

const Sidebar: FC<PropsWithChildren> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => setIsOpen((state) => !state);

    return (
        <SidebarWrapper $isOpen={isOpen}>
            <SidebarContent>{children}</SidebarContent>
            <SidebarButton onClick={toggleIsOpen}>
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
    width: calc(70vw + 20px);
    margin-left: -70vw;

    ${(props) => props.$isOpen && 'margin-left: 0'}
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

const SidebarButton = styled.div`
    width: 40px;
    height: 40px;
    position: absolute;
    /* top: calc(50vh - 20px); */ // To center vertically
    top: 0.5rem;
    right: 0;

    background-color: #edd1b0;
    border: 1px solid black;
    border-radius: 20px;
    text-align: center;
    vertical-align: middle;
    line-height: 40px;
`;

export default Sidebar;
