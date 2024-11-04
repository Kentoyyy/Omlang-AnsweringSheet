// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation

const Page: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the answer sheet page
        router.push('/answer-sheet-setup'); // Update with the correct path if needed
    }, [router]);

    return null; // Render nothing while redirecting
};

export default Page;
