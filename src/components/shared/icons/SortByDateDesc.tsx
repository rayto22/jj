import { FC } from 'react';

export const SortByDateDesc: FC<{ size?: number; className?: string }> = ({
    size = 24,
    className,
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="black"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M19 7H16L20 3L24 7H21V21H19V7M8 16H11V13H8V16M13 5H12V3H10V5H6V3H4V5H3C1.89 5 1 5.89 1 7V18C1 19.11 1.89 20 3 20H13C14.11 20 15 19.11 15 18V7C15 5.89 14.11 5 13 5M3 18L3 11H13L13 18L3 18Z" />
    </svg>
);
