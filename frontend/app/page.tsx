import React from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function Component() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat history column */}
      <aside className="w-1/5 border-r border-gray-300 overflow-y-auto bg-white">
        <h2 className="text-xl font-semibold text-center p-4 bg-gray-200">Chat History</h2>
        {/* ... existing chat history content */}
      </aside>

      {/* Main chat area and footer */}
      <div className="flex flex-col flex-grow">
        {/* Chat area */}
        <main className="overflow-y-auto p-6 space-y-4 flex-grow bg-white">
          {/* Existing chat bubbles */}
          {/* ... existing chat bubble content */}
          {/* More chat bubbles */}
        </main>

        {/* Footer with input and send button */}
        <footer className="border-t border-gray-300 p-6 bg-white">
          <form className="flex items-center space-x-3 w-full">
            {/* Icon button */}
            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3">
              {/* SVG icon */}
            </Button>

            {/* Message input field */}
            <div className="flex-grow">
              <Input style={{ width: '100%', borderRadius: '25px', padding: '10px 15px', border: '1px solid #ddd' }} placeholder="Type your message..." />
            </div>

            {/* Send button */}
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2">
              Send
            </Button>
          </form>
        </footer>
      </div>
    </div>
  );
}
