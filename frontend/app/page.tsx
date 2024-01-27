import React from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function Component() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-center px-6 py-4 border-b w-full">
        <h1 className="text-2xl font-bold text-center">College Admissions Chat</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Existing chat bubbles */}
        {/* ... existing chat bubble content */}
        {/* More chat bubbles */}
      </main>
      <footer className="border-t p-6">
        <form className="flex space-x-2 w-full">
          <Button className="bg-red-500 text-white rounded-full p-2 flex-shrink-0">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </Button>
          <Input className="flex-1" placeholder="Type your message..." />
          <Button type="submit" className="flex-shrink-0">Send</Button>
        </form>
      </footer>
    </div>
  );
}
