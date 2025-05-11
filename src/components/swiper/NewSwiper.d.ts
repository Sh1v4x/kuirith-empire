declare global {
    interface Window {
        lastScrollTime?: number;
    }
}
interface Section {
    component: React.ReactNode;
}
export default function NewSwiper({ sections }: {
    sections: Section[];
}): import("react/jsx-runtime").JSX.Element;
export {};
