import React from 'react';
import Input from '@/components/ui/Input';

export default function Component() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat history column */}
      <aside className="w-1/5 border-r border-gray-300 overflow-y-auto bg-gray-900 text-white">
        <h2 className="text-xl font-semibold text-center p-4 bg-gray-800">Chat History</h2>
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

        {/* Footer with input, send button, and microphone icon */}
        <footer className="border-t border-gray-300 p-6 bg-white">
          <form className="flex items-center space-x-3 w-full">
            {/* Message input field with microphone icon */}
            <div className="flex-grow flex items-center">
              <Input style={{ width: '100%', borderRadius: '25px', padding: '10px 15px', border: '1px solid #ddd' }} placeholder="Type your message..." />
              {/* Microphone icon */}
              <img src="/micon.svg.png" alt="Microphone" className="ml-2 h-8 w-8" style={{ cursor: 'pointer' }} />
            </div>

            {/* Send button */}
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2">
              Send
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
