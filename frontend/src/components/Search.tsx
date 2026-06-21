import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';

interface SearchProps {
  onSearch: (city: string) => void;
}

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 w-full max-w-md border border-white/20 shadow-lg"
    >
      <input
        type="text"
        placeholder="Shahar nomini kiriting..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent text-white placeholder-white/60 outline-none grow px-2 text-lg"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type="submit"
        className="text-white bg-blue-500 p-2 rounded-full shadow-md hover:bg-blue-600 transition"
      >
        <SearchIcon size={20} />
      </motion.button>
    </motion.form>
  );
};