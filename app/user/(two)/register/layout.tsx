import type React from 'react';

export default function LoginLayout({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return <div className="w-screen mx-auto">{children}</div>;
}
