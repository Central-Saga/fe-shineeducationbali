import React from 'react';
import Link from 'next/link';
import { Program } from '@/types/material';

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 h-full transition-all duration-300 hover:shadow-lg hover:border-gray-200">
      <div className="bg-gradient-to-r from-[#C40503] to-[#DAA625] p-5 flex justify-between items-center">
        <div className="flex items-center text-white">
          <span className="text-5xl mr-4">{program.icon}</span>
          <div>
            <h3 className="font-bold text-lg">{program.name}</h3>
            <p className="text-white text-opacity-80 text-sm">{program.level}</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-white text-sm">
          {program.duration}
        </div>
      </div>
      
      <div className="p-5">
        <p className="text-gray-700 mb-4 line-clamp-2">{program.description}</p>
        
        <div className="flex items-center mb-4">
          <img 
            src={program.instructorAvatar || '/placeholders/instructor-avatar.jpg'} 
            alt={program.instructor} 
            className="w-10 h-10 rounded-full mr-3 border-2 border-[#DAA625]" 
          />
          <div>
            <div className="text-sm font-medium text-gray-900">{program.instructor}</div>
            <div className="text-xs text-gray-500">Instruktur</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-700">Progress</span>
            <span className="font-medium text-[#C40503]">{program.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#C40503] to-[#DAA625] h-2 rounded-full"
              style={{ width: `${program.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-5">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
            </svg>
            <span>Mulai: {formatDate(program.startDate)}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
            </svg>
            <span>Selesai: {formatDate(program.endDate)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="bg-[#DAA625] bg-opacity-10 px-3 py-1 rounded-full text-[#DAA625] text-xs">
            {program.courses.length} Kursus
          </div>
          <Link href={`/dashboard-student/academy/program/${program.id}`} legacyBehavior>
            <a className="px-4 py-2 bg-[#C40503] text-white text-sm font-medium rounded-md hover:bg-[#a30402] transition-colors duration-300">
              Lihat Program
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
