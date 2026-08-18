"use client";

import { usePathname } from "next/navigation";
import Header from "@/Components/Common/Header/Header";

export default function LayoutClient({ children }) {

    const pathname = usePathname();

    const isAdmin = pathname.startsWith("/admin");

    return (
        <>
            {!isAdmin && <Header />}

            {children}
        </>
    );
}