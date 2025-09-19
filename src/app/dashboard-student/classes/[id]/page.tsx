"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ClassDetail from '@/components/ui-student/classes/ClassDetail';

export default function ClassDetailPage() {
  // Next.js 15+ params is a Promise, must unwrap with React.use()
  const paramsPromise = useParams();
  const [classId, setClassId] = useState('');
  
  useEffect(() => {
    let isMounted = true;
    Promise.resolve(paramsPromise).then(params => {
      if (!isMounted) return;
      if (params && typeof params.id === 'string') {
        setClassId(params.id);
      } else if (params && Array.isArray(params.id)) {
        setClassId(params.id[0]);
      }
    });
    return () => { isMounted = false; };
  }, [paramsPromise, setClassId]);

  return <ClassDetail classId={classId} />;
}
