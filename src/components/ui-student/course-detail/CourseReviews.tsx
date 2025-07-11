"use client";

import React from 'react';
import { Star } from 'lucide-react';
import { CourseDetailData } from '@/data/data-student/course-detail-data';
import { Progress } from "@/components/ui/progress";

interface CourseReviewsProps {
  course: CourseDetailData;
}

export function CourseReviews({ course }: CourseReviewsProps) {
  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = course.reviews.filter(review => Math.round(review.rating) === rating).length;
    const percentage = (count / course.reviews.length) * 100;
    return { rating, count, percentage };
  });

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Ulasan Siswa</h2>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Rating Summary */}
          <div className="md:w-1/3">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-gray-800">
                {course.averageRating.toFixed(1)}
              </div>
              
              <div className="flex items-center my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-5 w-5 ${star <= Math.round(course.averageRating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                  />
                ))}
              </div>
              
              <div className="text-sm text-gray-500">
                {course.totalRatings} ulasan
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.rating} className="flex items-center">
                  <div className="w-12 text-right mr-3 text-sm font-medium">
                    {item.rating} bintang
                  </div>
                  <div className="flex-1">
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                  <div className="w-10 text-right ml-3 text-xs text-gray-500">
                    {item.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Reviews List */}
          <div className="md:w-2/3">
            {course.reviews.length > 0 ? (
              <div className="space-y-6">
                {course.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-10 h-10 rounded-full bg-[#DAA625] flex items-center justify-center text-white font-medium text-sm">
                          {review.user.charAt(0)}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{review.user}</h4>
                          <span className="text-xs text-gray-500">{formatDate(review.date)}</span>
                        </div>
                        
                        <div className="flex items-center mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                            />
                          ))}
                        </div>
                        
                        <p className="mt-2 text-gray-600 text-sm">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {course.totalRatings > course.reviews.length && (
                  <div className="text-center pt-2">
                    <button className="text-[#C40503] text-sm font-medium hover:underline">
                      Lihat Semua {course.totalRatings} Ulasan
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Belum ada ulasan untuk kursus ini
              </div>
            )}
            
            {/* Add Review Form */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-4">Berikan Ulasan Anda</h3>
              
              <div className="flex items-center mb-4">
                <span className="mr-4 text-sm">Rating:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star}>
                      <Star className="h-6 w-6 text-gray-300 hover:text-yellow-400 hover:fill-yellow-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <textarea 
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#C40503] focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Tulis pendapat Anda tentang kursus ini..."
                />
              </div>
              
              <div className="flex justify-end">
                <button className="bg-[#C40503] text-white py-2 px-4 rounded-md hover:bg-[#a60402] transition-colors">
                  Kirim Ulasan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
