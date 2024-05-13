import { lazy, Suspense } from 'react';

const ProductList = lazy(() => import('@/components/ProductList'));


export default function Home() {
  return (
   <Suspense fallback={<main className='flex h-screen justify-center items-center'> <div className="loader"></div></main>}>

      <ProductList />
    </Suspense>

  );
}
