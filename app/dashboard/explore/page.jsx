"use client"
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';
import CourseCardSkleton from '../_components/CourseCardSkleton';
import { Button } from '@/components/ui/button';

const PAGE_SIZE = 9;

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    GetAllCourses(page);
  }, [page]);

  const GetAllCourses = async (page) => {
    setLoading(true);

    const offset = (page - 1) * PAGE_SIZE;
    const result = await db
      .select()
      .from(CourseList)
      .limit(PAGE_SIZE)
      .offset(offset);

    setCourseList(result);

    // If less than PAGE_SIZE courses are returned, it means no more courses are left
    setHasMore(result.length === PAGE_SIZE);

    setLoading(false);
  };

  const handleNextPage = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return (
      <div className="mt-5">
        <h2 className='font-bold text-3xl'>Explore More Courses</h2>
        <p>Explore more courses built with Philekoos by our community</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <CourseCardSkleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className='font-bold text-3xl'>Explore More Courses</h2>
      <p>Explore more courses built with Philekoos by our community</p>

      {courseList.length === 0 ? (
        <p className='text-gray-500 mt-5'>No more courses available to explore.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {courseList.map((course, index) => (
              <CourseCard course={course} displayUser={true} key={index} />
            ))}
          </div>

          <div className='flex justify-between items-center mt-5'>
            <Button 
              onClick={handlePrevPage} 
              disabled={page === 1}
              className={page === 1 ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Previous Page
            </Button>

            <h2 className='text-sm text-gray-400'>Page No. : {page}</h2>

            <Button 
              onClick={handleNextPage} 
              disabled={!hasMore}
              className={!hasMore ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Next Page
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Explore;
