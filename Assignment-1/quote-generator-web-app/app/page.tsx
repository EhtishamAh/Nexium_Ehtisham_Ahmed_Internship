// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardFooter } from '@/components/ui/card';
// import { Search } from 'lucide-react';
// import allQuotes from '../quotes.json';

// // Updated interface to include the writer
// interface Quote {
//   topic: string;
//   quote: string;
//   writer: string;
// }

// // Function to get 3 unique random quotes from a given array
// const getRandomQuotes = (sourceArray: Quote[]): Quote[] => {
//   const shuffled = [...sourceArray].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, 3);
// };

// export default function QuoteGenerator() {
//   // Start by displaying 3 random quotes
//   const [quotes, setQuotes] = useState<Quote[]>(getRandomQuotes(allQuotes));
//   const [topic, setTopic] = useState('');

//   const handleSearch = () => {
//     if (topic.trim() === '') {
//       // If search is empty, show 3 new random quotes from the whole list
//       setQuotes(getRandomQuotes(allQuotes));
//       return;
//     }
    
//     // Filter quotes by the search topic
//     const filteredQuotes = allQuotes.filter(q => 
//       q.topic.toLowerCase().includes(topic.toLowerCase())
//     );

//     // If matching quotes are found, show them. Otherwise, show 3 random quotes.
//     if (filteredQuotes.length > 0) {
//       setQuotes(getRandomQuotes(filteredQuotes));
//     } else {
//       setQuotes(getRandomQuotes(allQuotes));
//     }
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gradient-to-br from-gray-900 to-slate-800 text-white font-sans">
//       <div className="z-10 w-full max-w-3xl flex flex-col items-center gap-8">
        
//         {/* 1. Heading and Description */}
//         <div className="text-center">
//           <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
//             Quote Generator
//           </h1>
//           <p className="mt-4 text-lg text-gray-300">
//             Generate random quotes or search for a specific topic to find inspiration.
//           </p>
//         </div>

//         {/* 2. Search Bar */}
//         <div className="w-full max-w-md flex items-center space-x-2">
//           <Input
//             type="text"
//             placeholder="Search by topic (e.g., wisdom, change)"
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//             className="flex-grow bg-slate-700/50 border-slate-600 focus:ring-sky-500 focus:border-sky-500"
//           />
//           <Button onClick={handleSearch} size="icon" className="bg-sky-500 hover:bg-sky-600">
//             <Search className="h-5 w-5" />
//           </Button>
//         </div>

//         {/* 3. Quote Display with Hover Effect */}
//         <div className="w-full grid gap-6 pt-6">
//           {quotes.map((q, index) => (
//             <Card 
//               key={index} 
//               className="bg-slate-800/60 border-slate-700 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:border-sky-400"
//             >
//               <CardContent className="pt-6">
//                 <blockquote className="text-xl italic text-gray-200">
//                   “{q.quote}”
//                 </blockquote>
//               </CardContent>
//               <CardFooter className="flex justify-end">
//                 <p className="text-sm font-medium text-sky-400">— {q.writer}</p>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardFooter } from '@/components/ui/card';
// import { Search } from 'lucide-react';
// import allQuotes from '../quotes.json';

// // Updated interface to include the writer
// interface Quote {
//   topic: string;
//   quote: string;
//   writer: string;
// }

// // Function to get 3 unique random quotes from a given array
// const getRandomQuotes = (sourceArray: Quote[]): Quote[] => {
//   // Create a copy and shuffle it to not mutate the original array
//   const shuffled = [...sourceArray].sort(() => 0.5 - Math.random());
//   // Return the first 3 elements
//   return shuffled.slice(0, 3);
// };

// export default function QuoteGenerator() {
//   // FIX: Initialize state with an empty array to prevent hydration mismatch.
//   const [quotes, setQuotes] = useState<Quote[]>([]);
//   const [topic, setTopic] = useState('');

//   // FIX: Use useEffect to set initial quotes only on the client-side.
//   useEffect(() => {
//     // This code runs only once in the browser after the component mounts.
//     setQuotes(getRandomQuotes(allQuotes));
//   }, []); // The empty dependency array [] ensures this effect runs only once.

//   const handleSearch = () => {
//     if (topic.trim() === '') {
//       // If search is empty, show 3 new random quotes from the entire list
//       setQuotes(getRandomQuotes(allQuotes));
//       return;
//     }
    
//     // Filter quotes by the search topic (case-insensitive)
//     const filteredQuotes = allQuotes.filter(q => 
//       q.topic.toLowerCase().includes(topic.toLowerCase())
//     );

//     // If matching quotes are found, show random quotes from the filtered list.
//     // Otherwise, show 3 new random quotes from the original full list.
//     if (filteredQuotes.length > 0) {
//       setQuotes(getRandomQuotes(filteredQuotes));
//     } else {
//       setQuotes(getRandomQuotes(allQuotes));
//     }
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gradient-to-br from-gray-900 to-slate-800 text-white font-sans">
//       <div className="z-10 w-full max-w-3xl flex flex-col items-center gap-8">
        
//         {/* 1. Heading and Description */}
//         <div className="text-center">
//           <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
//             Quote Generator
//           </h1>
//           <p className="mt-4 text-lg text-gray-300">
//             Generate random quotes or search for a specific topic to find inspiration.
//           </p>
//         </div>

//         {/* 2. Search Bar */}
//         <div className="w-full max-w-md flex items-center space-x-2">
//           <Input
//             type="text"
//             placeholder="Search by topic (e.g., wisdom, change)"
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//             className="flex-grow bg-slate-700/50 border-slate-600 focus:ring-sky-500 focus:border-sky-500 text-white placeholder:text-gray-400"
//           />
//           <Button onClick={handleSearch} size="icon" className="bg-sky-500 hover:bg-sky-600 shrink-0">
//             <Search className="h-5 w-5" />
//           </Button>
//         </div>

//         {/* 3. Quote Display with Hover Effect */}
//         <div className="w-full grid gap-6 pt-6">
//           {quotes.map((q, index) => (
//             <Card 
//               key={index} 
//               className="bg-slate-800/60 border-slate-700 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:border-sky-400"
//             >
//               <CardContent className="pt-6">
//                 <blockquote className="text-xl italic text-gray-200">
//                   “{q.quote}”
//                 </blockquote>
//               </CardContent>
//               <CardFooter className="flex justify-end pt-4">
//                 <p className="text-sm font-medium text-sky-400">— {q.writer}</p>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }
// 'use client';

// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardFooter } from '@/components/ui/card';
// import { Search } from 'lucide-react'; // Make sure to install lucide-react: pnpm add lucide-react
// import allQuotes from '../quotes.json';

// interface Quote {
//   topic: string;
//   quote: string;
//   writer: string;
// }

// // Function to get 3 unique random quotes
// const getRandomQuotes = (sourceArray: Quote[]): Quote[] => {
//   const shuffled = [...sourceArray].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, 3);
// };

// export default function QuoteGenerator() {
//   const [quotes, setQuotes] = useState<Quote[]>([]);
//   const [topic, setTopic] = useState('');

//   // Set initial random quotes on client-side to avoid server/client mismatch
//   useEffect(() => {
//     setQuotes(getRandomQuotes(allQuotes));
//   }, []);

//   const handleSearch = () => {
//     if (topic.trim() === '') {
//       setQuotes(getRandomQuotes(allQuotes));
//       return;
//     }
//     const filteredQuotes = allQuotes.filter(q =>
//       q.topic.toLowerCase().includes(topic.toLowerCase())
//     );
//     setQuotes(filteredQuotes.length > 0 ? getRandomQuotes(filteredQuotes) : getRandomQuotes(allQuotes));
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gradient-to-br from-gray-900 to-slate-800 text-white font-sans">
//       <div className="z-10 w-full max-w-3xl flex flex-col items-center gap-8">
        
//         {/* 1. Modern Heading with Gradient Text */}
//         <div className="text-center">
//           <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
//             Quote Generator
//           </h1>
//           <p className="mt-4 text-lg text-gray-300">
//             Generate random quotes or search for a specific topic to find inspiration.
//           </p>
//         </div>

//         {/* 2. Styled Search Bar */}
//         <div className="w-full max-w-md flex items-center space-x-2">
//           <Input
//             type="text"
//             placeholder="Search by topic (e.g., wisdom, change)"
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//             className="flex-grow bg-slate-700/50 border-slate-600 focus:ring-sky-500 focus:border-sky-500 text-white placeholder:text-gray-400"
//           />
//           <Button onClick={handleSearch} size="icon" className="bg-sky-500 hover:bg-sky-600 shrink-0">
//             <Search className="h-5 w-5" />
//           </Button>
//         </div>

//         {/* 3. Quote Cards with Hover Effect */}
//         <div className="w-full grid gap-6 pt-6">
//           {quotes.map((q, index) => (
//             <Card
//               key={index}
//               className="bg-slate-800/60 border-slate-700 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:border-sky-400"
//             >
//               <CardContent className="pt-6">
//                 <blockquote className="text-xl italic text-gray-200">
//                   “{q.quote}”
//                 </blockquote>
//               </CardContent>
//               <CardFooter className="flex justify-end pt-4">
//                 <p className="text-sm font-medium text-sky-400">— {q.writer}</p>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Search } from 'lucide-react';
import allQuotes from '../quotes.json';

interface Quote {
  topic: string;
  quote: string;
  writer: string;
}

const getRandomQuotes = (sourceArray: Quote[]): Quote[] => {
  const shuffled = [...sourceArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

export default function QuoteGenerator() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [topic, setTopic] = useState('');

  useEffect(() => {
    setQuotes(getRandomQuotes(allQuotes));
  }, []);

  const handleSearch = () => {
    if (topic.trim() === '') {
      setQuotes(getRandomQuotes(allQuotes));
      return;
    }
    const filteredQuotes = allQuotes.filter(q =>
      q.topic.toLowerCase().includes(topic.toLowerCase())
    );
    setQuotes(filteredQuotes.length > 0 ? getRandomQuotes(filteredQuotes) : getRandomQuotes(allQuotes));
  };

  return (
    // Prompt: Full-Viewport Background
    <main className="flex min-h-screen flex-col items-center p-6 md:p-12 bg-gradient-to-br from-gray-900 to-slate-800 font-sans">
      
      {/* Prompt: Centered Content Wrapper */}
      <div className="z-10 w-full max-w-3xl flex flex-col items-center gap-8">
        
        {/* Prompt: Header Section */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500 mb-4">
            Quote Generator
          </h1>
          <p className="text-lg text-gray-300">
            Generate random quotes or search for a specific topic to find inspiration.
          </p>
        </div>

        {/* Prompt: Search Section */}
        <div className="w-full max-w-md flex items-center space-x-2 mt-4">
          <Input
            type="text"
            placeholder="Search by topic (e.g., wisdom, change)"
            aria-label="Search by topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-grow bg-slate-700/50 border border-slate-600 text-white placeholder:text-gray-400 focus:ring-sky-500 focus:border-sky-500 px-4 py-2 rounded-xl"
          />
          <Button
            onClick={handleSearch}
            size="icon"
            aria-label="Generate quotes"
            className="bg-sky-500 hover:bg-sky-600 rounded-full w-10 h-10 transition-colors duration-300 hover:shadow-lg"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Prompt: Quote Cards Section */}
        <div className="w-full grid gap-6 pt-6">
          {quotes.map((q, index) => (
            <Card
              key={index}
              className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl transition-transform duration-300 ease-in-out hover:scale-105 hover:border-sky-400"
            >
              <CardContent className="p-0"> {/* Adjusted padding to be on the Card itself */}
                <blockquote className="text-xl italic text-gray-200">
                  “{q.quote}”
                </blockquote>
              </CardContent>
              <CardFooter className="flex justify-end p-0 pt-4"> {/* Adjusted padding */}
                <p className="text-sm font-medium text-sky-400">— {q.writer}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}