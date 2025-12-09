"use client";

import { useEffect, useState } from 'react';
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  const [projectId, setProjectId] = useState<string>('');
  const [isValidProject, setIsValidProject] = useState(false);

  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
    setProjectId(id);
    
    // Check if it's a valid project ID (not demo or placeholder)
    if (id && id !== 'demo-project-id' && id !== 'your-project-id' && id.length > 5) {
      setIsValidProject(true);
    }
  }, []);

  if (!isValidProject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sanity Studio Setup</h1>
            <p className="text-gray-600 mb-6">
              Da biste koristili Sanity Studio, potrebno je da kreirate Sanity projekat.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Koraci za setup:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Idite na <a href="https://sanity.io/manage" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">sanity.io/manage</a></li>
                <li>Kreirajte novi projekat (besplatno)</li>
                <li>Kopirajte Project ID</li>
                <li>Zamenite u .env.local fajlu</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Trenutni Project ID:</h4>
              <code className="text-sm bg-white px-2 py-1 rounded border text-red-600">
                {projectId || 'Nije postavljen'}
              </code>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <a 
              href="https://sanity.io/manage" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kreiraj Sanity Projekat
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }
  return <NextStudio config={config} />
}